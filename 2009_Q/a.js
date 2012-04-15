#!/usr/bin/env node

var gcj   = require('codejam');
var input = gcj.getInput();
var cnum  = 0;
var info  = input.shift()

var num_cases = info.pop();
var num_words = info.pop();
var lookup    = {};
while (num_words--) {
    lookup[input.shift()[0]] = true;
}
var words = lookup.getKeys();

while (++cnum <= num_cases) {
    var pattern = input.shift();
    pattern = '^' + pattern + '$';
    pattern = pattern.replace(/\(/g, '[');
    pattern = pattern.replace(/\)/g, ']');
    pattern = new RegExp(pattern);

    var matched = 0;
    words.forEach(function(w) {
        if (null !== pattern.exec(w)) {
            ++matched;
        }
    });

    console.log("Case #{c}: {matched}".supplant({
          'c': cnum
          ,'matched': matched
    }));
}
