var concat, css2js, cssmin, gulp, uglify, sass, reactNativeStylesheetCss;
 
concat = require("gulp-concat");
css2js = require("gulp-css2js");
cssmin = require("gulp-cssmin");
gulp = require("gulp");
sass = require("gulp-sass"),
reactNativeStylesheetCss = require('gulp-react-native-stylesheet-css');
 
// Load your CSS and LESS files
gulp.task("sass-to-jss", function() {
    return gulp.src([
            "./app/style/index.scss"
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("styles.css"))
        .pipe(cssmin())
        .pipe(reactNativeStylesheetCss())
        .pipe(gulp.dest("./build/"));
});

gulp.task("watch", gulp.series('sass-to-jss', function() {
    gulp.watch(['app/style/**/*.scss', 'app/components/**/*.scss'], gulp.series('sass-to-jss'));
}));