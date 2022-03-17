const express = require("express");
const {
  getRequest,
  postRequest,
  updateRequest,
} = require("../controllers/request");

const { validateRequest } = require("../validate");

const router = express.Router();

const protect = require("../middleware/auth");

router.post("/", [protect, validateRequest], postRequest);

router.get("/", protect, getRequest);

router.put("/:id", protect, updateRequest);

module.exports = router;
