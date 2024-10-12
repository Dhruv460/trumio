const User = require("../models/user");
const jwt = require("jsonwebtoken");

const cloudinary = require("../config/cloudinary");

// Register User
exports.register = async (req, res) => {
  const { name, email, password, role, university } = req.body;
  console.log(email);
  console.log(password);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  let profileImageUrl = "";
  if (req.file) {
    try {
      console.log("try  k neeche");

      // Use Cloudinary's upload_stream to handle the file buffer
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_images" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        // Pipe the buffer to Cloudinary's upload stream
        stream.end(req.file.buffer);
      });

      console.log("url k upar");
      profileImageUrl = result.secure_url;
      console.log("url k neeche");
      console.log("Uploaded Image URL:", profileImageUrl);
    } catch (error) {
      console.log("Error during image upload:");
      console.log(error);
    }
  }

  // Create user instance with all fields
  const user = new User({
    name,
    email,
    password,
    role,
    university,
    image: profileImageUrl,
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
