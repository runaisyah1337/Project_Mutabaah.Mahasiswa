const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { nim, password } = req.body;

    if (!nim || !password) {
      return res.status(400).json({ message: "NIM dan Password wajib diisi" });
    }

    // cek apakah nim ada di database
    const existingUser = await User.findOne({ nim });
    if (existingUser) {
      return res.status(400).json({ message: "NIM sudah terdaftar" });
    }

    // cek apakah NIM yang dimasukkan valid (data mahasiswa yang sudah kamu masukkan Atlas)
    const mahasiswa = await User.findOne({ nim }); // jika kamu pakai collection terpisah, beri tahu aku
    if (!mahasiswa) {
      return res.status(404).json({ message: "NIM tidak ditemukan dalam data mahasiswa" });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // buat user baru
    const newUser = await User.create({
      nim,
      name: mahasiswa.name, // atau req.body.name jika user input nama sendiri
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        nim: newUser.nim,
        name: newUser.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
