const fs = require("fs");
const path = require("path");
const source = "./media"; // Update with source directory
const destination = "./allMedia"; // Update with destination directory

function getFilePathsFunc() {
  const files = [];

  return function getFilePaths(dir) {
    const allFilesInDir = fs.readdirSync(dir);

    allFilesInDir.forEach((file) => {
      const absolutePath = path.join(dir, file);
      const isDir = fs.statSync(absolutePath).isDirectory();

      if (isDir) {
        return getFilePaths(absolutePath);
      } else {
        return files.push({ absolutePath, file });
      }
    });

    return files;
  };
}

function move(files, destination) {
  files.forEach(({ absolutePath, file }) => {
    const imageFileRegex = new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
    if (imageFileRegex.test(file)) {
      fs.rename(`./${absolutePath}`, `${destination}/${file}`, (err) => {
        if (err) throw err;
        console.log("Move complete!");
      });
    }
  });
}

function run() {
  if (!source || !destination) {
    throw Error(
      `Must provide source and destination. Received: source: ${source}, destination: ${destination}`
    );
  }

  if (typeof source !== "string" || typeof destination !== "string") {
    throw Error(
      `Source and destination args must be strings. Received: typeof source: ${typeof source}, typeof destination: ${typeof destination}`
    );
  }

  const getFilePaths = getFilePathsFunc();
  const filePaths = getFilePaths(source);

  move(filePaths, destination);
}

run();
