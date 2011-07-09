var map = array();

var server = http.createServer(function(req, res) {
	req.setEncoding("utf8");
	req.content = '';
	
 	paths[req.url.pathname].apply(this, [req, res]);
}).listen(80);

'/publish': function(req, res){
	req.addListener("data", function(chunk) {
		req.content += chunk;
	});
			 
	req.addListener("end", function() {
	//parse req.content and do stuff with it
	});
}
