const express = require("express");
const bwipjs = require("bwip-js");
const cors = require("cors");

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// Barcode generation endpoint
app.get("/generate-barcode", (req, res) => {
  const value = req.query.value || "Hello World"; // Default value if none provided

  try {
    // Generate the PDF417 barcode as a PNG buffer
    bwipjs.toBuffer(
      {
        bcid: "pdf417", // Change to PDF417 barcode type
        text: value, // Text to encode
        scale: 3, // Scale factor
        height: 10, // Height of each row in the barcode
        includetext: true, // Include the text below the barcode
        textxalign: "center", // Center-align the text
      },
      (err, png) => {
        if (err) {
          return res.status(500).send("Error generating barcode: " + err.message);
        }
        // Send Base64-encoded barcode
        const base64Image = `data:image/png;base64,${png.toString("base64")}`;
        res.send(base64Image);
      }
    );
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// Start server
app.listen(port, () => {
  console.log(`PDF417 Barcode generator running at http://localhost:${port}`);
});
