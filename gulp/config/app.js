const isProd = process.argv.includes("--production");
const isDev = !isProd;

export default {
	isProd: isProd,
	isDev: isDev,

	webpack: {
		mode: isProd ? "production" : "development",
	},

	pug: {
		pretty: isDev
	},

	imagemin: {
		verbose: true,
	},
}