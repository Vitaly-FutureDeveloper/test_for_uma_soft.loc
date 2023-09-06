import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";

// Configs
import path from "../config/path.js";


const fonts = (done) => {
	gulp.src(path.fonts.src)
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: "Fonts",
				message: error.message,
			}))
		}))
		.pipe(gulp.dest(path.fonts.dest));
	done();
};

export default fonts;