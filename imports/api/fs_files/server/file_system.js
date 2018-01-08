import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import md5 from 'md5';
import rimraf from 'rimraf';

const fileSystem = {
  rootDirectory: Meteor.settings.private.files.rootDirectory,

  getFiles(currentDirectory) {
    return new Promise((resolve, reject) => {
      const directoryListing = [];
      const cleanDirectory = this.cleanDirectory(currentDirectory);
      const fullDirectory = `${this.rootDirectory}${cleanDirectory}`;
      fs.readdir(fullDirectory, (error, files) => {
        if (error) {
          reject(error);
        } else {
          files.forEach((file) => {
            const stats = fs.statSync(`${fullDirectory}/${file}`);
            directoryListing.push({
              uid: md5(`${cleanDirectory}/${file}`),
              name: file,
              type: (stats.isDirectory() ? 'directory' : 'file'),
              lastModifiedTimestamp: stats.mtime,
              path: `${fullDirectory}/${file}`,
            });
          });
          resolve(directoryListing);
        }
      });
    });
  },

  removeFile(path) {
    if (path) {
      const cleanPath = this.cleanDirectory(path);
      rimraf.sync(cleanPath);
      // fs.unlinkSync(path);
    }
  },

  saveFile(filePath, fileData) {
    if (filePath && fileData) {
      const cleanPath = decodeURIComponent(this.cleanDirectory(filePath));
      const fullPath = `${this.rootDirectory}${cleanPath}`;
      fs.writeFile(fullPath, fileData);
    }
  },

  createDirectory(currentDirectory, directoryName) {
    const cleanCurrentDirectory = this.cleanDirectory(currentDirectory);
    const cleanDirectoryName =
      this.cleanDirectory(directoryName).replace(/\//g, '');
    const fullDirectory =
      `${this.rootDirectory}${cleanCurrentDirectory}/${cleanDirectoryName}`;
    if (!fs.existsSync(fullDirectory)) {
      fs.mkdirSync(fullDirectory);
    }
  },

  cleanDirectory(directory) {
    let cleanDirectory = '';
    if (directory) {
      cleanDirectory = directory.replace(/\.\./g, '');
    }
    return cleanDirectory;
  },
};

export default fileSystem;
