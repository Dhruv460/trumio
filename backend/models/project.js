const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    repostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // Alumni who reposted
    repostedForUniversity: {
      type: String,
      required: true,
    }, // (kyoki har bacche ki feed alag hogi )
  },
  { timestamps: true }
);

// Exporting the model
module.exports = mongoose.model("Project", projectSchema);
