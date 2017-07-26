var lodash = require('lodash');
require('shelljs/global');
var StatusLine = require('./status-line.js');

function myexec(cmd) {
	return exec(cmd, {silent: true});
}

var Git = function(arg) {
	if (arg === 'status') {
		this.commit = 'status';
	} else {
		var commits = lodash.split(arg, '..', 2);
		if (commits.length === 1) {
			this.commit = commits[0];
		} else if (commits.length === 2) {
			this.commit = {from: commits[0], to: commits[1]};
		}
	}
};

var p = Git.prototype = {};

p.getFiles = function() {
	if (this.commit === 'status') {
		return this.getFilesFromStatus();
	} else if (typeof this.commit === 'string') {
		return this.getFilesFromCommit();
	} else if (typeof this.commit === 'object' && this.commit !== null) {
		return this.getFilesFromDiff();
	}
};

p.getFilesFromStatus = function() {
	var out = myexec('git --no-pager status --porcelain -uno').stdout;
	var files = lodash.split(out, "\n");
	var res = [];
	for (var i = 0; i < files.length; i++) {
		var file = new StatusLine(files[i]);
		res.push(file.getFile());
	}
	return lodash.compact(res);
};

p.getFilesFromCommit = function() {
	var commit = this.commit;
	return this.parseDiffFiles(commit + "^", commit);
};

p.getFilesFromDiff = function() {
	return this.parseDiffFiles(this.commit.from, this.commit.to);
};

p.parseDiffFiles = function(from, to) {
	var out = myexec(`git --no-pager diff --name-only --stat ${from}..${to}`).stdout;
	return lodash.compact( lodash.split(out, "\n") );
};

module.exports = Git;