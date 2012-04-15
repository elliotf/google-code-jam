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

/*
  g.forEach(function(g) {
    if (g >= p * 3) {
    }
    var scores = [];
    scores[0] = Math.ceil(g/3);
    scores[1] = Math.ceil((g - scores[0]) / 2);
    scores[2] = g - (scores[0] + scores[1]);
    scores = scores.sort().reverse();

    if (scores[0] >= p) {
      ++r;
    } else if (s) {
      var off_by = p - scores[0];
      if (off_by <= 2) {
        scores[2] = scores.last() - off_by;
        scores[0] = scores[0] + off_by;
        var sum = und.reduce(scores, function(memo, num){ return memo + num; }, 0);
        if (scores[2] >= 0 && sum === g) {
          --s;
          ++r;
        }
      }
    }
  });
*/

  console.log("Case #{c}: {r}".supplant({
      'c': cnum
    , 'r': r
  }));
}
