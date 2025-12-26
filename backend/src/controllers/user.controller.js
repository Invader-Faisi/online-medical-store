const db = require("../config/db");
const bcrypt = require("bcryptjs");

// GET USER PROFILE
exports.getProfile = async (req, res) => {
  const userId = req.user.id; 

  const query = "SELECT id, name, email, phone, role FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
};

// UPDATE USER PROFILE
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, phone, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  let query = "UPDATE users SET name = ?, email = ?, phone = ?";
  let params = [name, email, phone];

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += ", password = ?";
    params.push(hashedPassword);
  }

  query += " WHERE id = ?";
  params.push(userId);

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json({ message: "Profile updated successfully" });
  });
};