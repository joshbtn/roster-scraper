var gulp = require('gulp');
var reporters = require('jasmine-reporters');
 
gulp.task('default', function () {
    return gulp.src('spec/scraperSpec.js')
        .pipe(jasmine({
            reporter: new reporters.JUnitXmlReporter()
        }));
})