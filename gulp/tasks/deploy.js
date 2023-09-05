import gulp from "gulp";
import ghPages from "gulp-gh-pages";

// Configs
import path from "../config/path.js";

const deploy = () => {
	return gulp.src(path.deploy)
		.pipe(ghPages())
};

export default deploy;