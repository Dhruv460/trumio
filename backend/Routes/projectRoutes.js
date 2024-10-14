const express = require("express");
const multer = require("multer");
const {
  createProject,
  repostProject,
  // getUniversityProjects,
  getClientProjects,
  // getAllProjects,
  getSingleProject,
  getProjects,
} = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const upload = multer();
const Project = require("../models/project");

router.post("/create", authMiddleware, upload.single("image"), createProject);

router.put("/repost/:projectId", authMiddleware, repostProject);

// router.get("/university_projects", authMiddleware, getUniversityProjects);
router.get("/client_projects", authMiddleware, getClientProjects);
// router.get("/all_projects", authMiddleware, getAllProjects);
router.get("/getProjects", authMiddleware, getProjects);
router.get("/getProject/:id", authMiddleware, getSingleProject);

router.get("/my-projects/:projectId/bids", authMiddleware, async (req, res) => {
  const { projectId } = req.params;
  const client = req.user._id;

  try {
    const project = await Project.findById(projectId).populate(
      "bids.student",
      "name"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.client.toString() !== client.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(project.bids);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving bids", error: error.message });
  }
});
router.post("/:projectId/bid", authMiddleware, async (req, res) => {
  const { projectId } = req.params;
  const { bidAmount, bidReason } = req.body;
  const student = req.user._id;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.bids.push({
      student,
      bidAmount,
      bidReason,
    });

    await project.save();
    res.status(200).json({ message: "Bid submitted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting bid", error: error.message });
  }
});

module.exports = router;
