import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { HttpClient } from "./http-client";

const app = express();
const PORT = process.env.PORT || 3001; // Different port to avoid conflict

// Create API client instance pointing to the express-server
const apiClient = new HttpClient("http://localhost:3000");

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Axios client server is running",
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

// Proxy endpoint that uses ApiClient to call the express-server
app.get("/api/proxy/health", async (req: Request, res: Response) => {
  try {
    // Extract all incoming headers
    const headers = req.headers as Record<string, string>;
    const healthData = await apiClient.get("/api/health", headers);
    res.json({
      message: "Health check from express-server via ApiClient",
      data: healthData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error calling express-server:", error);
    res.status(500).json({
      error: "Failed to call express-server",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Proxy endpoint for getting data from express-server
app.get("/api/proxy/data", async (req: Request, res: Response) => {
  try {
    // Extract all incoming headers
    const headers = req.headers as Record<string, string>;
    const data = await apiClient.get("/api/data", headers);
    res.json({
      message: "Data from express-server via ApiClient",
      data: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error calling express-server:", error);
    res.status(500).json({
      error: "Failed to call express-server",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Proxy endpoint for posting data to express-server
app.post("/api/proxy/data", async (req: Request, res: Response) => {
  try {
    const { name, value } = req.body;
    // Extract all incoming headers
    const headers = req.headers as Record<string, string>;
    const response = await apiClient.post(
      "/api/data",
      { name, value },
      headers
    );
    res.json({
      message: "Data posted to express-server via ApiClient",
      response: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error calling express-server:", error);
    res.status(500).json({
      error: "Failed to call express-server",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Proxy endpoint for putting data to express-server
app.put("/api/proxy/data", async (req: Request, res: Response) => {
  try {
    const { name, value } = req.body;
    // Extract all incoming headers
    const headers = req.headers as Record<string, string>;
    const response = await apiClient.put("/api/data", { name, value }, headers);
    res.json({
      message: "Data updated in express-server via ApiClient",
      response: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error calling express-server:", error);
    res.status(500).json({
      error: "Failed to call express-server",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
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
  console.log(`🚀 Axios client server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Proxy endpoints: http://localhost:${PORT}/api/proxy/*`);
  console.log(
    `📝 This server uses ApiClient to call express-server on port 3000`
  );
});
