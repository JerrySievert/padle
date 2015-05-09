var gulp = require('gulp');
var jshint = require('gulp-jshint');
var shell = require('gulp-shell');
var jison = require('gulp-jison');

gulp.task('jshint', function ( ) {
  gulp.src([
    'index.js',
    'lib/*.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('test', shell.task([
  './node_modules/istanbul/lib/cli.js cover ./node_modules/tape/bin/tape test/*.js'
]));

gulp.task('jison', function ( ) {
  gulp.src('./src/parser.yy')
      .pipe(jison())
      .pipe(gulp.dest('./lib/'));
});

gulp.task('default', [ 'jison', 'test', 'jshint', 'complexity' ], function ( ) {

});
