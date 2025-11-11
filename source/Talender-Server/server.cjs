const { authMiddleware } = require("./middleware/Auth");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const {
    User,
    Account,
    Chat,
    Message,
    Skill,
    Category,
    Preference,
    Blacklist,
} = require("./models");

const {
    SECRET_KEY,
    DB_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} = process.env;

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(
    session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose
    .connect(DB_URL)
    .then(() => console.log("Mongo connected"))
    .catch((err) => console.error(err));

// Passport config
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Account.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const emailUsername = email.split("@")[0];

                let account = await Account.findOne({ email });
                let user = await User.findOne({ email });

                if (!account || !user) {
                    console.log("Creating new user via Google OAuth:", email);

                    account =
                        account ||
                        new Account({
                            email,
                            username: emailUsername,
                            password: "",
                            token: "",
                        });

                    user =
                        user ||
                        new User({
                            id: uuidv4(),
                            username: emailUsername,
                            first_name: profile.name?.givenName || "Google",
                            last_name: profile.name?.familyName || "User",
                            email,
                            status: "new",
                            location: "",
                            skills: [],
                            interests: [],
                        });

                    await account.save();
                    await user.save();
                } else {
                    // ensure username stays synced with email prefix
                    if (account.username !== emailUsername) {
                        account.username = emailUsername;
                        await account.save();
                    }
                    if (user.username !== emailUsername) {
                        user.username = emailUsername;
                        await user.save();
                    }
                }

                // Passport session uses Account._id for consistency
                return done(null, account);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Google Login
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google authentication callback
app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/loginpage",
        session: true,
    }),
    async (req, res) => {
        try {
            const email = req.user.email;
            const account = await Account.findOne({ email });
            const user = await User.findOne({ email });

            if (!account || !user) {
                return res
                    .status(404)
                    .json({ error: "User not found after OAuth." });
            }

            // Generate JWT using the User.id (uuid) for consistency
            const token = jwt.sign(
                {
                    id: user.id,
                    email: account.email,
                    username: account.username,
                },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            account.token = token;
            await account.save();

            // ✅ redirect with token so frontend can store it in localStorage
            res.redirect(`http://localhost:5173/google-success?token=${token}`);
        } catch (err) {
            console.error("Google OAuth callback error:", err);
            res.status(500).json({ error: "Google login failed" });
        }
    }
);

// Get, get all chats for the user
app.get("/api/chats/user", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const chats = await Chat.find({ "participants.id": userId }).sort({
            updatedAt: -1,
        });
        const likes = await Preference.find({ fromUserId: userId, value: 1 });
        const mutuals = [];

        for (const like of likes) {
            const reverse = await Preference.findOne({
                fromUserId: like.toUserId,
                toUserId: userId,
                value: 1,
            });
            if (reverse) mutuals.push(like.toUserId);
        }
        // mutuals is the users which liked user.id, if user.id liked them too
        // Excluding matches that already have a chat
        const existingIds = new Set(chats.flatMap((c) => c.participants.map(p => p.id)));
        const newMatches = mutuals.filter(
            (id) => !existingIds.has(id) && id !== userId
        );
        const matchedUsers = await User.find({ id: { $in: newMatches } });
    // Add an `chatPartner` field to each chat object
    const formattedChats = chats.map((chat) => {
      // Find the participant who is NOT the current user
      const chatPartner = chat.participants.find((p) => p.id !== userId);
      // Find the participant who is current user
      const curUser = chat.participants.find((p) => p.id === userId);
      return {
        ...chat.toObject(), // Convert Mongoose document to plain JS object
        chatPartner, //  Add the new field for easier frontend access
        curUser,
      };
    });
    res.json({
      chats: formattedChats,
      matches: matchedUsers,
    });
  } catch (err) {
    console.error("Error fetching chats and matches:", err);
    res.status(500).json({ error: "Failed to fetch chats and matches" });
  }
});

