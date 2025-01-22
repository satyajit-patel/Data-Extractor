import express from "express";
import multer from "multer";
import cors from "cors";
import pdfParse from "pdf-parse";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const port = 3001;

app.use(cors());
app.use(express.json());

// data extraction function with flexible regex
const extractData = (text) => {
  const nameMatch = text.match(/Name\s*:\s*([\s\S]+?)(?=\n|$)/i); // Match until newline or end
  const phoneMatch = text.match(/Phone\s*:\s*([\s\S]+?)(?=\n|$)/i);
  const addressMatch = text.match(/Address\s*:\s*([\s\S]+?)(?=\n|$)/i);

  return {
    name: nameMatch ? nameMatch[1].trim() : "Not Found",
    phone: phoneMatch ? phoneMatch[1].trim() : "Not Found",
    address: addressMatch ? addressMatch[1].trim() : "Not Found",
  };
};

app.use('/', (req, res) => {
  res.send("Yeah I'am Bat Man");
});

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ error: "No PDF uploaded" });

    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer);

    // console.log("Extracted Text:\n", pdfData.text);

    const extractedData = extractData(pdfData.text);

    console.log("data extracted");
    return res.status(200).json(extractedData);
  } catch (error) {
    console.error("Error processing PDF:", error);
    return res.status(500).send({ error: "Error processing PDF" });
  }
});

app.listen(port, () => {
  console.log(`Server running at prt: ${port}`);
});
