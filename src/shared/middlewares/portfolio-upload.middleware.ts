import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype.startsWith("video")) {
      cb(null, "uploads/portfolio/videos");
      return;
    }

    cb(null, "uploads/portfolio/images");
  },

  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname,
      )}`,
    );
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  cb,
) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype.startsWith("video")
  ) {
    cb(null, true);
    return;
  }

  cb(new Error("Only images and videos are allowed"));
};

export const portfolioUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});