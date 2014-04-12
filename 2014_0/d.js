#!/usr/bin/env node
'use strict';

//  Run with:
//   cat input.file | ./d.js  > output.file

var fs        = require('fs')
  , _         = require('underscore')
  , str       = require('underscore.string')
  , input     = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , num_cases = Number(input.shift())
  , cnum      = 0
  , result
;

function res(cnum, result) {
  console.log(str.sprintf('Case #%d: %s', cnum, result));
}

_.range(1,num_cases + 1).map(function(cnum){
  var count  = input.shift();
  var n      = input.shift().split(' ').map(function(n){ return Number(n); });
  var k      = input.shift().split(' ').map(function(n){ return Number(n); });
  var result = 0;

  function score_adjusted(win,lose) {
    win  = win.sort().reverse();
    lose = lose.sort().reverse();

    var score = 0;

    for(var i = 0; i < count; ++i) {
      if (lose[i] > win[i]) {
        win.unshift(win.pop());
      }
    }

    for(var j = 0; j < count; ++j) {
      if (win[j] > lose[j]) {
        score++;
      }
    }

    return score;
  }

  result = str.sprintf("%d %d", score_adjusted(n,k), count - score_adjusted(k,n));

  res(cnum, result);
})
