const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const del = require('del')

gulp.task('scripts', async () => {
  gulp.src('./src/index.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
})

gulp.task('clean', () => del(['dist']))
