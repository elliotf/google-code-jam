#!/usr/bin/env node

// http://code.google.com/codejam/contest/1460488/dashboard#s=p1

// props to shopkins for the assist!

var gcj   = require('./codejam');
var und   = require('underscore');
var input = gcj.getInput();
var cnum  = 0;

while (++cnum <= gcj.numCases) {
  var g = input.shift();
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

  console.log("Case #{c}: {r}".supplant({
      'c': cnum
    , 'r': r
  }));
}
