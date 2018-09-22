

var gulp = require('gulp');
var webpack = require('webpack-stream'); //https://www.npmjs.com/package/webpack-stream


gulp.task('webpack', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack({
      // webpack config goes here oe just require('./webpack.config.js')
      entry: {
        app: 'src/app.js'
      },
      output: {
        filename: '[name].js',
      },
    }))
    .pipe(gulp.dest('dist/'));
});
