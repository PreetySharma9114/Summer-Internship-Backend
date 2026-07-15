import sharp from "sharp";

import { exec } from "child_process";

import path from "path";

export class ThumbnailUtil {
  static async generateImageThumbnail(
    input: string,
    output: string,
  ) {
    await sharp(input)
      .resize(400, 400)
      .jpeg({
        quality: 80,
      })
      .toFile(output);

    return output;
  }

  static async generateVideoThumbnail(
    input: string,
    output: string,
  ) {
    return new Promise<string>((resolve, reject) => {
      exec(
        `ffmpeg -i "${input}" -ss 00:00:01 -vframes 1 "${output}"`,
        (error) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(output);
        },
      );
    });
  }
}