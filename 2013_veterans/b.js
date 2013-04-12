#!/usr/bin/env node

/*
  https://code.google.com/codejam/contest/2334486/dashboard#s=p1

  Run with:
    cat input.file | ./b.js  > output.file
*/

var fs    = require('fs')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
;

var cases = input.shift();

function toInches(s) {
  s = s.split("'");
  var f = parseInt(s[0], 10);
  var i = parseInt(s[1], 10);

  return i + (f * 12);
}

function toFeetInches(i) {
  var f = parseInt(i / 12, 10);
  i = i % 12;

  return str.sprintf('%d\'%d"', f, i);
}

while (cnum++ < cases) {
  var v = input.shift().split(' ');
  var sex = v.shift()
    , mom = toInches(v.shift())
    , dad = toInches(v.shift())
  ;

  var h = (mom + dad + ((sex == 'B') ? 5 : -5)) / 2;
  var lower = toFeetInches(Math.ceil(h - 4));
  var upper = toFeetInches(Math.floor(h + 4));

  console.log(str.sprintf('Case #%d: %s to %s', cnum, lower, upper));
}
