const mongoose = require("mongoose");

// ACCOUNT
const AccountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },
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
    age: {type: Number, default: 18},
    sharedLocation: {type: Boolean, default: false },
    avatarLink: { type: String, default: "https://stock.adobe.com/tw/images/default-avatar-profile-icon-transparent-png-social-media-user-png-icon-whatsapp-dp/589932782"},
    skills: { type: [String], default: [] }, // array of skill slugs or ids
    interests: { type: [String], default: [] }, // array of string interests
  },
  { timestamps: true }
);

// LIKE
const LikeSchema = new mongoose.Schema(
    {
      fromUserId: { type: String, required: true }, // user who liked
      toUserId: { type: String, required: true },   // user who was liked
      matched: { type: Boolean, default: false },   // true if both liked each other
    },
    { timestamps: true }
  );
  
  // ensure one "like" record per pair
  LikeSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });
  
// EXPORT MODELS
const Account = mongoose.model("Account", AccountSchema);
const Category = mongoose.model("Category", CategorySchema);
const Chat = mongoose.model("Chat", ChatSchema);
const Message = mongoose.model("Message", MessageSchema);
const Skill = mongoose.model("Skill", SkillSchema);
const User = mongoose.model("User", UserSchema);
const Like = mongoose.model("Like", LikeSchema);
module.exports = { Account, Category, Chat, Message, Skill, User, Like };
