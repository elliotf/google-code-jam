'use strict';

var fs        = require('fs')
  , _         = require('underscore')
  , str       = require('underscore.string')
  , input     = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , num_cases = input.shift()
  , cnum      = 0
  , result
;

input.pop();

while (input.length) {
  cnum++;
  (function() {
    var dim  = input.shift().split(' ').map(Number);

    var x    = dim.shift();
    var half = parseInt(x/2, 10);

    dim.sort();
    var min  = dim.shift();
    var max  = dim.shift();
    var area = min*max;

    var can_win = 0;

    if (half > min) {
      // if the grid is too narrow
      //console.error("too narrow");
      can_win++;
    } else if (x > max) {
      // if the x-omino can be longer than the longest grid dim
      //console.error("x-omino can be too long");
      can_win++;
    } else if (x >= 7) {
      // if the x-omino can have a hole (so the hole can't be filled)
      //console.error("x-omino can have a hole");
      can_win++;
    } else if (area % x) {
      // if the grid area is not cleanly divisible by x
      //console.error("will have a remainder");
      can_win++;
    } else if (false) {
      // something about a diagonal?
    }

    result = (can_win) ? 'RICHARD' : 'GABRIEL';
    console.log(str.sprintf('Case #%d: %s', cnum, result));
  })();
}


