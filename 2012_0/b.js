#!/usr/bin/env node

/*

  http://code.google.com/codejam/contest/1460488/dashboard#s=p1

  develop with (running in the current directory):
    ../node_modules/.bin/chicken -c "clear; cat B-sample.in | ./b.js" .

*/

// props to shopkins for the assist!

var fs    = require('fs')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
  , cases = input.shift()
;

while (++cnum <= cases) {
  var g = input.shift().split(/\s+/).map(function(n){return parseInt(n, 10);});
  var n = g.shift();
  var s = g.shift();
  var p = g.shift();
  var r = 0;

  function check(delta,score) {
      var lowest = (p - delta > 0) ? p - delta : 0;
      return score >= (p + (lowest * 2));
  }

  g.forEach(function(g) {
      if (check(1, g)) {
        ++r;
      } else if (s && check(2, g)) {
        --s;
        ++r;
      }
  });

  console.log(str.sprintf("Case #%d: %s", cnum, r));
}
