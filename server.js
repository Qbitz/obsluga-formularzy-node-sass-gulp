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

var upload = multer({ storage : storage }) //.single('image');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get ('/', function (req, res) {
	res.render('./staic/index');
})


app.post('/upload-form-endpoint', upload.single('image'), function(req, res) {
	var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body['email']);
	//var email = req.body['email'];
	var img = req.body['image'];
	var checkbox = req.body['accept-terms'];
	
	if (req.method === "POST") {
		/*upload(req,res,function(err) {
		    if(err) {
		        return console.log("Error uploading file.");
		    }
		    console.log("File is uploaded");
		});*/

		if (email && checkbox && typeof img != null) {
			res.redirect(302, 'success.html');
			console.log("Good job, it finally works!");
			//console.log(req.files.image.name);
		}
		//JAK ZROBIĆ POP-UP !!!
		else if (email === false) {
			res.status(400).send("You have entered an invalid email address!");
			console.log("Wrong email");
		}
		else {
			res.redirect(302, 'failure.html');
			console.log("Come on! You can do better!");
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