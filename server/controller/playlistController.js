const Playlist = require("../models/playlist");

module.exports.addPlaylist = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    const data = req.body;

    if (token === data.userdata.token) {
      const playlist = await Playlist.create({
        name: data.playlist,
        user_id: data.userdata.user._id,
        is_public: data.is_public,
      });

      return res.json({ success: true, playlist: playlist });
    } else {
      return res.json({ success: false, error: "invalid token" });
    }
  } catch (error) {
    res.json({ success: false, error: "invalid token" });
  }
};

module.exports.getPlaylist = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    const data = req.body;

    if (token === data.userdata.token) {
      const playlists = await Playlist.find({
        user_id: { $eq: data.userdata.user._id },
      }).sort({ createdAt: -1 });
      return res.json({ success: true, playlists: playlists });
    } else {
      return res.json({ success: false, error: "invalid token" });
    }
  } catch (error) {
    res.json({ success: false, error: "invalid token" });
  }
};

module.exports.deletePlaylist = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    const data = req.body;

    if (token === data.userdata.token) {
      //remove playlist
      const p = await Playlist.deleteOne({ _id: { $eq: data._id } });
      //remove related movies also
      const m = await Movie.deleteMany({ playlist_id: { $eq: data._id } });
      return res.json({ success: true });
    } else {
      return res.json({ success: false, error: "invalid token" });
    }
  } catch (error) {
    res.json({ success: false, error: "invalid token" });
  }
};
