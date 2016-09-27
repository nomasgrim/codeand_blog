var gulp = require('gulp');
// var sass = require('gulp-sass');

var data = require('gulp-data');
var stylus = require('gulp-stylus');

var pug  = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');
var runsequence = require('gulp-run-sequence');
var clean = require('gulp-clean');

var srcBase = 'src/';
var srcAssetBase = srcBase + 'assets/';
var srcViewBase = srcBase + 'views/';
var distBase = 'htdocs/';
var distAssetBase = distBase + 'assets';


// gulp.task('sass', function () {
//   return gulp.src(srcAssetBase + 'scss/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest(distAssetBase + '/css'))
// });

// include, if you want to work with sourcemaps 
var sourcemaps = require('gulp-sourcemaps');
 
// Get one .styl file and render 
gulp.task('styl', function () {
  return gulp.src(srcAssetBase + 'stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest(distAssetBase + '/css'));
});
 
// Options 
// Options compress 
// gulp.task('compress', function () {
//   return gulp.src('./css/compressed.styl')
//     .pipe(stylus({
//       compress: true
//     }))
//     .pipe(gulp.dest('./css/build'));
// });
 
 
// Set linenos 
gulp.task('linenos', function () {
  return gulp.src(srcAssetBase + 'stylus/*.styl')
    .pipe(stylus({linenos: true}))
    .pipe(gulp.dest(distAssetBase + '/css'));
});
 
// Include css 
// Stylus has an awkward and perplexing 'include css' option 
// gulp.task('include-css', function() {
//   return gulp.src('./css/*.styl')
//     .pipe(stylus({
//       'include css': true
//     }))
//     .pipe(gulp.dest('./'));
 
// });
 
// Inline sourcemaps 
gulp.task('sourcemaps-inline', function () {
  return gulp.src(srcAssetBase + 'stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distAssetBase + '/css'));
});
 
gulp.task('stylus', function(cb){
  runsequence('styl', 'linenos', 'sourcemaps-inline', cb);
});

gulp.task('pug', function () {
  return gulp.src(srcViewBase + '*.pug')
    .pipe(pug())
    .pipe(gulp.dest(distBase));
});

gulp.task('htmlbeautify', function() {
  var options = {indentSize: 2};
  gulp.src(distBase + '*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest(distBase))
});





gulp.task('build', function(cb){
  runsequence('build-clean', ['stylus', 'pug'], 'htmlbeautify', cb);
});

gulp.task('build-clean', function(){
  return gulp.src('build').pipe(clean());
})