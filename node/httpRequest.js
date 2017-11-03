const http = require('http');
const https = require('https');

function request(options, callback) {
  var data = '';
  const req = http.request(
    options, function (res) {
      res.setEncoding('utf8');
      res.on(
        'data', function (chunk) {
          data += chunk;
        }
      );
      res.on(
        'end', function () {
          callback(data);
        }
      );
    }
  );

  req.on(
    'error', function (e) {
      callback(e);
    }
  );

  req.end();
}

exports.localHttp = request;
