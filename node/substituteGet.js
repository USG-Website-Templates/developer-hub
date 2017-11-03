const path = require('path');
const url = require('url');
const localHttp = require('./httpRequest.js').localHttp;
const fs = require('fs');

const receiveRequest = function (_url, cb) {
  const url = path.join('../', _url);
  fs.readFile(
    url, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      cb(data);
    }
  );

};

exports.localHttp = receiveRequest;
