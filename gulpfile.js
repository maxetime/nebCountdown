var gulp = require('gulp'),
jshint = require('gulp-jshint'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
watch = require('gulp-watch');

gulp.task('compress', function() {
    gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
    return gulp.src(['src/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['default']);
});

gulp.task('default', function() {
    gulp.start('lint', 'compress');
});
