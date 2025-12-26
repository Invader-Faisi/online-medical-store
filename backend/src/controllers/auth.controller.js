const bcrypt = require("bcryptjs");
const db = require("../config/db");
const { generateToken } = require("../config/jwt");

// REGISTER USER
exports.register = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  // Validation
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      message: "Name, email, phone and password are required"
    });
  }

  // Check if email already exists
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (result.length > 0) {
        return res.status(409).json({ message: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.query(
        "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)",
        [name, email, phone, hashedPassword, role || "USER"],
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Registration failed" });
          }

          res.status(201).json({
            message: "User registered successfully"
          });
        }
      );
    }
  );
};


// LOGIN USER
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT
      const token = generateToken({
        id: user.id,
        name: user.name,
        role: user.role
      });

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      });
    }
  );
};


