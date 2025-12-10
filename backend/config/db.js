const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || '';
const USE_DB = !!MONGO_URI;

async function connectDB() {
  if (!USE_DB) {
    console.log('MongoDB connection skipped because MONGO_URI is empty.');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      // options handled by default in modern drivers
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}

module.exports = connectDB;
