var gulp = require("gulp"),
	less = require("gulp-less"),
	minify = require("gulp-minify-css"),
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	_       = require('lodash'),
	phpunit = require("gulp-phpunit");

gulp.task("less", function() {
	return gulp.src("style.less")
		.pipe(less())
		.pipe(rename("style.css"))
		.pipe(gulp.dest("./"))
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("./"));
});

gulp.task("phpunit", function() {
	gulp.src("phpunit.xml")
		.pipe(phpunit("phpunit", {notify: true}))
		.on('error', notify.onError(testNotification('fail', 'phpunit')))
		.pipe(notify(testNotification("pass", "phpunit")));
});

function testNotification(status, pluginName, override) {
    var options = {
        title:   ( status == 'pass' ) ? 'Tests Passed' : 'Tests Failed',
        message: ( status == 'pass' ) ? '\n\nAll tests have passed!\n\n' : '\n\nOne or more tests failed...\n\n',
        icon:    __dirname + '/node_modules/gulp-' + pluginName +'/assets/test-' + status + '.png'
    };
    options = _.merge(options, override);
  return options;
}