import fs from "fs";
import path from "path";

abstract class AbstractStorage {
  abstract save(data: any): Promise<string>;
  abstract load(filePath: string): Promise<any>;
}

class LocalFileStorage extends AbstractStorage {
  constructor(private storagePath: string) {
    super();
  }

  async save(file: { name: string; path: string }): Promise<string> {
    const fileName = path.basename(file.name);
    const newFilePath = path.join(this.storagePath, fileName);

    return new Promise((resolve, reject) => {
      // Move the file from the temporary path to the new path
      fs.rename(file.path, newFilePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(newFilePath);
        }
      });
    });
  }

  async getFileMetadata(filePath: string): Promise<fs.Stats> {
    const fullFilePath = path.join(this.storagePath, filePath);

    return new Promise((resolve, reject) => {
      fs.stat(fullFilePath, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve(stats);
        }
      });
    });
  }

  async load(filePath: string): Promise<Buffer> {
    const fullFilePath = path.join(this.storagePath, filePath);

    return new Promise((resolve, reject) => {
      fs.readFile(fullFilePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

export { AbstractStorage, LocalFileStorage };
