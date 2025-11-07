import multer from "multer";
import path from "path";
import fs from "fs";

const imagesDir = path.join(process.cwd(), "images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]/gi, "_");
    cb(null, `${Date.now()}_${safeBase}${ext}`);
  }
});

function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/gif"];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Invalid file format. Only JPEG, PNG, and GIF are allowed."));
  }
  cb(null, true);
}

export const uploadSingleImage = multer({ storage, fileFilter }).single("image");
