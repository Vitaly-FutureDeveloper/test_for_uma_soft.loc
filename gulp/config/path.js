const pathSrc = "src";
const pathDest = "public";

export default {
	src: pathSrc,
	root: pathDest,
	deploy: pathDest + "/**/*",

	html: {
		src: pathSrc + "/html/*.pug",
		watch: pathSrc + "/html/**/*.pug",
		dest: pathDest,
	},

	styles: {
		src: pathSrc + "/styles/*.{scss,sass,css}",
		watch: pathSrc + "/styles/**/*.{scss,sass,css}",
		dest: pathDest + "/styles",
		stream: pathDest + "/styles/*.css"
	},

	fonts: {
		src: pathSrc + "/styles/fonts/*.{woff,woff2,ttf,otf}",
		dest: pathDest + "/styles/fonts",
	},

	scripts: {
		src: pathSrc + "/scripts/*.js",
		watch: pathSrc + "/scripts/**/*.js",
		dest: pathDest + "/scripts",
		stream: pathDest + "/scripts/*.js"
	},

	img: {
		src: pathSrc + "/assets/img/*.{png,jpg,jpeg,gif,svg,ico}",
		favicon: pathSrc + "/assets/img/favicon.ico",
		watch: pathSrc + "/assets/img/**/*.{png,jpg,jpeg,gif,svg,ico}",
		dest: pathDest + "/assets/img",
	}
}