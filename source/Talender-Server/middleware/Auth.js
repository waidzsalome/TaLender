const { Blacklist } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];

  const blacklisted = await Blacklist.findOne({ token });
  if (blacklisted) return res.status(401).json({ error: "Token revoked" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {authMiddleware}