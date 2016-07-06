'use strict';

var multer  = require('multer');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validator = require("email-validator");
var mimetype = require('mimetype');
var router = express.Router();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/static/index.html" );
});
app.get('/success', function(req, res){
  res.sendFile( __dirname + "/static/success.html" );
});
app.get('/failure', function(req, res){
  res.sendFile( __dirname + "/static/failure.html" );
});

var storage = multer.diskStorage({
  	destination: function (req, file, cb) {
    	cb(null, __dirname + '/static/uploads');
  	},
  	filename: function (req, file, cb, err) {
    	if (file.mimetype === 'image/png') {
            	cb(null, file.fieldname + ".png");
        }
       	else {
       		var err = new Error("To nie jest plik PNG");
            err.code = 'WRONG_MIME';
            return cb(err);
		}
	}
})
var upload = multer({ storage: storage });
app.use(upload.single('image'));

app.post('/upload-form-endpoint', function(req, res, err){
  	console.log('Email : ' + validator.validate(req.param('email')));
  	console.log('Accept? : ' + req.param('accept-terms'));
  	if (validator.validate(req.param('email')) == false || req.param('accept-terms') == undefined || err.code == 'WRONG_MIME')
  	{
  		res.redirect(302, '/failure');
  	}
  	else 
  	{
  		res.redirect(302, '/success');
  	}
});
app.listen(3000, function(){
  	console.log('Works.');
});

