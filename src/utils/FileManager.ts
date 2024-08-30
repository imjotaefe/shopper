const fs = require('node:fs/promises');
const path = require('node:path');

interface CreateTempFile {
  base64File: string;
  fileName: string;
}

export class FileManager {
  async createTempFile({
    base64File,
    fileName,
  }: CreateTempFile): Promise<void> {
    try {
      await fs.writeFile(
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

  async cleanTempFolder(): Promise<void> {
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
