const User = require("../models/User");
const Profile = require("../models/Profile");
const Notification = require("../models/Notification");
const PetSitter = require("../models/PetSitter");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const userExists = await User.findOne({ name });

  if (userExists) {
    res.status(400);
    throw new Error("A user with that username already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const isPetSitter = req.query.accountType === "petSitter" ? true : false;

  if (user) {
    const customer = await stripe.customers.create({
      description: `Customer name is ${name}`,
    });
    const { id } = customer;
    if (isPetSitter) {
      await PetSitter.create({
        userId: user._id,
        stripeConnectId: id,
        name,
      });
    } else {
      const customer = await stripe.customers.create({
        description: `Customer name is ${name}`,
      });

      const { id } = customer;
      const profile = await Profile.create({
        userId: user._id,
        stripeAccountId: id,
        name,
      });
    }
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const isDemo = req.query.isDemo;

  let email, password;

  if (!isDemo) {
    email = req.body.email;
    password = req.body.password;
  } else {
    email = process.env.DEMO_USER_EMAIL;
    password = process.env.DEMO_USER_PASSWORD;
  }

  const user = await User.findOne({ email });
  const userId = user.id;

  if (!user) {
    res.status(400);
    throw new Error("Wrong email or password!");
  }
  const notifications = await Notification.find({ recieverId: user.id });
  const profile = await Profile.findOneAndUpdate(userId, { isOnline: true });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        profile,
        notifications,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const profile = await Profile.findOne({ userId: req.user.id });
  const notifications = await Notification.find({
    recieverId: req.user.id,
  });

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      profile,
      notifications,
    },
  });
});

// @route POST /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });

  profile.set({ isOnline: false });

  await profile.save();
  res.clearCookie("token");

  res.send("You have successfully logged out");
});
