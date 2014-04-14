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
  console.log(str.sprintf('Case #%d:\n%s', cnum, result));
}

// when non-mines outnumber mines
//   make a square of mines in the bottom-right
// when mines outnumber non-mines
//   make a square of non-mines in the top-left

_.range(1,num_cases + 1).map(function(cnum){
  console.warn("");

  var tmp      = input.shift().split(' ').map(function(n){ return Number(n); });
  var y        = tmp.shift();
  var x        = tmp.shift();
  var mines    = tmp.shift();
  var non      = x*y - mines;
  var rotate   = false;
  var fail     = 'Impossible';
  var last_non = [];

  if (x > y) {
    console.warn("flipping");
    rotate = true;
    tmp = x;
    x = y;
    y = tmp;
  }

  var non_rows      = Math.floor(non / x);
  var non_remainder = Math.floor(non % x);

  function flip(b) {
    var y = b.length;
    var t;

    for (var i = 0; i < b.length; ++i) {
      for (var j = 0; j < i; ++j) {
        t = b[i][j];
        b[i][j] = b[j][i];
        b[j][i] = t;
      }
    }
  }

  function str(b) {
    if (rotate) {
      flip(b);
    }

    return b.map(function(r){return r.join('')}).join('\n');
  }

  function fill(b) {
    var n = non;

    b.forEach(function(row, y){
      row.forEach(function(field, x){
        if (n-- > 0) {
          row[x] = '.';
        }
        if (n === 0) {
          last_non = [y,x];
        }
      });
    });
  }

  function solve() {
    // check for min non-mines
    // either one or two (for 1d) or one or four (for 2d)

    if (x > 2 && (non === 2 || non === 3)) {
      return fail;
    }

    if (x == 2) {
      // can't have an odd number of mines if we're only two wide
      if (mines % 2) return fail;
    }

    var b = [];
    _.range(1,y+1).forEach(function(){
      var r = [];
      _.range(1,x+1).forEach(function() {
        r.push('*');
      });

      b.push(r);
    });

    fill(b);

    console.warn("non_rows, non", non_rows, non);
    if (non_rows === 0 && non > 1) {
      console.warn("should fail");
      return fail;
    }

    if (non_rows === 1 && !non_remainder && non > 1) {
      if (non % 2) {
        //return fail
      }
    }

    if (non_rows === 1 && non > 1 && non % 2) {
      return fail;
    }

    if (non_rows === 1) {
      // make both lines mines and make a block of non-mines
      b[0] = _.range(x).map(function(){return '*';});
      b[1] = _.range(x).map(function(){return '*';});

      for (var r = 0; r < 2; ++r) {
        for (var c = 0; c < non / 2; ++c) {
          b[r][c] = '.';
        }
      }
    }

    if (non_remainder && non_rows == 2) {
      if (last_non[1] < 1) {
        if (x < 4) {
          return fail;
        }
        b[2][1] = '.';
        b[2][2] = '.';
        b[0][x-1] = '*';
        b[1][x-1] = '*';
      }
    }

    /*
    if (x > 1 && last_non[0] > 0 && last_non[1] === 0) {
      b[last_non[0]][last_non[1] + 1] = '.';
      b[last_non[0]-1][x-1] = '*';
    }
    */

    /*
    if (non_rows == 1 && non_remainder) {
      console.warn("new problem");

      if ((x - non_remainder) % 2) {
        //return fail;
      }
    }
    */

    b[0][0] = 'c';

    var nx = x;
    var ny = y;

    return str(b);
  }

  res(cnum, solve());
})
