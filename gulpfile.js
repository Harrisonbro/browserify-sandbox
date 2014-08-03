var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    prettyHrtime = require('pretty-hrtime'),
    notify = require('gulp-notify'),
    startTime;

var handleErrors = function () {

    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

var bundleLogger = {
    start: function() {
        startTime = process.hrtime();
        gutil.log('Running', gutil.colors.green("'bundle'") + '...');
    },

    end: function() {
        var taskTime = process.hrtime(startTime);
        var prettyTime = prettyHrtime(taskTime);
        gutil.log('Finished', gutil.colors.green("'bundle'"), 'in', gutil.colors.magenta(prettyTime));
    }
};

gulp.task('browserify', function () {

    var bundler = browserify({
        // Specify the entry point of your app
        entries: ['./js/src/app.js'],
        // Enable source maps!
        debug: true
    });

    var bundle = function() {
        // Log when bundling starts
        bundleLogger.start();

        return bundler
            .bundle()
            // Report compile errors
            .on('error', handleErrors)
            // Use vinyl-source-stream to make the
            // stream gulp compatible. Specifiy the
            // desired output filename here.
            .pipe(source('app.js'))
            // Specify the output destination
            .pipe(gulp.dest('./js/build/'))
            // Log when bundling completes!
            .on('end', bundleLogger.end);
    };

    return bundle();
});