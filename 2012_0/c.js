#!/usr/bin/env node

/*

  http://code.google.com/codejam/contest/1460488/dashboard#s=p2

  develop with (running in the current directory):
    ../node_modules/.bin/chicken -c "clear; cat C-sample.in | ./c.js" .

*/

var fs  = require('fs')
  , _   = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
  , cases = input.shift()
;

while (++cnum <= cases) {
  var line = input.shift().split(' ').map(function(n){return parseInt(n, 10);});
  var a = line.shift();
  var b = line.shift();

  var r = 0;
  var seen = {};

  for (var i = a; i <= b; ++i) {
    var c = i.toString();
    if (seen[c]) continue;
    seen[c] = true;

    var p = 0;
    var l = c.length;

    // brute force, moving end of stringified number to beginning
    // node.js is fast enough: solving the large set takes ~1min
    for (var j = l; j > 1; --j) {
      var n = c.substring(j-1) + c.substring(0,j-1);
      if (n[0] === '0' || n === c || seen[n]) continue;
      seen[n] = true;

      if (n < a || n > b) continue;
      ++p;
      r = r + p;
    }
  }

  console.log(str.sprintf("Case #%d: %s", cnum, r));
}
