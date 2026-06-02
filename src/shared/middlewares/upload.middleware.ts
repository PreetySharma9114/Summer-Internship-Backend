import multer from "multer";
import path from "path";
import fs from "fs";

const logoPath = "uploads/logos";

const profileImagePath = "uploads/profile-images";

if (!fs.existsSync(logoPath)) {
  fs.mkdirSync(logoPath, { recursive: true });
}

if (!fs.existsSync(profileImagePath)) {
  fs.mkdirSync(profileImagePath, { recursive: true });
}
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "logo") {
      cb(null, "uploads/logos");

      return;
    }

    cb(null, "uploads/profile-images");
  },

  filename(req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
