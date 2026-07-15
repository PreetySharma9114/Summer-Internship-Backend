import fs from "fs";
import path from "path";
import sharp from "sharp";
import { exec } from "child_process";

export class UploadService {
  static ensureUploadDirectories() {
    const directories = [
      "uploads",
      "uploads/logos",
      "uploads/profile-images",
      "uploads/portfolio",
      "uploads/portfolio/original",
      "uploads/portfolio/thumbnails",
    ];

    directories.forEach((directory) => {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {
          recursive: true,
        });
      }
    });
  }

  static getFileUrl(filePath: string) {
    return "/" + filePath.replace(/\\/g, "/");
  }

  static async uploadFile(file: Express.Multer.File) {
    return {
      url: this.getFileUrl(file.path),
      filename: file.filename,
    };
  }

  static async uploadPortfolio(file: Express.Multer.File) {
    const mediaUrl = this.getFileUrl(file.path);

    const thumbnailName =
      path.parse(file.filename).name + ".jpg";

    const thumbnailPath = path.join(
      process.cwd(),
      "uploads",
      "portfolio",
      "thumbnails",
      thumbnailName,
    );

    if (file.mimetype.startsWith("image/")) {
      await sharp(file.path)
        .resize(400, 400)
        .jpeg({
          quality: 80,
        })
        .toFile(thumbnailPath);
    } else {
      await new Promise<void>((resolve, reject) => {
        exec(
          `ffmpeg -i "${file.path}" -ss 00:00:01 -vframes 1 "${thumbnailPath}"`,
          (error) => {
            if (error) {
              reject(error);
              return;
            }

            resolve();
          },
        );
      });
    }

    return {
      mediaUrl,
      thumbnailUrl: this.getFileUrl(
        `uploads/portfolio/thumbnails/${thumbnailName}`,
      ),
    };
  }
}