//gulp 

var gulp = require('gulp');
var runSequence = require('run-sequence');

// plugins

var s3 = require("gulp-s3");
var s3Credentials = require('./aws-keys.json');
var rimraf = require('rimraf');



//tasks

gulp.task('clean', function(cb) {
    rimraf('./dist/**/*', cb);
  });

  gulp.task('connectDist', function () {
    connect.server({
      root: 'dist/',
      port: 9000
    });
  });
  gulp.task('watch',function(){
    gulp.watch('./app/**/*', ['clean']);
  });
  
  gulp.task('serve', function() {
    runSequence(['watch', 'connectDist']);
  });
  gulp.task('deploy', function() {
    gulp.src('./dist/**').pipe(s3(s3Credentials));
  });
  // default task
gulp.task('default', ['serve']);