const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const Project = require("../models/Project");

/* ================= GET ASSIGNED PROJECTS ================= */

router.get(
  "/projects",
  auth,
  roleCheck(["employee"]),
  async (req, res) => {
    try {
      const projects = await Project.find({
        assignedEmployees: req.user.id,
      })
        .populate("client", "name email")
        .populate("assignedEmployees", "name");

      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* UPDATE PROJECT STATUS */
router.patch(
  "/projects/:id",
  auth,
  roleCheck(["employee"]),
  async (req, res) => {
    try {
      const { status } = req.body;

      const project = await Project.findOne({
        _id: req.params.id,
        assignedEmployees: req.user.id,
      });

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      project.status = status;
      await project.save();

      res.json({ message: "Status updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;