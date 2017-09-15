var url = require('url');
var path = require('path');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'content-type': 'application/json'
};

var messages = { results: [{"objectId":"DsZyzrEDTN","username":"Bob","roomname":"lobby","text":" test post","createdAt":"2017-09-04T17:34:28.310Z","updatedAt":"2017-09-04T17:34:28.310Z"}] };

exports.requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var path = url.parse(request.url);
  var headers = defaultCorsHeaders;
  var statusCode = 200;

  if (path.pathname !== '/classes/messages') {
    response.writeHead(404, headers);
    response.end();
  } else if (request.method === 'GET') {
    response.writeHead(200, headers);
    response.end(JSON.stringify(messages));
  } else if (request.method === 'POST') {
    var data = '';
    request.on('data', (message) => {
      data += message;
    });
    request.on('end', () => {
      let bufferToJSON = JSON.parse(data);

      let now = new Date();

      bufferToJSON.objectId = messages.results.length;
      bufferToJSON.createdAt = now.toISOString();
      bufferToJSON.updatedAt = now.toISOString();

      messages.results.push(bufferToJSON);
      response.writeHead(201, headers);
      response.end(JSON.stringify(data));
    });

  } else if (request.method === 'OPTIONS') {
    response.writeHead(statusCode, headers);
    response.end();
  }
};