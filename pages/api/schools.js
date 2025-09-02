import formidable from "formidable";
import fs from "fs";
import path from "path";
import { connectDB } from "../../lib/db";

export const config = {
  api: { bodyParser: false },
};

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

export default async function handler(req, res) {
  const db = await connectDB();

  if (req.method === "POST") {
    try {
      const uploadDir = path.join(process.cwd(), "public", "schoolImages");
      ensureDir(uploadDir);

      const form = formidable({
        multiples: false,
        uploadDir: uploadDir,
        keepExtensions: true,
        filter: (part) => part.mimetype ? part.mimetype.startsWith("image/") : true
      });

      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: "File upload failed" });

        const required = ["name","address","city","state","contact","email_id"];
        for (const k of required) {
          if (!fields[k] || (Array.isArray(fields[k]) && !fields[k][0])) {
            return res.status(400).json({ error: `Missing field: ${k}` });
          }
        }

        const imageFile = files.image;
        if (!imageFile) return res.status(400).json({ error: "Image required" });

        const filename = path.basename(Array.isArray(imageFile) ? imageFile[0].filepath : imageFile.filepath);

        const values = [
          fields.name.toString(),
          fields.address.toString(),
          fields.city.toString(),
          fields.state.toString(),
          Number(fields.contact),
          filename,
          fields.email_id.toString()
        ];

        await db.execute(
          "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          values
        );

        return res.status(200).json({ message: "School added successfully!" });
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Server error" });
    }
    return;
  }

  if (req.method === "GET") {
    try {
      const [rows] = await db.execute("SELECT id, name, address, city, image FROM schools ORDER BY id DESC");
      return res.status(200).json(rows);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "DB error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}