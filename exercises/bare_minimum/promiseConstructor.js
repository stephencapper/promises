/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`

// Create a promise with the new Promise constructor
// Do something async, then...
// Pass the successful value into the resolve function
// this value will be made available in the next then block
// only one value can ever be passed into resolve()
// Pass any errors into the reject function
// this error will be made available in the catch block
// return the promise instance. This should be a synchronous step


var pluckFirstLineFromFileAsync = function(filePath) {
  // TODO
  var pluckFirst = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      var answer = '';
      if (err) {
        reject(err);
      } else {
        for (var letter of data) {
          if (letter === '\n') {
            resolve(answer);
          } else {
            answer += letter;
          }
        }
      }
    });
  });
  return pluckFirst;
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  var getStatus = new Promise((resolve, reject) => {
    request.get(url, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.statusCode);
      }
    });
  });
  return getStatus;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
