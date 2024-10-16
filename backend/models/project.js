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
const BidSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  bidReason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const projectSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    deadline: { type: Date },
    duration: { type: String },
    repostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    repostedForUniversity: {
      type: String,
    },
    bids: [BidSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
