const mongoose = require("mongoose");
const { ObjectId } = require("bson");

const movieSchema = new mongoose.Schema(
  {
    PlaylistId: {
      type: String,
      required: true,
    },
    imdbID: {
      type: ObjectId,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Year: {
      type: Date,
    },
    Poster: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
