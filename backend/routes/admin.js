const express = require("express");
const User = require("../models/User");
const Project = require("../models/Project");
const Service = require("../models/Service");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

/* Dashboard Stats */
router.get("/stats", auth, roleCheck(["admin"]), async (req, res) => {
  const users = await User.countDocuments();
  const projects = await Project.countDocuments();
  res.json({ users, projects });
});

/* Create Employee */
router.post("/create-employee", auth, roleCheck(["admin"]), async (req, res) => {
  const { name, email, password } = req.body;
  const bcrypt = require("bcryptjs");
  const hashed = await bcrypt.hash(password, 10);

  const employee = await User.create({
    name,
    email,
    password: hashed,
    role: "employee",
  });

  res.json(employee);
});

/* Create Service */
router.post("/create-service", auth, roleCheck(["admin"]), async (req, res) => {
  const service = await Service.create(req.body);
  res.json(service);
});

/* CREATE PROJECT */
router.post("/create-project", auth, roleCheck(["admin"]), async (req, res) => {
  try {
    const { name, description, clientId } = req.body;

    const project = await Project.create({
      name,
      description,
      client: clientId,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ASSIGN EMPLOYEE */
router.put(
  "/assign-employee/:projectId",
  auth,
  roleCheck(["admin"]),
  async (req, res) => {
    try {
      const { employeeId } = req.body;

      const project = await Project.findById(req.params.projectId);
      if (!project)
        return res.status(404).json({ message: "Project not found" });

      if (!project.assignedEmployees.includes(employeeId)) {
        project.assignedEmployees.push(employeeId);
      }

      await project.save();

      res.json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/projects", auth, roleCheck(["admin"]), async (req, res) => {
  const projects = await Project.find()
    .populate("client", "name email")
    .populate("assignedEmployees", "name email");

  res.json(projects);
});

router.get("/users", auth, roleCheck(["admin"]), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.delete("/users/:id", auth, roleCheck(["admin"]), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/employees", auth, roleCheck(["admin"]), async (req, res) => {
  const employees = await User.find({ role: "employee" }).select("-password");
  res.json(employees);
});

router.get("/clients", auth, roleCheck(["admin"]), async (req, res) => {
  const clients = await User.find({ role: "client" }).select("-password");
  res.json(clients);
});

router.post("/projects", auth, roleCheck(["admin"]), async (req, res) => {
  try {
    const { name, description, clientId, employeeIds } = req.body;

    const project = await Project.create({
      name,
      description,
      client: clientId,
      assignedEmployees: employeeIds,
      status: "Pending",
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/projects", auth, roleCheck(["admin"]), async (req, res) => {
  const projects = await Project.find()
    .populate("client", "name email")
    .populate("assignedEmployees", "name email");

  res.json(projects);
});

router.get("/stats", auth, roleCheck(["admin"]), async (req, res) => {
  const users = await User.countDocuments();
  const projects = await Project.countDocuments();
  const pendingRequests = await ServiceRequest.countDocuments({ status: "Pending" });
  const completedProjects = await Project.countDocuments({ status: "Completed" });

  res.json({
    users,
    projects,
    pendingRequests,
    completedProjects,
  });
});

module.exports = router;