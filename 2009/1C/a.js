#!/usr/bin/env node

var bi    = require('bigint');
var gcj   = require('codejam');
var input = gcj.getInput('skip_parsing');
var cnum  = 0;
var numc  = gcj.numCases;

var chars = '1023456789abcdefghijklmnopqrstuvwxyz';

while (++cnum <= numc) {
    var str     = input.shift()[0].toString();
    var letters = str.split('');
    var after   = '';
    var seen    = {};
    for (var i = 0, l = letters.length; i < l; ++i) {
        var v = letters[i].toString();
        if (seen[v] === null || seen[v] === undefined) {
            seen[v] = chars[seen.getKeys().length];
        }
        after = after + seen[v];
    }
    var base = gcj.max([2, seen.getKeys().length]);
    
    console.log("Case #{c}: {r}".supplant({
          'c': cnum
        , 'r': bi(after, base).toString()
    }));
}
