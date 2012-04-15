#!/usr/bin/env node

var gcj   = require('codejam');
var input = gcj.getInput();
var cnum  = 0;

while (++cnum <= gcj.numCases) {
    var c         = parseInt(input.shift());
    var num_items = input.shift();
    var items     = input.shift();
    var look      = items.toHash();

    for (var i = 0, l = items.length; i < l; ++i) {
        var e = items[i];
        delete look[e][i];

        var r = c - e;
        if (!look[r] || !Object.keys(look[r]).length) {
            continue;
        }
        console.log("Case #{c}: {i} {o}".supplant({
              'c': cnum
            , 'i': i + 1
            , 'o': parseInt(Object.keys(look[r])[0]) + 1
        }));
    }
}
