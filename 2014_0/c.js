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

function board_string(x,y,mines,non_mines) {
  var impossible = false;
  var non_x = Math.ceil(Math.sqrt(non_mines));
  var non_y = Math.floor(non_mines/non_x);

  if (non_y > y) {
    non_y = y;

    non_x = Math.floor(non_mines / y);
  }

  if (non_x > x) {
    non_x = x;

    non_y = Math.floor(non_mines / x);
  }

  var non_remainder = (non_mines - non_x*non_y);

  console.warn("mines", mines);
  console.warn("non_x, non_y", non_x, non_y);
  console.warn("non_remainder", non_remainder);

  if ((x > 1 && y > 1) && (x <= 3 || y <= 3)) {
    if (non_remainder) {
      impossible = true;
    }
  }

  // if x or y are less than 3 we need to be careful
  // otherwise, just start printing stuff

  // bounds check against x and y

  //console.log("x,    y,    m        ", x,    y,    mines);
  //console.log("non_x,non_y,non_mines", non_x,non_y,non_mines);

  // basically, a click needs to be at least dist 2 from every mine
  // I think all we need:
  //   * four non-mine spaces if we have a two-dimensional minefield
  //   * two non-mine spaces if we have a one-dimensional minefield

  // drawing the minefield
  //   * the click is always top-left
  //   * get width/height of non-mine area
  //     * x = Math.ciel(sqrt(non_mines)); y = Math.floor(non_mines/x);

  // if we have multiple non-mine lines equal to two
  // and they differ
  // try to make them equal

  var num_lines = Math.ceil(non_mines / x);
  console.warn("num_lines", num_lines);
  console.warn("non_mines, x", non_mines, x);

  if (num_lines < 3) {
    // ensure lines are equal-ish?
  }

  var iy = 0, ix = 0;
  var nc = non_mines - 1;
  var mc = mines;
  var ny = non_y;
  if (non_remainder) {
    ny++;
  }

  var b = [];
  var row;
  var nx = non_x;
  for(iy = 0; iy < y; iy++) {
    var row = [];

    if (ny-- > 0) {
      nx = non_x;
    }

    if (0 === iy) {
      row.push('c');
      ix = 1;
      nx--;
    } else {
      ix = 0;
    }

    for(ix; ix < x; ++ix) {
      if (nx-- > 0 && nc) {
        nc--;
        row.push('.');
      } else {
        row.push('*');
      }
    }

    b.push(row.join(''));
  }

  if (impossible) {
    console.warn(b.join('\n'));
    return 'Impossible';
  }

  return b.join('\n');
}

_.range(1,num_cases + 1).map(function(cnum){
  console.warn("");

  var tmp   = input.shift().split(' ').map(function(n){ return Number(n); });
  var y     = tmp.shift();
  var x     = tmp.shift();
  var mines = tmp.shift();

  var non_mines = x*y - mines;

  var min_non = (x > 1 && y > 1) ? 4 : 2;
  if (non_mines < min_non) {
    return res(cnum, 'Impossible');
  }

  res(cnum, board_string(x,y,mines,non_mines));
})
