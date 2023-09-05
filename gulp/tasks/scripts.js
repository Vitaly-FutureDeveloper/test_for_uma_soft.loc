import gulp from "gulp";
import plumber from "gulp-plumber";
import webpack from "webpack-stream";
import notify from "gulp-notify";
import babel from "gulp-babel";
import size from "gulp-size";


// Configs
import path from "../config/path.js";
import app from "../config/app.js";

const scripts = () => {
	return gulp.src(path.scripts.src, { sourcemaps: app.isDev })
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: "JS",
				message: error.message,
			}))
		}))

		.pipe(size({title: "main.js"}))
		.pipe(babel())

		.pipe(size({title: "main.js - babel"}))
		.pipe(webpack(app.webpack))

		.pipe(size({title: "main.js - babel-webpack"}))
		.pipe(gulp.dest(path.scripts.dest, { sourcemaps: app.isDev }))
};

export default scripts;