const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const { authenticated } = require("../middleware/auth");
const { login } = require("../controller/login");
const { register } = require("../controller/register");
const {
  findJourneys,
  addJourney,
  findJourneyUser,
  updateJourney,
  findJourney,
} = require("../controller/journey");
const { findUser, updateUser } = require("../controller/profile");
const {
  addBookmark,
  findUserBookmark,
  deleteBookmark,
} = require("../controller/bookmark");

// login and register
router.post("/login", login);
router.post("/register", register);

// journey
router.get("/journey", findJourneys);
router.get("/journey/user/:userId", authenticated, findJourneyUser);
router.get("/journey/:id", authenticated, findJourney);
router.post("/journey", fileUpload(), addJourney);
router.patch("/journey/:id", authenticated, updateJourney);

// profile
router.get("/profile/:id", authenticated, findUser);
router.patch("/profile/:id", authenticated, fileUpload(), updateUser);

// bookmark
router.post("/bookmark", authenticated, addBookmark);
router.get("/bookmarks/user/:bmUserId", authenticated, findUserBookmark);
router.delete("/bookmark/:id", authenticated, deleteBookmark);

module.exports = router;
