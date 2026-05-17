import express from "express";
import path from "path";
import multer from "multer";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import pdfParse from "pdf-parse";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// @ts-ignore
const pdf = pdfParse;

interface MulterRequest extends express.Request {
  file?: any;
  files?: any;
}

const app = express();
const PORT = 3000;
const upload = multer({ storage: multer.memoryStorage() });

// MySQL Configuration (User needs to set these up in Secrets)
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// API Routes
app.post("/api/merge", upload.array("files"), async (req: MulterRequest, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length < 2) throw new Error("At least 2 files needed");

    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
      const pdf = await PDFDocument.load(file.buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    res.contentType("application/pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/split", upload.single("file"), async (req: MulterRequest, res) => {
  try {
    const file = req.file;
    if (!file) throw new Error("No file uploaded");

    const pdf = await PDFDocument.load(file.buffer);
    const totalPages = pdf.getPageCount();
    
    // For simplicity, we'll return a ZIP or multiple files? 
    // Let's just return the first page as a demo or a simple split.
    // In a real app, you'd handle ranges.
    const newPdf = await PDFDocument.create();
    const [firstPage] = await newPdf.copyPages(pdf, [0]);
    newPdf.addPage(firstPage);

    const pdfBytes = await newPdf.save();
    res.contentType("application/pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ai-summarize", upload.single("file"), async (req: MulterRequest, res) => {
  try {
    const file = req.file;
    if (!file) throw new Error("No file uploaded");

    const data = await pdf(file.buffer);
    const text = data.text;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following PDF content clearly and concisely:\n\n${text.substring(0, 30000)}`,
    });

    res.json({ summary: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ai-translate", upload.single("file"), async (req: MulterRequest, res) => {
  try {
    const { targetLanguage } = req.body;
    const file = req.file;
    if (!file) throw new Error("No file uploaded");

    const data = await pdf(file.buffer);
    const text = data.text;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Translate the following text to ${targetLanguage}. Maintain the tone and context:\n\n${text.substring(0, 30000)}`,
    });

    res.json({ translation: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Vite middleware for development
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
