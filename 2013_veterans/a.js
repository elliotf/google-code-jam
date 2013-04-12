#!/usr/bin/env node

/*
  https://code.google.com/codejam/contest/2334486/dashboard#s=p0

  Run with:
    cat input.file | ./a.js  > output.file
*/

var fs    = require('fs')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
;

var cases = input.shift();

function numify(i) { return parseInt(i, 10);}

while (cnum++ < cases) {
  input.shift();
  var n = input.shift().split(' ').map(numify);

  var r = 0;

  for (var i = 1, l = n.length; i < l - 1; ++i) {
    var a = (n[i - 1] + n[i + 1]) / 2;
    if (a < n[i]) {
      n[i] = a;
    }
  }

  console.log(str.sprintf('Case #%d: %.6f', cnum, n[l - 2]));
}
