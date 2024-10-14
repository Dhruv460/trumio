const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Client", "Student"],
    },
    university: { type: String },
    companyName: { type: String },
    currentCompany: { type: String },
    individualOrCompany: {
      type: String,
      enum: ["Individual", "Company"],
    },
    image: {
      type: String,
      default: "https://freesvg.org/img/abstract-user-flat-4.png",
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
