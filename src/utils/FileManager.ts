const fs = require('node:fs/promises');
const path = require('node:path');

export class FileManager {
  async createTempFile({
    base64File,
    fileName,
  }: {
    base64File: string;
    fileName: string;
  }) {
    try {
      return await fs.writeFile(
        path.join('temp', `${fileName}.jpeg`),
        base64File,
        'base64',
        function (err) {
          console.log(err);
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  async cleanTempFolder() {
    try {
      const tempFolder = path.join(process.cwd(), 'temp');
      const files = await fs.readdir(tempFolder);
      files.forEach(async (file) => {
        const filePath = path.join(tempFolder, file);
        await fs.unlink(filePath);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
