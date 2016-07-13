var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var build = function(callback) {
  return function(error, stats) {
    if(error){ return console.log('Error', error); }
    console.log(stats.toString({colors: true}));
    if(callback){ callback(); }
  };
};

gulp.task('build', function(callback) {
  webpack(config).run(build(callback));
});

gulp.task('watch', function() {
  webpack(config).watch(100, build());
});
