var StatusLine = function(line) {
	this.line = line;
};

var p = StatusLine.prototype = {};

p.getFile = function() {
	return this.line.substr(3);
};

p.isUntracked = function() {
	var char = this.line[0];
	return Boolean(char === '?');
}

module.exports = StatusLine;