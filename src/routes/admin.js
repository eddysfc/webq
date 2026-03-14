import express from "express";
import queueManager from "../queue/QueueManager.js";
import ADMIN_IDS from "../admins.js";

const router = express.Router();

const requireAdmin = (req, res, next) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ error: "Not logged in" });
  if (!ADMIN_IDS.includes(req.user.id))
    return res.status(403).json({ error: "Forbidden" });
  next();
};

router.use(requireAdmin);

router.get("/queues", (req, res) => {
  res.json(queueManager.getAllQueues());
});

router.post("/queues", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });
  const queue = queueManager.createQueue(name);
  res.json(queue.toJSON());
});

router.delete("/queues/:id", (req, res) => {
  const ok = queueManager.deleteQueue(req.params.id);
  if (!ok) return res.status(404).json({ error: "Queue not found" });
  res.json({ ok: true });
});

router.post("/queues/:id/add", (req, res) => {
  const { userId, username } = req.body;

  const id = userId || `walkin_${Date.now()}`;
  if (!username) return res.status(400).json({ error: "username required" });

  const result = queueManager.join(req.params.id, { id, username });
  if (!result.ok) return res.status(400).json(result);
  res.json({ ok: true, id });
});

router.delete("/queues/:id/remove/:userId", (req, res) => {
  const result = queueManager.leave(req.params.userId);
  if (!result.ok) return res.status(400).json(result);
  res.json(result);
});

router.post("/queues/:id/pop", (req, res) => {
  const queue = queueManager.getQueue(req.params.id);
  if (!queue) return res.status(404).json({ error: "Queue not found" });
  const front = queue.peek();
  if (!front) return res.status(400).json({ error: "Queue is empty" });
  queueManager.leave(front.id);
  res.json({ ok: true, removed: front });
});

router.post("/queues/:id/clear", (req, res) => {
  const queue = queueManager.getQueue(req.params.id);
  if (!queue) return res.status(404).json({ error: "Queue not found" });
  const members = [...queue.members];
  for (const member of members) {
    queueManager.leave(member.id);
  }
  res.json({ ok: true });
});

export default router;
