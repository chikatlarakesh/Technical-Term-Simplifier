require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      console.error('❌ MongoDB URI not provided in .env file');
      return process.exit(1);
    }

    console.log('📦 Connecting to MongoDB with URI:', dbUri);
    await mongoose.connect(dbUri);  // Removed deprecated options

    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error.message);
    process.exit(1); // Exit the app if DB fails
  }
};

module.exports = connectDB;
