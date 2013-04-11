var util = require('underscore');
var fs   = require('fs');

module.exports = util;

module.exports.getInput = function getInput(skip_parsing) {
    var do_parse = !skip_parsing
    var input = fs.readFileSync('/dev/stdin').toString().split(/\n/g);
    var output = [];
    input.forEach(function(line) {
        var line_items = [];
        line.split(/\s/g).forEach(function(e,i) {
            if (do_parse && e.match(/^\d+$/)) {
                line_items.push(parseInt(e));
            } else {
                line_items.push(e);
            }
        });
        output.push(line_items);
    });
    if (output[0].length === 1) {
        module.exports.numCases = parseInt(output.shift(), 10);
    } else {
        module.exports.numCases = null;
    }
    return output;
};

// monkey patching
Array.prototype.toHash = function arrayToHash() {
    var output = {};
    this.forEach(function(v,i) {
        output[v] = output[v] || {};
        output[v][i] = true;
    });
    return output;
};

Array.prototype.last = function() {
    return this[this.length - 1];
};

Array.prototype.firstTruthy = function() {
    for (var i = 0, l = this.length; i < l; ++i) {
        if (this[i] !== null && this[i] !== undefined) return i;
    }
};

Array.prototype.lastTruthy = function() {
    for (var i = this.length - 1; i > -1; --i) {
        if (this[i] !== null && this[i] !== undefined) return i;
    }
};

Object.prototype.getKeys = function() {
    return Object.keys(this);
};

String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

String.prototype.repeat = function(i) {
    return new Array( i + 1 ).join(this);
};

String.prototype.last = Array.prototype.last;
