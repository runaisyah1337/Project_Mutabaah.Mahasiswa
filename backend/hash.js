const bcrypt = require("bcryptjs");

async function generateHash() {
  const password = "password123"; // password asli yang kamu masukkan
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashed);
}

generateHash();
