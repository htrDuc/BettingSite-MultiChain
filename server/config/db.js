const mongoose = require('mongoose');
const connectString = process.env.MONGODB_URL

const connectDB = async () => {
  try {
    await mongoose.connect(connectString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
