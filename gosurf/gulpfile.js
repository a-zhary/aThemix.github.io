var syntax = 'scss', // Syntax: sass or scss;
	gulpVersion = '4'; // Gulp version: 3 or 4
gmWatch = false; // ON/OFF GraphicsMagick watching "img/_src" folder (true/false). Linux install gm: sudo apt update; sudo apt install graphicsmagick

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	rsync = require('gulp-rsync'),
	imageResize = require('gulp-image-resize'),
	imagemin = require('gulp-imagemin'),
	del = require('del');

// Local Server
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// Sass|Scss Styles
gulp.task('styles', function () {
	return gulp.src('assets/' + syntax + '/**/*.' + syntax + '')
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
		.pipe(gulp.dest('assets/css'))
		.pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function () {
	return gulp.src([
		'assets/libs/jquery/dist/jquery.min.js',
		'assets/js/common.js', // Always at the end
	])
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify()) // Mifify js (opt.)
		.pipe(gulp.dest('assets/js'))
		.pipe(browserSync.reload({ stream: true }))
});

// HTML Live Reload
gulp.task('code', function () {
	return gulp.src('./*.html')
		.pipe(browserSync.reload({ stream: true }))
});

// Deploy
gulp.task('rsync', function () {
	return gulp.src('./**')
		.pipe(rsync({
			root: './',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			// include: ['*.htaccess'], // Includes files to deploy
			exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
});

// Images @x1 & @x2 + Compression | Required graphicsmagick (sudo apt update; sudo apt install graphicsmagick)
gulp.task('img1x', function () {
	return gulp.src('ssets/img/_src/**/*.*')
		.pipe(imageResize({ width: '50%' }))
		.pipe(imagemin())
		.pipe(gulp.dest('ssets/img/@1x/'))
});
gulp.task('img2x', function () {
	return gulp.src('ssets/img/_src/**/*.*')
		.pipe(imageResize({ width: '100%' }))
		.pipe(imagemin())
		.pipe(gulp.dest('ssets/img/@2x/'))
});

// Clean @*x IMG's
gulp.task('cleanimg', function () {
	return del(['assets/img/@*'], { force: true })
});

// If Gulp Version 4
if (gulpVersion == 4) {

	// Img Processing Task for Gulp 4
	gulp.task('img', gulp.parallel('img1x', 'img2x'));

	gulp.task('watch', function () {
		gulp.watch('assets/' + syntax + '/**/*.' + syntax + '', gulp.parallel('styles'));
		gulp.watch(['libs/**/*.js', 'assets/js/common.js'], gulp.parallel('scripts'));
		gulp.watch('./*.html', gulp.parallel('code'));
		gmWatch && gulp.watch('assets/img/_src/**/*', gulp.parallel('img')); // GraphicsMagick watching image sources if allowed.
	});
	gmWatch ? gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch'))
		: gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));

};
