const gulp = require('gulp-v4');
const HubRegistry = require('gulp-hub');
const copy = require('gulp-copy');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.series(gulp.parallel('systemjs'), 'systemjs:html', 'copy-resources'), 'build');

gulp.task('default', gulp.series('build'));

gulp.task('copy-resources', function() {
  return gulp.src([
  './vendor/datatables.css',
  './.tmp/**'])
    .pipe(gulp.dest('./dist'))
    ;
});
