const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

/** GET /users */
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/** GET /users/:id */
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

/** POST /users */
exports.createUser = async (req, res) => {
  const { email, password, role, name,
    address,
    phone } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hash,
    role,
    name,
    address,
    phone
  });

  res.status(201).json({
    id: user._id,
    email: user.email,
    role: user.role
  });
};

/** PUT /users/:id */
exports.updateUser = async (req, res) => {
  const update = { ...req.body };

  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true }
  ).select("-password");

  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

/** DELETE /users/:id */
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(204).send();
};
