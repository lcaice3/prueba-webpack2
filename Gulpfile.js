//gulp 

var gulp = require('gulp');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');

// plugins

var s3 = require("gulp-s3");
var s3Credentials = require('./aws-keys.json');



//tasks


 /* gulp.task('connectDist', function () {
    connect.server({
      root: 'dist/',
      port: 9000
    });
  });*/
 
  

  gulp.task('deploy', function() {
    gulp.src('./dist/**').pipe(s3(s3Credentials));
  });
  // default task
//gulp.task('default', ['connectDist']);