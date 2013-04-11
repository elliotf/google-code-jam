#!/usr/bin/env node

/*
  https://code.google.com/codejam/contest/32013/dashboard#s=p0

  Run with:
    cat A-sample.in | ./a.js  > A-sample.out
*/

var fs    = require('fs')
  , gcj   = require('codejam')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
;

var cases = input.shift();
input.pop();

while (input.length) {
  ++cnum;

  var numEngines = input.shift();
  input.splice(0, numEngines);

  var i = input.shift();
  var s = 0;
  var seen = {};
  while (i--) {
    var search = input.shift();
    seen[search] = true;

    if (_.keys(seen).length == numEngines) {
      ++s;
      seen = {};
      seen[search] = true;
    }
  }

  console.log(str.sprintf('Case #%d: %s', cnum, s));
}
