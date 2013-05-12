#!/usr/bin/env node

// DOES NOT FINISH LARGE SET IN TIME

/*
  Run with:
    cat input.file | ./a.js  > output.file
*/

var fs    = require('fs')
  , big   = require('bigint')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
;

var cases = numify(input.shift());

while (cnum++ < cases) {

  // naive:
  // for every position
  // get a substring of at least length n from that position to all later positions
  // if that substring has n consonants in a row, increment

  // shortcuts: if the n consonants happen early on, don't bother counting each subsequent position invididually

  var ins  = input.shift().split(' ');
  var orig = ins.shift();
  var n    = numify(ins.shift());

  var result = 0;
  var string = orig.replace(/[aeiou]/g, '0').replace(/[^0]/g, '1');

  var toFind = str.repeat('1', n);
  for (var i = 0, l = string.length; i < (l - (n - 1)); ++i) {
    var found = string.indexOf(toFind, i);
    if (~found) {
      //console.warn("F: ", string, i, found);
      //console.warn(string.substr(i));
      ++result;
      console.warn("R: ", i, result);

      var after = l - (found + n);
      if (after > 0) {
        console.warn("A: ", i, after);
        result += after;
        console.warn("R: ", i, result);
      }
    }
    console.warn('');
  }

  console.log(str.sprintf('Case #%d: %s', cnum, result));
}

function numify(n) { return parseInt(n, 10); }
function numly(a,b) { return a - b; }
function rnumly(a,b) { return b - a; }
