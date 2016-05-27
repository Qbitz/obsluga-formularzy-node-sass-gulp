var express = require ('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var app = express();
var port = 5000;
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, 'image.png');
  }
});

var upload = multer({ storage : storage }).single('image');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/upload-form-endpoint', function(req, res) {
	var email = req.body['email'];
	var img = req.body['image'];
	var checkbox = req.body['accept-terms'];
	
	if (req.method === "POST") {
		upload(req,res,function(err) {
		    if(err) {
		        return console.log("Error uploading file.");
		    }
		    console.log("File is uploaded");
		});

		if (email && img && checkbox) {
			res.redirect(302, 'success.html');
			//console.log("Good job!");
			//console.log(req.files.image.name);
		}
		//JAK ZROBIĆ POP-UP !!!
		
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