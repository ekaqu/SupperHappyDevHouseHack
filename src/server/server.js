var http = require('http');
http.createServer(function (request, response) {
  request.on('data', function(chunk) {
    response.write(chunk);
    response.end(); // only for testing
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
