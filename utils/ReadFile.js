var fs = require('fs');

// Function to read files as required with a file name parameter
const readFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function (err, data) {
            if (err) { 
                reject (err);
                return;
            }
            if (data) {
                resolve(JSON.parse(data))
            }
           
        })

    })
    
}
module.exports = { readFile };