#!/usr/bin/env node

/*
  https://code.google.com/codejam/contest/544101/dashboard#s=p0&a=0

  Run with:
    cat input.file | ./a.js  > output.file
  Develop with (will re-run on every file write):
    ../node_modules/.bin/chicken -c "cat A-sample.in | ./a.js" .
*/

var fs    = require('fs')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , pp    = require('prettyjson').render
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
;

var cases = input.shift();

function findChain(board, pl, len) {
  var toFind = str.repeat(pl, len);
  var ny, nx;

  var cols = [];

  for (var y = 0, my = board.length; y < my; ++y) {
    var row = board[y];
    if (~row.indexOf(toFind)) return true;

    for (var x = 0, mx = row.length; x < mx; ++x) {
      var down = '';
      for (ny = y; ny < my; ++ny) {
        down = down + board[ny][x];
      }
      if (~down.indexOf(toFind)) return true;

      var diagDown = '';
      for (ny = y, nx = x; ny < my && nx < my; ++ny, ++nx) {
        diagDown = diagDown + board[ny][nx];
      }
      if (~diagDown.indexOf(toFind)) return true;

      var diagUp = '';
      for (ny = y, nx = x; ny && nx < my; --ny, ++nx) {
        diagUp = diagUp + board[ny][nx];
      }
      if (~diagUp.indexOf(toFind)) return true;
    }
  }

  return false;
}

while (cnum++ < cases) {
  var a = input.shift().split(' ');

  // don't rotate the board; remove empty spaces and process right-to-left
  var board = input.splice(0, a.shift()).map(function(c){
    return c.replace(/\./g, '').split('').reverse().join('');
  });
  var conn  = a.shift();

  //console.warn(pp(board));

  var red  = findChain(board, 'R', conn) ? 1 : 0;
  var blue = findChain(board, 'B', conn) ? 2 : 0;
  var res  = ['Neither', 'Red', 'Blue', 'Both'][red + blue];

  console.log(str.sprintf('Case #%d: %s', cnum, res));
}
