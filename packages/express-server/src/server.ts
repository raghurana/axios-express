import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Example API endpoint
app.get("/api/data", (req: Request, res: Response) => {
  res.json({
    message: "Hello from Express server!",
    data: {
      id: 1,
      name: "Example Data",
      timestamp: new Date().toISOString(),
    },
  });
});

// POST endpoint example
app.post("/api/data", (req: Request, res: Response) => {
  const { name, value } = req.body;

  res.json({
    message: "Data received successfully",
    received: {
      name,
      value,
      timestamp: new Date().toISOString(),
    },
  });
});

app.put("/api/data", (req: Request, res: Response) => {
  const { name, value } = req.body;
  console.log("req.headers", req.headers);
  console.log("Data received:", req.body);
  res.json({
    message: "Data received successfully",
    received: {
      name,
      value,
      timestamp: new Date().toISOString(),
    },
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "Not found",
    path: req.originalUrl,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 API docs: http://localhost:${PORT}/api/data`);
});
