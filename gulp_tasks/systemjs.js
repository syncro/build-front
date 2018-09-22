const gulp = require('gulp');
const replace = require('gulp-replace');

const Builder = require('jspm').Builder;

const del = require('del');
const conf = require('../conf/gulp.conf');

gulp.task('systemjs', systemjs);
gulp.task('systemjs:html', updateIndexHtml);

function systemjs(done) {
  const builder = new Builder();
  builder.config({
      meta: {
          'jquery-datatables': { deps: ['jquery'], globals: { '$': 'jquery'}, exports: '$', format: 'global'},
          'jquery-ui-datatables': { deps: ['jquery-datatables'], globals: { '$': 'jquery' }, exports: '$', format: 'global'},
          'jquery-bundle': { deps: ['jquery-ui-datatables'], globals: { '$': 'jquery' }, exports: '$', format: 'global'}
      },
      map: {
        'jquery': 'vendor/jQuery-1.12.4/jquery-1.12.4.js',
        'jquery-datatables': 'vendor/DataTables-1.10.18/js/jquery.dataTables.js',
        'jquery-ui-datatables': 'vendor/DataTables-1.10.18/js/dataTables.jqueryui.js'
      }
  });
  builder
  .buildStatic(
      'src/jquery-static.js',
      conf.path.tmp('jquery-static.js'),
      {
          production: true,
          browser: true,
          exports: '$', // explicitly export jquery
          format: 'global'
      }
    )
      .then(() => {

    done();
  }, done);
}



function updateIndexHtml() {
  return gulp.src('src/index.html')
/**    .pipe(replace(
      /<script src="jspm_packages\/system.js">[\s\S]*System.import.*\r?\n\s*<\/script>/,
      `<script src="index.js"></script>`
    ))
    .pipe(replace(
      /<!-- <script src="(node_modules)(\/([\s\S]*?))*"><\/script> -->/g,
      `<script src="vendor$2"></script>`
    ))**/
    .pipe(gulp.dest(conf.path.tmp()));
}
