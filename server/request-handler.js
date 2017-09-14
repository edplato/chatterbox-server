/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');
var fs = require('fs');
var path = require('path');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

// {"objectId":"DsZyzrEDTN","username":"Joelle","roomname":"lobby","text":" test post","createdAt":"2017-09-04T17:34:28.310Z","updatedAt":"2017-09-04T17:34:28.310Z"}


// array of message objects
var messages = { results: [{ "objectId": "DsZyzrEDTN", "username": "Joelle", "roomname": "lobby", "text": " test post", "createdAt": "2017-09-04T17:34:28.310Z", "updatedAt": "2017-09-04T17:34:28.310Z" }, { "objectId": "DsZyzrEDTN", "username": "Joelle", "roomname": "lobby", "text": " test post", "createdAt": "2017-09-04T17:34:28.310Z", "updatedAt": "2017-09-04T17:34:28.310Z" }] };

exports.requestHandler = function(request, response) {
  console.log('###############################');
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // var httpRequestType = request.headers['access-control-request-method'];
  var path = url.parse(request.url);

  // console.log('path', path); // object holding various values including search and query

  var requestArray = request.url.split('/');
  var data = requestArray[1];

  //console.log(requestArray); // [classes, meesages, orderCreatedAt]

  //console.log('request method', request.method); // get or options
  //console.log('response method', response.method); // undefined


  var headers = defaultCorsHeaders;
  var statusCode = 200;
  headers['Content-Type'] = 'application/json';

  if (request.method === 'GET') {
    // check for GET request - if
    //console.log('----YOU GOT GOT----');
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messages));
    // username=ed&text=wordsinmessage&roomname=lobby

  } else if (request.method === 'POST') {
    // check for POST request - else if
    console.log('----POST MADE----');
    request.on('data', (message) => {



      let bufferRaw = message.toString();
      console.log(bufferRaw);
    }).on('end', () => {

      response.writeHead(statusCode, headers);
      response.end();
    });



  } else if (request.method === 'OPTIONS') {
    //console.log('----OPTIONSSSSSSSSS----');
    response.writeHead(statusCode, headers);
    response.end();
  }

  // else {
  //   // else bad link - 404 status code

  //   response.writeHead(404, headers);
  //   response.end();

  // }


  // response.writeHead(statusCode, headers);
  // response.end(JSON.stringify({ messages }));
};






// Request and Response come from node's http module.
//
// They include information about both the incoming request, such as
// headers and URL, and about the outgoing response, such as its status
// and content.
//
// Documentation for both request and response can be found in the HTTP section at
// http://nodejs.org/documentation/api/

// Do some basic logging.
//
// Adding more logging to your server can be an easy way to get passive
// debugging help, but you should always be careful about leaving stray
// console.logs in your code.
//console.log(request.method);

//console.log('request headers', request.headers);
//console.log('requestttttttttttttt', response);
// The outgoing status.


// See the note below about CORS headers.


// Tell the client we are sending them plain text.
//
// You will need to change this if you are sending something
// other than plain text, like JSON or HTML.


// .writeHead() writes to the request line and headers of the response,
// which includes the status and all headers.
// response.writeHead(statusCode, headers);

// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.





// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.





// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

// * Request-URI apply to server rather than specific resource
