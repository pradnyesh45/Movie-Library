const express = require("express");

const router = express.Router();
const { verifyJWT } = require("../middleware/verify");

const controller = require("../controller/index");
const userController = require("../controller/userController");
router.use(verifyJWT);
// Home
router.get("/", controller.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/authenticate");
router.post("/addPlaylist");
router.delete("/deletePlaylist");
router.get("/getPlaylists");
router.get("/addMovieToPlaylist");
router.delete("/deleteMovieFromPlaylist");
router.delete("/deleteMovie");
router.get("/getMoviesFromPlaylist");
router.get("/viewPlaylistById/:id");

module.exports = router;
