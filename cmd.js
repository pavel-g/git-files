var args = require('minimist')(process.argv.slice(2));
var Git = require('./lib.js');
var lodash = require('lodash');

var help = [
	'git-files status',
	'git-files <commit>',
	'git-files <from>..<to>',
	'',
	'Optional arguments:',
	'  --format=[json|oneline] - json output'
].join("\n");

if (args.help) {
	console.log(help);
	process.exit();
} else {
	var files = args['_'][0];
	var git = new Git(files);
	var files = git.getFiles();
	if (args.format === 'json') {
		console.log(JSON.stringify(files));
	} else if (args.format === 'oneline') {
		if (files.length > 0) {
			console.log('"' + files.join('" "') + '"');
		}
	} else {
		console.log(files.join("\n"));
	}
}