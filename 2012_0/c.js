#!/usr/bin/env node

// http://code.google.com/codejam/contest/1460488/dashboard#s=p2

var gcj   = require('./codejam');
var input = gcj.getInput();
var numc  = gcj.numCases;
var cnum  = 0;

while (++cnum <= numc) {
    var line = input.shift();
    var a = line.shift();
    var b = line.shift();

    var r = 0;
    var seen = {};

    for (var i = a; i <= b; ++i) {
        var c = i.toString();
        if (seen[c]) continue;
        seen[c] = true;

        var h = c + c;
        var p = 0;
        var l = c.length;

        for (var j = l; j > 1; --j) {
            var n = c.substring(j-1) + c.substring(0,j-1);
            if (n[0] === '0' || n === c || seen[n]) continue;
            seen[n] = true;

            if (n < a || n > b) continue;
            if (h.indexOf(n) > 0) {
                ++p;
                r = r + p;
            }
        }
    }

    console.log("Case #{cnum}: {r}".supplant({
          'cnum': cnum
          , 'r': r
    }));
}
