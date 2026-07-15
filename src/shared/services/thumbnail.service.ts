import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";
import path from "path";

export class ThumbnailService {
  static async generateImageThumbnail(
    imagePath: string,
  ) {
    const fileName =
      path.basename(imagePath, path.extname(imagePath)) + ".jpg";

    const thumbnailPath = path.join(
      "uploads",
      "portfolio",
      "thumbnails",
      fileName,
    );

    await sharp(imagePath)
      .resize({
        width: 400,
      })
      .jpeg({
        quality: 80,
      })
      .toFile(thumbnailPath);

    return thumbnailPath;
  }

  static generateVideoThumbnail(
    videoPath: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileName =
        path.basename(videoPath, path.extname(videoPath)) + ".jpg";

      const thumbnailPath = path.join(
        "uploads",
        "portfolio",
        "thumbnails",
        fileName,
      );

      ffmpeg(videoPath)
        .screenshots({
          timestamps: ["1"],
          filename: fileName,
          folder: path.join(
            "uploads",
            "portfolio",
            "thumbnails",
          ),
          size: "400x?",
        })
        .on("end", () => resolve(thumbnailPath))
        .on("error", reject);
    });
  }
}