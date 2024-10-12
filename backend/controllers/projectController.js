const Project = require("../models/project");
const User = require("../models/user");
const cloudinary = require("../config/cloudinary");
exports.createProject = async (req, res) => {
  console.log(req.body); // Log the form data
  console.log(req.file); // Log the file data

  const { title, description, deadline, duration } = req.body;
  console.log(`title is :${title}`);
  const client = req.user._id;
  console.log(client);

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

  const project = new Project({
    client,
    title,
    description,
    image: profileImageUrl,
    deadline,
    duration,
  });

  try {
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};

// exports.createProject = async (req, res) => {

//   const { title, description, deadline, duration } = req.body;
//   console.log(`title is :${title}`);
//   const client = req.user._id;

//   let profileImageUrl = "";
//   if (req.file) {
//     try {
//       console.log("try  k neeche");
//       const result = await cloudinary.uploader.upload(req.file.path);
//       console.log("url k upar");
//       profileImageUrl = result.secure_url;
//       console.log("url k neeche");
//       console.log("Uploaded Image URL:", profileImageUrl);
//     } catch (error) {
//       console.log("aa ja bhai ab gnd mra");
//       console.log(error);
//     }
//   }

//   const project = new Project({
//     client,
//     title,
//     description,
//     image: profileImageUrl,
//     deadline,
//     duration,
//   });

//   try {
//     await project.save();
//     res.status(201).json(project);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating project", error: error.message });
//   }
// };
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
    if (role === "Client") {
      projects = await Project.find({}).populate("client", "name");
      //   console.log("alumini");
      console.log(projects);
    } else if (role === "Student") {
      const user = await User.findById(userId);
      const university = user.university;
      projects = await Project.find({
        repostedForUniversity: university,
      }).populate("repostedBy", "name");
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

// exports.getProjects = async (req, res) => {
//   const role = req.user.role;
//   const userId = req.user._id;

//   try {
//     let projects;
//     if (role === "Alumni") {
//       projects = await Project.find({}).populate("client", "name");
//       //   console.log("alumini");
//       //   console.log(projects);
//     } else if (role === "Student") {
//       const user = await User.findById(userId);
//       const university = user.university;
//       projects = await Project.find({
//         repostedForUniversity: university,
//       }).populate("repostedBy", "name");
//     } else if (role === "Client") {
//       projects = await Project.find({ client: userId }).populate(
//         "client",
//         "name"
//       );
//     }

//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching projects",
//       error: error.message,
//     });
//   }
// };
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

exports.getSingleProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
