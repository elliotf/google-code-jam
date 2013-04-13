#!/usr/bin/env node

/*
  https://code.google.com/codejam/contest/2270488/dashboard#s=p2

  Run with:
    cat input.file | ./c.js  > output.file
*/

var fs    = require('fs')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , big   = require('bigint')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
;

var cases = input.shift();

var fair = {};
var squr = {};

while (cnum++ < cases) {
  var l = input.shift().split(' ');
  var min = big(l[0], 10)
    , max = big(l[1], 10)
  ;

  var res = 0;
  for (var i = big(min); i.le(max); i = i.add(1)) {
    var is = i.toString();
    if (is == str.reverse(is)) {
      var r = i.sqrt();
      if (i.eq(r.mul(r))) {
        var rs = r.toString();
        if (rs == str.reverse(rs)) ++res;
      }
    }
  }

  console.log(str.sprintf('Case #%d: %s', cnum, res));
}
