/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var fsPromises = require('fs').promises;
var promisifications = require('./promisification.js');
var promiseConstructors = require('./promiseConstructor.js');

// promisifications = {
//   getGitHubProfileAsync: getGitHubProfileAsync,
//   generateRandomTokenAsync: generateRandomTokenAsync,
//   readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
// };

// module.exports = {
//   getStatusCodeAsync: getStatusCodeAsync,
//   pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
// };

var writeFilePromise = Promise.promisify((filePath, data, callback) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
});


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return promiseConstructors.pluckFirstLineFromFileAsync(readFilePath)
    .then((username)=> {
      return promisifications.getGitHubProfileAsync(username);
    })
    .then((profile) => {
      return writeFilePromise(writeFilePath, JSON.stringify(profile));
    })
    .catch((error) => {
      throw new Error('I am sad');
    });

  // * (2) then, sends a request to the GitHub API for the user's profile
  // * (3) then, writes the JSON response of the API to `writeFilePath`
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
