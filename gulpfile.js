'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var sass = require('gulp-ruby-sass');
var source = require('vinyl-source-stream');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var sequence = require('run-sequence');
var rimraf = require('gulp-rimraf');
var watchify = require('watchify');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var rename = require('gulp-rename');

gulp.task('js', function() {
	var b = browserify({
		cache: {},
		packageCache: {},
		fullPaths: false,
		debug: true,
		standalone: 'frontrow'
	});

	b = watchify(b);
	b.on('update', function() {
		bundleShare(b);
	});

	b.add('./src/js/frontrow.js');
	bundleShare(b);

	function bundleShare(b) {
		gutil.log(gutil.colors.blue('Bundling JavaScript...'));
		b.bundle()
			.on('error', function(err) {
				gutil.log(gutil.colors.bold.red('================='));
				gutil.log(gutil.colors.red('JavaScript Error: ' + err.message));
				gutil.log(gutil.colors.bold.red('================='));
			})
			.pipe(source('frontrow.js'))
			.pipe(gulp.dest('./dist'))
		gutil.log(gutil.colors.green('JavaScript Ready!'));
	}
});

gulp.task('jshint', function() {
	gulp.src('./src/js/*.js')
		.pipe(jshint())
	    .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function() {
	return gulp.src('src/sass/frontrow.sass')
		.pipe(sass({sourcemap: false, noCache: true}))
		.pipe(prefix("last 3 versions"))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('./src/js/*.js', ['jshint']);
	gulp.watch('./src/sass/*.sass', ['sass']);
});

gulp.task('uglify', function() {
	return gulp.src('./dist/frontrow.js')
		.pipe( uglify({mangle: false}) )
		.pipe(rename('frontrow.min.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('minify', function() {
	return gulp.src('./dist/frontrow.css')
		.pipe(minifyCSS())
		.pipe(rename('frontrow.min.css'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', function() {
	sequence('uglify', 'minify', function() { gutil.log(gutil.colors.green('Build ready.')); });
});

gulp.task('default', ['sass', 'watch', 'js']);