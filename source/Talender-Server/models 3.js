const mongoose = require("mongoose");
const c = 3;
// ACCOUNT
const AccountSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        token: { type: String, default: "" },
    },
    { timestamps: true }
);

// CATEGORY
const CategorySchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

// CHAT
const ChatSchema = new mongoose.Schema(
    {
        chatId: { type: String, required: true, unique: true },
        participants: { type: [String], required: true }, // array of user UUIDs
        lastMessage: {
            text: { type: String },
            senderId: { type: String },
            createdAt: { type: Date },
        },
    },
    { timestamps: true }
);

// MESSAGE
const MessageSchema = new mongoose.Schema({
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// SKILL
const SkillSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        categories: { type: [String], required: true },
    },
    { timestamps: true }
);

// USER
const UserSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true }, // uuid or numeric string
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        moderator: { type: Boolean, default: false },
        location: { type: String, default: "" },
        skills: { type: [String], default: [] }, // array of skill slugs or ids
        interests: { type: [String], default: [] }, // array of string interests
    },
    { timestamps: true }
);

// EXPORT MODELS
const Account = mongoose.model("Account", AccountSchema);
const Category = mongoose.model("Category", CategorySchema);
const Chat = mongoose.model("Chat", ChatSchema);
const Message = mongoose.model("Message", MessageSchema);
const Skill = mongoose.model("Skill", SkillSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Account, Category, Chat, Message, Skill, User };
