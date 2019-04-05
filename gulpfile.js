const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const del = require('del')

gulp.task('scripts', function () {
  gulp.src('./src/base64.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
})

gulp.task('clean', function() {
  return del(['dist']);
})
