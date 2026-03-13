import express from "express";
import queueManager from "../queue/QueueManager.js";

const router = express.Router();

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Not logged in" });
};

router.get("/", requireAuth, (req, res) => {
  res.json(queueManager.getAllQueues());
});

router.get("/status", (req, res) => {
  if (!req.user) return res.json({ inQueue: false, user: null });
  res.json({
    user: req.user,
    ...queueManager.getStatus(req.user.id),
  });
});

router.post("/:id/join", requireAuth, (req, res) => {
  const result = queueManager.join(req.params.id, req.user);
  if (!result.ok) return res.status(400).json(result);
  res.json(result);
});

router.post("/leave", requireAuth, (req, res) => {
  const result = queueManager.leave(req.user.id);
  if (!result.ok) return res.status(400).json(result);
  res.json(result);
});

router.post("/finish", requireAuth, (req, res) => {
  const status = queueManager.getStatus(req.user.id);
  if (!status.inQueue || !status.isMyTurn) {
    return res.status(400).json({ error: "Not at front of queue" });
  }
  const result = queueManager.finish(req.user.id);
  if (!result.ok) return res.status(400).json(result);
  res.json(result);
});

export default router;
