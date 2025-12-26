const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const db = require("./src/config/db");

db.query("SELECT 1", (err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Database connected successfully");
  }
});