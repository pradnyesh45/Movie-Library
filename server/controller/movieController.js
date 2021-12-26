const Movie = require("../models/movie");

module.exports.addMovieToPlaylist = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

    const data = req.body;

    if (token === data.userdata.token) {
      const m = await Movie.insertMany(data.movies);

      console.log("saving these " + m);

      //const playlists = await Playlist.find({user_id: {$eq: data.userdata.user._id} }).sort({createdAt: -1});
      return res.json({ success: true });
    } else {
      return res.json({ success: false, error: "invalid token" });
    }
  } catch (error) {
    res.json({ success: false, error: "invalid token" });
  }
};

module.exports.deleteMovieFromPlaylist = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

    const data = req.body;

    if (token === data.userdata.token) {
      //remove movie playlists
      const m = await Movie.deleteMany({
        imdbID: data.movie.imdbID,
        playlist_id: { $in: data.playlist_ids },
      });
      return res.json({ success: true });
    } else {
      return res.json({ success: false, error: "invalid token" });
    }
  } catch (error) {
    res.json({ success: false, error: "invalid token" });
  }
};
