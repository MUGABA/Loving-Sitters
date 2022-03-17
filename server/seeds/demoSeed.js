const User = require("../models/User");
const connectDB = require("../db");
const Profile = require("../models/Profile");
const mongoose = require("mongoose");
require("dotenv").config();

const createDemoUserDetails = async () => {
  console.log(process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.DEMO_USER_EMAIL;
  const password = process.env.DEMO_USER_PASSWORD;
  const name = "Demo Account";

  const user = await User.create({
    name,
    email,
    password,
  })
    .then((res) => res)
    .catch((err) => console.log("something is work", err));

  await Profile.create({
    userId: user.toObject()._id,
    name: "Demo User",
    description: "This is a demo account",
    gender: "other",
    address: "International",
    telephone: "+1 798670776",
    birthDay: new Date(),
    photo: "Base64 string here",
  });

  console.log({
    message: "Demo user created successfully! Press crtl + c to exit",
  });
};

createDemoUserDetails();
