var express = require ('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var port = 5000;

app.use(express.static('static'));
app.use(bodyParser.urlencoded({
    extended: true
}));
/*
app.get('/', function (req, res) {
	res.sendfile('./static/success.html');
});
*/

app.post('/upload-form-endpoint', function(req, res) {
	var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body['email']);
	var img = req.body['image'];
	var checkbox = req.body['accept-terms'];
	
	var tempPath = req.files.file.path;
    var targetPath = path.resolve('./static/uploads/image.png');
	if (req.method === "POST") {
		if (email && img && checkbox) {
			res.sendfile(path.resolve('./uploads/image.png'));
			res.redirect(302, 'success.html');
			//console.log("Good job!");
			//console.log(req.files.image.name);
		}
		//JAK ZROBIĆ POP-UP !!!
		else if (email === false) {
			res.status(400).send("You have entered an invalid email address!");
		}
		
		else {
			res.redirect(302, 'failure.html');
		}
	}
});

app.listen(port, function(err) {
	console.log("Running server on port " + port);	
});




/*
var server = http.createServer(function (req, res) {

	if (req.method === "POST") {
		res.redirect('success.html');
	}

});
*/
/*
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    }
    else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
*/    