const gulp = require('gulp');
const browserify = require('browserify');
const connect = require('gulp-connect');
const watchify = require('watchify');
const gUtil = require('gulp-util');
const sassify = require('sassify');
const sequence = require('gulp-sequence');
const source = require('vinyl-source-stream');
const watch = require('gulp-watch');
const npmPackage = require('./package.json');

var options = {
    build: {
        html: ['src/**/*.html'],
        images: ['src/**/resources/**/*.**']
    },
    entry: npmPackage.main,
    dest: 'dist',
    debug: true
};

gulp.task('html', () => {
    return watch(options.build.html, () => {
        gUtil.log('Building HTML...');
        gulp.src(options.build.html)
            .pipe(gulp.dest(options.dest))
            .pipe(connect.reload());
    });
});

gulp.task('build', () => {
    var bundle = browserify({
        debug: options.debug,
        entries: options.entry,
        extensions: ['.jsx', '.js'],
        cache: {},
        packageCache: {},
        fullPaths: true,
        plugin: [watchify]
    });

    var rebundle = function () {
        var tmp = bundle.bundle();
        tmp.on('error', function (error) {
            console.log(error.toString());
            this.emit("end");
        });
        gUtil.log('Building ...');
        return tmp.pipe(source('bundle.js'))
            .pipe(gulp.dest(options.dest))
            .pipe(connect.reload());
    };

    bundle.transform("babelify", {presets: ["es2015", "react"]});
    bundle.transform(sassify, {
        'auto-inject': true,
        base64Encode: false,
        sourceMap: true
    });
    bundle.on('update', rebundle);
    return rebundle();
});

gulp.task('build.resources', () => {
    return gulp.src(options.build.images)
        // It's not necessary to read the files (will speed up things), we're only after their paths:
        .pipe(gulp.dest(options.dest));
});

gulp.task('connect', () => {
    connect.server({
        root: './dist',
        port: 8000,
        livereload: true
    });
});

gulp.task('default', sequence(['html', 'build', 'build.resources', 'connect']));