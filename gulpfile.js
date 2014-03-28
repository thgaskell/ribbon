var gulp = require('gulp'),
    gutil = require('gulp-util');

// Gulp plugins
var jade = require('gulp-jade'),
    less = require('gulp-less'),
    image = require('gulp-image'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');

// Other modules
var path = require('path'),
    express = require('express'),
    app = express();

// Paths
var paths = {
    jade: ['assets/jade/'],
    less: ['assets/css/less/'],
    js: ['assets/js/**/*.js'],
    public: ['dist/public/']
};

gulp.task('express', function() {
    app.use(express.static(path.resolve('./dist')));
    app.listen(3000);
    gutil.log('Listening on port: 3000');
});

gulp.task('templates', function() {
    gulp.src(paths.jade + 'index.jade')
        .pipe(jade()).on('error', gutil.log)
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});


gulp.task('less', function() {
    gulp.src(paths.less + 'style.less')
        .pipe(less({ compress: true })).on('error', gutil.log)
        .pipe(gulp.dest(paths.public + 'css/'))
        .pipe(livereload());
});

gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(gulp.dest(paths.public + 'js/'));
});

gulp.task('image', function () {
  gulp.src('assets/images/*')
    .pipe(image())
    .pipe(gulp.dest(paths.public + 'images/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.less + '**/*.less', ['less']);
    gulp.watch(paths.jade + '**/*.jade', ['templates']);
});

gulp.task('assets', ['templates', 'less']);
gulp.task('crunch', ['image']);
gulp.task('default', ['express']);
gulp.task('dev', ['assets', 'express', 'watch']);
