const fs = require('fs');

// Function to write files as required with file name and content parameters
const writeFile = (fileName, fileContent) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${fileName}`, fileContent, err => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve({
          ok: true,
          message: `${fileName} was created and saved to this folder.`
        });
      });
    });
  };

  module.exports = { writeFile };