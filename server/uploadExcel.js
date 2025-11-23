import express from "express";
import multer from "multer";
import XLSX from "xlsx";

const router = express.Router();

// Use multer to handle file uploads (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Allowed fields
const allowedFields = [
  "Student/ Member Full Name",
  "Date Of birth",
  "Age",
  "Gender",
  "Nationality",
  "Parent Name",
  "Contact Number",
  "WhatApp Number",
  "Email",
];

// ✅ Helper function: Convert Excel serial date → "dd-mm-yyyy"
function excelDateToJSDate(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const day = String(date_info.getDate()).padStart(2, "0");
  const month = String(date_info.getMonth() + 1).padStart(2, "0");
  const year = date_info.getFullYear();

  return `${day}-${month}-${year}`;
}

router.post("/upload-excel", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read the Excel file from buffer
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    let allData = XLSX.utils.sheet_to_json(worksheet);

    // 🧹 Filter only the required fields
    let filteredData = allData.map((row) => {
      const filtered = {};
      allowedFields.forEach((key) => {
        let value = row[key] || "";

        // ✅ Convert Excel numeric date values
        if (
          key.toLowerCase().includes("date") && // detect date columns
          typeof value === "number" &&
          value > 40000 &&
          value < 60000
        ) {
          value = excelDateToJSDate(value);
        }

        filtered[key] = value;
      });
      return filtered;
    });

    res.json({
      message: "Excel processed successfully",
      totalRecords: filteredData.length,
      data: filteredData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reading Excel file" });
  }
});

export default router;
