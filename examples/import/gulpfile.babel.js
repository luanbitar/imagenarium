import gulp from 'gulp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import browserify from 'gulp-browserify'
import del from 'del'

const paths = {
  src: 'src/**/*.js',
  dest: 'dist/'
}
      
export const clean = () => del(['dist'])

export const scripts = () => 
  gulp.src(paths.src)
    .pipe(babel({ presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(browserify())
    .pipe(gulp.dest(paths.dest))

export default gulp.series(clean, scripts)
