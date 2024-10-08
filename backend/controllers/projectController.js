const Project = require("../models/project");
const User = require("../models/user");
// Post a project (Client side)
exports.createProject = async (req, res) => {
  const { title, description } = req.body;
  const project = new Project({ client: req.user._id, title, description });
  await project.save();
  res.status(201).json(project);
};

// Repost a project (Alumni side)
exports.repostProject = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id; // Alumni's university
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const university = user.university;
  //   console.log(university);
  //   console.log(req.user);
  const project = await Project.findByIdAndUpdate(
    projectId,
    { repostedBy: req.user._id, repostedForUniversity: university },
    { new: true }
  );
  res.json(project);
};

exports.getProjects = async (req, res) => {
  const role = req.user.role;
  const userId = req.user._id;

  try {
    let projects;
    if (role === "Alumni") {
      projects = await Project.find({}).populate("client", "name");
      //   console.log("alumini");
      //   console.log(projects);
    } else if (role === "Student") {
      const user = await User.findById(userId);
      const university = user.university;
      projects = await Project.find({
        repostedForUniversity: university,
      }).populate("repostedBy", "name");
    } else if (role === "Client") {
      projects = await Project.find({ client: userId }).populate(
        "client",
        "name"
      );
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
};
// // Get projects for students (Student side)
// exports.getUniversityProjects = async (req, res) => {
//   const userId = req.user._id;
//   //   const { university } = req.user;
//   const user = await User.findById(userId);
//   const university = user.university;
//   const projects = await Project.find({ repostedForUniversity: university });
//   res.json(projects);
// };

// // Get projects created by a specific client
// exports.getClientProjects = async (req, res) => {
//   const clientId = req.user._id; // Assuming the client is authenticated and their ID is in req.user

//   try {
//     const projects = await Project.find({ client: clientId });
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching client projects",
//       error: error.message,
//     });
//   }
// };

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching projects", error: error.message });
  }
};
