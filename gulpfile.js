const gulp = require('gulp')
const oss = require('gulp-alioss-upload')
const appConfig = require('./config/config')

const ossOptions = {
  ...appConfig.oss[process.env.BUILD_ENV],
  path: appConfig.oss.path,
  prefix: appConfig.oss.prefix,
  formats: appConfig.oss.formats,
}

const watchFiles = [
  './dist/**/*.js',
  './dist/**/*.json',
  './dist/**/*.wxss',
  './dist/**/*.wxml',
]

function uploadOss() {
  return gulp
    .src(watchFiles, {
      since: gulp.lastRun(uploadOss),
    })
    .pipe(oss(ossOptions))
    .pipe(gulp.dest('./dist/'))
}

gulp.task('upload:oss', uploadOss)
gulp.task('watch', function() {
  return gulp.watch(
    watchFiles,
    { delay: 1000, ignoreInitial: false },
    uploadOss,
  )
})
