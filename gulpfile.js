'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var browserify  = require('gulp-browserify');
var uglify  	= require('gulp-uglify');
var reload      = browserSync.reload;
var nodemon 	= require('gulp-nodemon');
var notify 		= require("gulp-notify");

gulp.task('serve', ['nodemon','sass'], function() {

    browserSync.init(null, {
		proxy: "http://localhost:3000",
    	port: 4000,
        files: ["./static/**/*.**"]
	});    

	gulp.watch("./*.js", ['js-watch']);
    gulp.watch( "./*.sass", ['sass']);
    gulp.watch("./static/*.html").on('change', reload);
});

gulp.task('nodemon', function () {
	return nodemon({
		script: 'server.js'
	});
});

gulp.task('js', function () {
    return gulp.src(__dirname + '*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('js-watch', ['js'], reload);

gulp.task('sass', function() {
  return gulp.src('./*.sass') 
    .pipe(sass())
    .pipe(gulp.dest( __dirname + '/static/css'))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Sass task complete' }));
});

gulp.task('default',['serve']);


