const fs = require("fs");

module.exports = (filePath, separator) => {
  return fs.readFileSync(filePath, "utf8").split(separator);
};