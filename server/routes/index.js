const express = require("express");

const router = express.Router();
// const { verifyJWT } = require("../middleware/verify");

const controller = require("../controller/index");
const userController = require("../controller/userController");
const playlistController = require("../controller/playlistController");
const movieController = require("../controller/movieController");
// router.use(verifyJWT);
// Home
router.get("/", controller.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/authenticate", controller.authenticate);
router.post("/addPlaylist", playlistController.addPlaylist);
router.delete("/deletePlaylist", playlistController.deletePlaylist);
router.get("/getPlaylists", playlistController.getPlaylist);
router.get("/addMovieToPlaylist", movieController.addMovieToPlaylist);
router.delete(
  "/deleteMovieFromPlaylist",
  movieController.deleteMovieFromPlaylist
);

module.exports = router;
