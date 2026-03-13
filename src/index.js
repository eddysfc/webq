import express from "express";
import dotenv from "dotenv";
import queueRouter from "./routes/queue.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("public"));

app.use("/api/queue", queueRouter);
app.use("/auth", authRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
