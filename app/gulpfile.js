var gulp = require('gulp');

var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');

var pug  = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');
var clean = require('gulp-clean');

var srcBase = 'src/';
var srcAssetBase = srcBase + 'assets/';
var srcViewBase = srcBase + 'views/';
var distBase = 'htdocs/';
var distAssetBase = distBase + 'assets';


gulp.task('stylus', ['build-clean'], function (cb) {
  return gulp.src(srcAssetBase + 'stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest(distAssetBase + '/css'));
});

gulp.task('linenos', ['stylus'], function (cb) {
  return gulp.src(srcAssetBase + 'stylus/*.styl')
    .pipe(stylus({linenos: true}))
    .pipe(gulp.dest(distAssetBase + '/css'));
});
 
gulp.task('sourcemaps-inline', ['linenos'], function () {
  return gulp.src(srcAssetBase + 'stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distAssetBase + '/css'));
});
 
gulp.task('build-stylus', ['stylus', 'linenos', 'sourcemaps-inline']);

gulp.task('pug', function (cb) {
  return gulp.src(srcViewBase + '*.pug')
    .pipe(pug())
    .pipe(gulp.dest(distBase));
});

gulp.task('htmlbeautify', ['pug'], function() {
  var options = {indentSize: 2};
  gulp.src(distBase + '*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest(distBase))
});

gulp.task('build', ['build-clean', 'build-stylus', 'pug', 'htmlbeautify']);

gulp.task('build-clean', function(cb){
  return gulp.src('build').pipe(clean());
})