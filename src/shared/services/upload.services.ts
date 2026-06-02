import fs from "fs";

export class UploadService {
  static ensureUploadDirectories(): void {
    const directories = [
      "uploads/logos",
      "uploads/profile-images",
    ];

    directories.forEach((directory) => {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {
          recursive: true,
        });
      }
    });
  }
}