import multer from "multer";
import path from "path";

import { UploadService } from "../../modules/upload/upload.service.js";
UploadService.ensureUploadDirectories();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "logo") {
      cb(null, "uploads/logos");
      return;
    }

    if (file.fieldname === "portfolio") {
      cb(null, "uploads/portfolio/original");
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

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Only image and video files are allowed"));
    return;
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});