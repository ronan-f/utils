## Move Files

Simple function to move files around using node and fs. Given a source directory the function will recurse through each subdirectory and move any files it finds to a given destination.

To use:

1. Update source and destination variables. Source should be the top level directory you want to recurse through. Destination should be an output directory.
2. The `move` function is currently hardcoded to match image files using regex `const imageFileRegex = new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);`
   This could be updated to match any file type needed.
3. From your command line run `node moveFiles.js`
4. That's it
