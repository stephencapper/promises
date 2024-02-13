/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    var answer = '';
    if (err) {
      callback(err);
    } else {
      for (var letter of data) {
        if (letter === '\n') {
          callback(null, answer);
          break;
        } else {
          answer += letter;
        }
      }
    }
  });
};

//FROM NEEDLE DOCUMENTATION
// var needle = require('needle');

// needle.get('http://www.google.com', function(error, response) {
//   if (!error && response.statusCode == 200)
//     console.log(response.body);
// });

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request.get(url, (err, res)=>{
    if (err) {
      callback(err);
    } else {
      callback(null, res.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
