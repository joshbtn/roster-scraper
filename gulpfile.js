var gulp = require('gulp');
var jasmine = require('gulp-mocha');
 
gulp.task('default', function () {
    return gulp.src(['lib/Scrape.js','spec/ScrapeSpec.js'])
        .pipe(mocha({
            reporter: new reporters.JUnitXmlReporter()
        }));
})