// const mongoose = require("mongoose");

// const projectSchema = new mongoose.Schema(
//   {
//     client: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     repostedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     }, // Alumni who reposted
//     repostedForUniversity: {
//       type: String,
//     }, // (kyoki har bacche ki feed alag hogi )
//   },
//   { timestamps: true }
// );

// // Exporting the model
// module.exports = mongoose.model("Project", projectSchema);

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
    image: { type: String }, // URL of the uploaded image
    deadline: { type: Date }, // Deadline of the project
    duration: { type: String }, // Duration of the project
    repostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    repostedForUniversity: {
      type: String,
    },
  },
  { timestamps: true }
);

// Exporting the model
module.exports = mongoose.model("Project", projectSchema);
