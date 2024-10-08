const express = require("express");
const {
  createProject,
  repostProject,
  // getUniversityProjects,
  // getClientProjects,
  // getAllProjects,
  getProjects,
} = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Client posting a project
router.post("/create", authMiddleware, createProject);

// Alumni reposting a project
router.put("/repost/:projectId", authMiddleware, repostProject);

// Student fetching university-specific projects
// router.get("/university_projects", authMiddleware, getUniversityProjects);
// router.get("/client_projects", authMiddleware, getClientProjects);
// router.get("/all_projects", authMiddleware, getAllProjects);
router.get("/getProjects", authMiddleware, getProjects);
module.exports = router;
