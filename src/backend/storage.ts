import fs from "fs";
import path from "path";

abstract class AbstractStorage<T> {
  abstract save(data: T): Promise<string>;
  abstract load(filePath: string): Promise<T>;
}

class LocalFileStorage extends AbstractStorage<File> {
  constructor(private path: string) {
    super();
  }

  async save(data: File): Promise<string> {
    const filePath = path.join(this.path, data.name);

    return new Promise((resolve, reject) => {
      fs.rename(data.name, filePath, async (err) => {
        if (err) {
          reject(err);
        }
        resolve(filePath);
      });
    });
  }

  async load(filePath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        }
        const file: File = {
          name: path.basename(filePath),
          size: data.byteLength,
          type: "",
          lastModified: new Date().getTime(),
          webkitRelativePath: "",
          slice: (start?: number, end?: number, contentType?: string) => {
            const blob = new Blob([data.slice(start, end)], {
              type: contentType,
            });
            return blob;
          },
          arrayBuffer: function (): Promise<ArrayBuffer> {
            throw new Error("Function not implemented.");
          },
          stream: function (): ReadableStream<Uint8Array> {
            throw new Error("Function not implemented.");
          },
          text: function (): Promise<string> {
            throw new Error("Function not implemented.");
          },
        };
        resolve(file);
      });
    });
  }
}

export { AbstractStorage, LocalFileStorage };
