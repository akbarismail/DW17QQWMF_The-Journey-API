const express = require("express");
const router = express.Router();

const { authenticated } = require("../middleware/auth");
const { login } = require("../controller/login");
const { register } = require("../controller/register");
const {
  findJourneys,
  addJourney,
  findJourneyUser,
} = require("../controller/journey");
const { findUser } = require("../controller/profile");
const { addBookmark, findBookmark } = require("../controller/bookmark");

// login and register
router.post("/login", login);
router.post("/register", register);

// journey
router.get("/journey", findJourneys);
router.get("/journey/user/:userId", authenticated, findJourneyUser);
router.post("/journey", authenticated, addJourney);

// profile
router.get("/profile/:id", authenticated, findUser);

// bookmark
router.post("/bookmark", authenticated, addBookmark);
router.get("/bookmark/profile/:id", authenticated, findBookmark);

module.exports = router;
