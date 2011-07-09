var server = require("http").createServer() 
    server.addListener("request", function (req, res) { 
      var postData = "" 
      req.addListener("data", function (chunk) { postData += chunk }) 
      req.addListener("end", function () { 
        // now postData is full. 
        var message = "You posted: "+postData 
        res.writeHead(200, {"content-length":"message", 
"content-type":"text/plain"}) 
        res.end(message) 
    }) 
    server.listen(8000) 
