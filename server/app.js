const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const conversationRouter = require("./routes/conversation");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const paymentMethodsRouter = require("./routes/paymentMethods");
const stripeConnectRouter = require("./routes/stripeConnect");
const imageUploadRouter = require("./routes/imageUpload");
const notificationRouter = require("./routes/notification");
const availabilityRouter = require("./routes/availability");
const paymentRouter = require("./routes/payment");

const requestRouter = require("./routes/requests");

const { json, urlencoded } = express;

connectDB();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const PublicKey = process.env.STRIPE_PUBLIC_KEY;

const app = express();
const server = http.createServer(app);
const stripe = require("stripe")(stripeSecretKey);

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(
  cors({
    origin: ["https://checkout.stripe.com"],
  })
);
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/conversations", conversationRouter);

app.use("/payment_methods", paymentMethodsRouter);
app.use("/stripe", stripeConnectRouter);
app.use("/imageUpload", imageUploadRouter);

app.use("/notification", notificationRouter);
app.use("/availability", availabilityRouter);
app.use("/payments", paymentRouter);
app.use("/request", requestRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