// Get, get all messages of a specific chat, given a chatId
app.get("/api/messages", authMiddleware, async (req, res) => {
    try {
        const { chatId } = req.query;

        const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Get, get user data from a user Id. Only one user returned
app.get("/api/user/search-by-id/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// Get, get user data of the user making the request, no parameters required
app.get("/api/user/search-by-id/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// Get, get a list of skills with optional category filter
app.get("/api/skills", authMiddleware, async (req, res) => {
    try {
        const { category } = req.query;
        const { search } = req.query;
        const filter = {};

        if (search)  {
            filter.name = { $regex: search, $options: "i" };
            
        }
        if (category) {
            filter.categories = category;
        }

        const skills = await Skill.find(filter);

        if (!skills || skills.length === 0) {
            return res.status(404).json({ error: "Skills not found" });
        }

        res.json(skills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch skills" });
    }
});

// Get, get a list of all skill categories from the DB
app.get("/api/categories", async (req, res) => {
    try {
        const cat = await Category.find();
        if (!cat) {
            return res.status(404).json({ error: "categories not found" });
        }
        console.log(cat);

        res.json(cat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

app.get("/api/categories-with-skills", async (req, res) => {
    try {
        const { category } = req.query;
        const matchStage = category ? { $match: { slug: category } } : null;

        const pipeline = [
            ...(matchStage ? [matchStage] : []),
            {
                $lookup: {
                    from: "skills",
                    localField: "slug",
                    foreignField: "categories",
                    as: "skills",
                },
            },
            {
                $sort: { name: 1 },
            },
        ];

        const categoriesWithSkills = await Category.aggregate(pipeline);

        if (!categoriesWithSkills || categoriesWithSkills.length === 0) {
            return res.status(404).json({ error: "No categories found" });
        }

        res.json(categoriesWithSkills);
    } catch (err) {
        console.error("Error fetching categories with skills:", err);
        res.status(500).json({ error: "Failed to fetch categories with skills" });
    }
});


// Post, Add a skill to a user's given a skillId and a type, which can be owned or wanted.
app.post("/api/user-skills/add", authMiddleware, async (req, res) => {
    try {
        const { skillId, type } = req.body; // type = 'owned' | 'wanted'
        if (!skillId || !type)
            return res.status(400).json({ error: "skillId and type required" });

        const user = await User.findOne({ id: req.user.id });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (type === "owned") {
            if (user.skills.includes(skillId)) {
                return res.status(400).json({ error: "Skill already owned" });
            }
            user.skills.push(skillId);
        } else if (type === "wanted") {
            if (user.interests.includes(skillId)) {
                return res.status(400).json({ error: "Skill already wanted" });
            }
            user.interests.push(skillId);
        } else {
            return res.status(400).json({ error: "Invalid type" });
        }

        await user.save();
        res.json({ message: `Skill added to ${type} list` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add skill" });
    }
});

// Get, get a list of a user's skills, given their userId
app.get("/api/user/:id/skills", authMiddleware, async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const skills = { owned: user.skills, wanted: user.interests };
        res.json(skills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Get, get a list of users recommended to current user
app.get("/api/recommendedUsers", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({ id: userId });
        if (!user) return res.status(404).json({ error: "User not found" });

        // find users who disliked the current user
        const dislikes = await Preference.find({
            toUserId: userId,
            value: -1,
        }).select("fromUserId");
        const dislikers = dislikes.map((d) => d.fromUserId);

        // find potential matches excluding dislikers
        const potentialMatches = await User.find({
            id: { $ne: userId, $nin: dislikers },
            $or: [
                { interests: { $in: user.skills } },
                { skills: { $in: user.interests } },
            ],
        });

        // compute and rank matches
        const rankedUsers = potentialMatches
            .map((u) => {
                const skillMatchCount = u.skills.filter((s) =>
                    user.interests.includes(s)
                ).length;
                const interestMatchCount = u.interests.filter((i) =>
                    user.skills.includes(i)
                ).length;
                const matchScore = skillMatchCount + interestMatchCount;

                return {
                    ...u.toObject(),
                    matchScore,
                };
            })
            .filter((u) => u.matchScore > 0)
            .sort((a, b) => b.matchScore - a.matchScore);

        res.json(rankedUsers);
    } catch (err) {
        console.error("Error fetching recommended users:", err);
        res.status(500).json({ error: "Failed to fetch recommended users" });
    }
});

// Get, get users with a username that starts with input
app.get("/api/users/search-by-username/:username", async (req, res) => {
    try {
        const { username } = req.params; // use req.params, not req.query
        if (!username)
            return res.status(400).json({ error: "Username required" });

        // Find all users whose username starts with the input, case-insensitive
        const users = await User.find({
            username: { $regex: `^${username}`, $options: "i" },
        }).sort({ username: 1 }); // sort alphabetically

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Get, get userId from token
app.get("/api/userId", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        res.json(userId);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Post, Registration route (email+password)
app.post("/register", async (req, res) => {
    try {
        const {
            username,
            password,
            name,
            surname,
            email,
            status,
            location,
            skills,
            interests,
        } = req.body;

        const existing = await Account.findOne({
            $or: [{ email }, { username }],
        });

        if (existing) {
            return res.status(409).json({
                error: "An account with that email or username already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const account = new Account({
            email,
            username,
            password: hashedPassword,
            token: "",
        });

        const user = new User({
            id: uuidv4(),
            username,
            first_name: name,
            last_name: surname,
            email,
            status,
            location,
            skills: skills || [],
            interests: interests || [],
        });

        await account.save();
        await user.save();

        res.status(201).json({ message: "Account and user created." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed." });
    }
});

// Post, Login route (email+password)
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Username and password required" });
    }
    try {
        const account = await Account.findOne({ username });

        if (!account) {
            return res.status(404).json({ error: "Account not found." });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            account.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid password." });
        }
        const user = await User.findOne({ email: account.email });
        const token = jwt.sign(
            { id: user.id, email: account.email, username: account.username },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        account.token = token;
        await account.save();

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Post, create a new chat, given the other participants' Ids
app.post("/api/chats", authMiddleware, async (req, res) => {
    try {
        const { user1, user2 } = req.body;
        const chatId = [user1, user2].sort().join("_");
        let chat = await Chat.findOne({ chatId });
        if (!chat) {
            const user1Data = await User.findOne({ id: user1 }).select(
                "id username avatarLink"
            );
            const user2Data = await User.findOne({ id: user2 }).select(
                "id username avatarLink"
            );

            chat = await Chat.create({
                chatId,
                participants: [
                    {
                        id: user1Data.id,
                        username: user1Data.username,
                        avatarLink: user1Data.avatarLink,
                    },
                    {
                        id: user2Data.id,
                        username: user2Data.username,
                        avatarLink: user2Data.avatarLink,
                    },
                ],
            });
        }
        // After creating a new chat
        io.to(user1).emit("newChat", chat);
        io.to(user2).emit("newChat", chat);
        res.json(chat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create chat" });
    }
});

// Post, Send a message, given chatId and text
app.post("/api/messages/send", authMiddleware, async (req, res) => {
    try {
        const { chatId, text } = req.body;
        const userId = req.user.id;

        const message = await Message.create({
            chatId,
            senderId: userId,
            text,
            createdAt: new Date(),
        });

        await Chat.findOneAndUpdate(
            { chatId },
            {
                lastMessage: {
                    text: message.text,
                    senderId: message.senderId,
                    createdAt: message.createdAt,
                },
            },
            { new: true }
        );

        // ✅ Emit to all clients in the chat room
        io.to(chatId).emit("newMessage", message);

        res.json(message);
    } catch (err) {
        console.error("Message send error:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
});

// Post, Add skills to the database, given a name and a category.
app.post("/api/skills/add", authMiddleware, async (req, res) => {
    try {
        const { skillName, category } = req.body;
        if (!skillName || !category) {
            return res
                .status(400)
                .json({ error: "skillName and category required" });
        }

        const skill = new Skill({
            id: uuidv4(),
            name: skillName,
            slug: skillName.toLowerCase().replace(/\s+/g, "-"),
            categories: [category],
        });
        await skill.save();
        res.json({
            message: `Skill: "${skillName}" added to category: "${category}"`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add skill" });
    }
});

// Post, sets user liked/unliked by current user + Check matches
app.post("/api/user/preference", authMiddleware, async (req, res) => {
    try {
        const fromUserId = req.user.id;
        const { toUserId, value } = req.body; // value ∈ {-1, 0, 1}

        if (![-1, 0, 1].includes(value)) {
            return res.status(400).json({ error: "Invalid preference value" });
        }

        if (fromUserId === toUserId) {
            return res
                .status(400)
                .json({ error: "Cannot set preference for self" });
        }

        // Upsert preference
        const preference = await Preference.findOneAndUpdate(
            { fromUserId, toUserId },
            { value },
            { upsert: true, new: true }
        );

        // check if mutual like
        let matched = false;
        if (value === 1) {
            const reverse = await Preference.findOne({
                fromUserId: toUserId,
                toUserId: fromUserId,
                value: 1,
            });
            matched = !!reverse;
        }

        res.json({
            message: matched
                ? "Mutual like — match formed!"
                : value === 1
                ? "Liked user"
                : value === -1
                ? "Disliked user"
                : "Preference reset",
            preference,
            matched,
        });
    } catch (err) {
        console.error("Error setting preference:", err);
        res.status(500).json({ error: "Failed to set preference" });
    }
});

// Post, Log out
app.post("/api/logout", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // get user document
        const user = await User.findOne({ id: userId });
        if (!user) return res.status(400).json({ error: "User not found" });

        // directly update the account token to null
        const result = await Account.updateOne(
            { email: user.email },
            { $set: { token: "" } }
        );
        await Blacklist.create({
            token: req.headers.authorization.split(" ")[1],
        });
        if (result.matchedCount === 0) {
            return res.status(400).json({ error: "Account not found" });
        }

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Failed to log out user" });
    }
});

// Post, Delete user account and info
app.post("/api/delete-user", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findOne({ id: userId });
        if (!user) return res.status(400).json({ error: "User not found" });

        await Account.deleteOne({ email: user.email });
        await Chat.deleteMany({ "participants.id": userId });
        await Message.deleteMany({ senderId: userId });
        await Preference.deleteMany({
            $or: [{ fromUserId: userId }, { toUserId: userId }],
        });
        await User.deleteOne({ id: userId });

        res.status(200).json({ message: "User and related data deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

// Post, Edit user information (fields: first_name, last_name, age, location, isPublic)
app.post("/api/edit-user", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { first_name, last_name, age, location, isPublic } = req.body;
    try {
        const user = await User.findOne({ id: userId });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (first_name !== undefined) user.first_name = first_name;
        if (last_name !== undefined) user.last_name = last_name;
        if (age !== undefined) user.age = age;
        if (location !== undefined) user.location = location;
        if (isPublic !== undefined) user.sharedLocation = isPublic;

        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to edit user" });
    }
});

// Socket.io implementation, used to run instant messaging
const http = require("http");
const server = http.createServer(app); // wrap express app
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "*" }, // adjust as needed
});

io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    socket.on("joinChat", (chatId) => {
        socket.join(chatId);
        console.log(`Socket ${socket.id} joined chat ${chatId}`);
    });

  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`Socket ${socket.id} left chat ${chatId}`);
  });
  // ✅ Listen for message sending events
  socket.on("sendMessage", async (payload) => {
    try {
      const { chatId, senderId, text } = payload;
      console.log("🔥 Received message:", payload);
      // Basic input validation
      if (!chatId || !senderId || !text?.trim()) {
        console.log("⚠️ Invalid payload, message ignored.");
        return;
      }
      // (Optional) Save the message to the database
      const newMessage = await Message.create({
        chatId,
        senderId,
        text: text.trim(),
        createdAt: new Date(),
      });
      // ✅ Broadcast the message to all clients in the same chat room (including sender)
      io.to(chatId).emit("newMessage", newMessage);
      console.log(`📢 Broadcasted message to chat ${chatId}`);
    } catch (err) {
      console.error("❌ Error handling sendMessage:", err);
    }
  });
});

server.listen(port, () => console.log("Server running on port 3000"));
