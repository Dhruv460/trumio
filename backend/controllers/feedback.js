const feedbackModel = require("../models/feedback");

exports.feedBack = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    const user = req.user._id;

    if (!name || !email || !feedback) {
      console.log("fields are empty");
      return res.status(404).json({ message: "required fields are empty" });
    }

    const response = new feedbackModel({
      name,
      email,
      feedback,
      user,
    });
    await response.save();
    res.status(201).json(response);
  } catch (eror) {
    console.log(error);
  }
};
