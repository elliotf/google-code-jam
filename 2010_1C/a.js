#!/usr/bin/env node

var gcj   = require('codejam');
var input = gcj.getInput();
var cnum  = 0;
var num_cases = gcj.numCases;

while (++cnum <= num_cases) {
    var num_w = input.shift();
    var w = [];
    while (num_w--) {
        w.push(input.shift());
    }
    r = 0;

    for (var i = 0, l = w.length; i < l; ++i) {
        for (var j = i; j < l; ++j) {
            if ((w[i][0] < w[j][0]) && (w[i][1] > w[j][1])) {
                // if the left is lower and the right is higher
                ++r;
            } else if ((w[i][0] > w[j][0]) && (w[i][1] < w[j][1])) {
                // if the left is higher and the right is lower
                ++r;
            }
        }
    }

    console.log("Case #{c}: {r}".supplant({
          'c': cnum
          ,'r': r
    }));
}
