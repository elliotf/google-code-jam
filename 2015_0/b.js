#!/usr/bin/env node

'use strict';

var fs        = require('fs')
  , _         = require('lodash')
  , str       = require('underscore.string')
  , input     = fs.readFileSync('/dev/stdin').toString().split(/\n/)
  , num_cases = input.shift()
  , cnum      = 0
  , result
;

input.pop(); // get rid of empty string after last newline

function numSort(arr) {
  return arr.sort(function(a,b) {
    return a - b;
  });
}

while (input.length) {
  cnum++;
  (function() {
    input.shift(); // number of people, ignored
    var p = input.shift().split(' ').map(Number);
    var times = [];
    var time  = 0;

    var max = 0;
    var t   = 0;
    numSort(p);
    times.push(time + p[p.length -1]);
    while(true) {
      time++;

      max = p[p.length - 1];
      t   = max / 2;
      p.pop();
      p.push(Math.ceil(t));
      p.push(Math.floor(t));
      numSort(p);
      times.push(time + p[p.length -1]);

      //console.log("p", p.length);
      //console.log("p[0], p[p.length -1]", p[0], p[p.length -1]);

      if (p[0] === p[p.length - 1] || p[p.length -1] < 2) {
        break;
      }
    }

    //console.error("times", times);
    numSort(times);
    result = times[0];

    console.log(str.sprintf('Case #%d: %s', cnum, result));
  })();
}

/*

Okay, so we can't pay attention to only the max, because we can only move from one plate at a time

Something about the delta between max and median/ceil(mean)?
stop when ceil(mean) == max?
relationship between the number at max and max's value?
mark and sweep?

16 16
8 8 16  (1 + 16)
8 8 8 8 (2 + 8, or 2 + 4 + 4)


16 17
8 8 17
8 8 8 9
8 8 8 5 4 (+ 8 min to finish pancakes, or three to split down to five and five to finish)

16 15
8 8 15
8 8 8 7 (+8)

9 9
4 5 9
4 4 5 5 (+5)

9 1
5 4 1
3 2 4 1 (+4 to finish)

16 4
8 8 4 (1+8)
4 4 8 4 (2+8)
4 4 4 4 4 (3+4)

16 5
8 8 5 (1+8)
4 4 8 5 (2+8)
4 4 4 4 5 (3+5)
4 4 4 4 3 2 (4+4)


*/


