const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const Project = require("../models/Project");

/* GET CLIENT PROJECTS */
router.get(
  "/projects",
  auth,
  roleCheck(["client"]),
  async (req, res) => {
    try {
      const projects = await Project.find({
        client: req.user.id,
      })
        .populate("assignedEmployees", "name email");

      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;