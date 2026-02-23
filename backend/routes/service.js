const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/ServiceRequest");
const Project = require("../models/Project");
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

/* ================= CLIENT CREATE REQUEST ================= */
router.post("/", auth, roleCheck(["client"]), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const request = await ServiceRequest.create({
      client: req.user.id,
      title,
      description,
    });

    res.json(request);
  } catch (err) {
    console.error("Create request error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= ADMIN VIEW ALL REQUESTS ================= */
router.get("/", auth, roleCheck(["admin"]), async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("Fetch requests error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= ADMIN APPROVE REQUEST ================= */
/* ADMIN APPROVE REQUEST */
router.patch("/:id/approve", auth, roleCheck(["admin"]), async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update status
    request.status = "Approved";
    await request.save();

    // Create project
    await Project.create({
      name: request.title,
      description: request.description,
      client: request.client,
      status: "Pending",
    });

    // CREATE NOTIFICATION HERE
    await Notification.create({
      user: request.client,
      message: `Your service request "${request.title}" has been approved.`,
      read: false,
    });

    res.json({ message: "Request approved, project created & client notified" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CLIENT VIEW OWN REQUESTS ================= */
router.get("/my", auth, roleCheck(["client"]), async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      client: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("Client fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;