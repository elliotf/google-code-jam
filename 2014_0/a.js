#!/usr/bin/env node

/*
  Run with:
    cat input.file | ./a.js  > output.file
*/

var fs        = require('fs')
  , _         = require('underscore')
  , str       = require('underscore.string')
  , input     = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , num_cases = input.shift()
  , cnum      = 0
  , result
;

function overlap(a,b) {
  var i, j;

  var r = [];

  for(i = 0; i < 4; ++i) {
    if (b.indexOf(a[i]) >= 0) {
      r.push(a[i]);

      if (r.length > 1) return 'Bad Magician!';
    }
  }

  return (r.length) ? r[0] : 'Volunteer cheated!';
}

while (cnum++ < num_cases) {
  var a = input.shift();
  var rows_a = input.splice(0,4).map(function(line){
    return line.split(' ');
  });

  var b = input.shift();
  var rows_b = input.splice(0,4).map(function(line){
    return line.split(' ');
  });

  result = overlap(rows_a[a-1],rows_b[b-1]);

  console.log(str.sprintf('Case #%d: %s', cnum, result));
}
