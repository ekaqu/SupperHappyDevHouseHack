var http = require('http');
http.createServer(function (request, response) {
  console.log('new connection');
  response.write('Welcome');
  request.on('data', function(chunk) {
    console.log(chunk);
    response.write(chunk);
    response.end();
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
