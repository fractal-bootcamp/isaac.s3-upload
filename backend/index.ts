import express from "express";
import cors from "cors";
import { S3 } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const app = express();
const PORT = process.env.PORT || 3001;

// Apply CORS middleware
app.use(cors());

// Body parser middleware (JSON)
app.use(express.json());

// Initialize S3 client
const s3 = new S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = "aizk-storage";

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// List all files in bucket
app.get("/api/files", async (req, res) => {
  try {
    const objects = await s3.listObjects({ Bucket: BUCKET_NAME });

    const files =
      objects.Contents?.map((object) => ({
        key: object.Key,
        lastModified: object.LastModified,
        size: object.Size,
        url: `https://${BUCKET_NAME}.s3.amazonaws.com/${object.Key}`,
      })) || [];

    res.json({ files });
  } catch (error) {
    console.error("List files error:", error);
    res.status(500).json({ error: "Failed to list files" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
