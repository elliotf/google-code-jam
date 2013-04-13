#!/usr/bin/env node

/*
  https://code.google.com/codejam/contest/2270488/dashboard#s=p1

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

function numify(s) { return parseInt(s, 10); }

while (cnum++ < cases) {
  var dim = input.shift().split(' ').map(numify);
  var x = dim.shift();
  var y = dim.shift();

  var todo = {};

  var rows = input.splice(0,x).map(function(r,ix){
    return r.split(' ').map(numify).map(function(v,iy) {
      var coordKey = [ix,iy].join(',');
      todo[coordKey] = true;
      return {
        h: v
        , ck: coordKey
      };
    });
  });

  var cols = _.range(y).map(function(i){
    return rows.map(function(r){ return r[i]; });
  });

  rows.forEach(function(row){
    var max = Math.max.apply(null,_.pluck(row, 'h'));
    row.forEach(function(cell){
      if (cell.h == max) {
        delete todo[cell.ck];
      }
    });
  });

  cols.forEach(function(col){
    var max = Math.max.apply(null,_.pluck(col, 'h'));
    col.forEach(function(cell){
      if (cell.h == max) {
        delete todo[cell.ck];
      }
    });
  });

  var result = (Object.keys(todo).length) ? "NO" : "YES";

  console.log(str.sprintf('Case #%d: %s', cnum, result));
}
