const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    university,
    companyName,
    individualOrCompany,
  } = req.body;

  // Custom validation based on role
  // if (role === "Client" && individualOrCompany === "Individual" && !name) {
  //   return res
  //     .status(400)
  //     .json({ message: "Name is required for individual clients." });
  // }

  // if (role === "Client" && individualOrCompany === "Company" && !companyName) {
  //   return res
  //     .status(400)
  //     .json({ message: "Company name is required for company clients." });
  // }

  // if (role === "Alumni" && !name) {
  //   return res.status(400).json({ message: "Name is required for alumni." });
  // }

  // if (role === "Student" && !name) {
  //   return res.status(400).json({ message: "Name is required for students." });
  // }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create user instance with all fields
  const user = new User({
    name,
    email,
    password,
    role,
    university,
    companyName,
    individualOrCompany,
  });

  await user.save();

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.status(201).json({ token });
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};
