import del from 'del'
import gulp from 'gulp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import browserify from 'gulp-browserify'

const paths = {
  src: 'src/**/*.js',
  dest: 'dist/',
  importExamplePrefix: 'examples/import/',
  nodeExamplePrefix: 'examples/node/'
}
      
export const clean = () => del(['dist'])

const minify = (prefix = '') =>
  gulp.src(`${prefix}${paths.src}`)
      .pipe(babel({ presets: ['@babel/env']}))
      .pipe(uglify())

const save = (prefix = '') => gulp.dest(`${prefix}${paths.dest}`)
  
export const scripts = () => 
  minify()
    .pipe(save())

export const importBuild = () => 
  minify(paths.importExamplePrefix)
    .pipe(browserify())
    .pipe(save(paths.importExamplePrefix))

export const nodeBuild = () => 
  minify(paths.nodeExamplePrefix)
    .pipe(save(paths.nodeExamplePrefix))

export default gulp.series(clean, scripts)
