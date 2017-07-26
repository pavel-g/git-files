module.exports = {
	entry: './cmd.js',
	target: 'node',
	output: {
		filename: './bin/git-files.js'
	},
	module: {
		loaders: [{
			test: /\.json$/,
			loader: 'json-loader'
		}]
	}
};
