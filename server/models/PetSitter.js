const mongoose = require("mongoose");
const Profile = require("./Profile");

const petSitterSchema = new mongoose.Schema({
  stripeConnectId: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    min: 0,
    required: true,
  },
});

const petSitter = Profile.discriminator("petSitter", petSitterSchema);

module.exports = PetSitter = mongoose.model("petSitter");
