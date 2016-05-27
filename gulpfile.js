var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

// Static Server + watching scss/html files
gulp.task('serve', ['nodemon', 'sass'], function() {

    browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["static/**/*.*"],
        PORT: 5000,
	});

    gulp.watch("./*.sass", ['sass']);
    gulp.watch("./static/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./*.sass")
        .pipe(sass())
        .pipe(gulp.dest("./static/css"))
        .pipe(browserSync.stream()); //reload page
});

gulp.task('nodemon', function () {
	return nodemon({
		script: 'server.js'
	});
});

gulp.task('default', ['serve']);


/*

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task ('serve', function() {
	var options = {
		script: 'server.js',
		delayTime :1,
		env: {
			'PORT': 5000
		},
	}
});
*/