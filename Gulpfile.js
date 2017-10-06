//gulp 

var gulp = require('gulp');


// plugins

var s3 = require("gulp-s3");
var s3Credentials = require('./aws-keys.json');
var rimraf = require('rimraf');



//tasks

gulp.task('clean', function(cb) {
    rimraf('./dist/**/*', cb);
  });

 