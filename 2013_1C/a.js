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
  // Get a substring of at least length n from that position to all later
  //   positions
  // If that substring has n consonants in a row, increment

  // Naive solution does not work when n is large.  Substring search with
  //   large n results in scanning the name L*n times

  var ins  = input.shift().split(' ');
  var name = ins.shift();
  var n    = numify(ins.shift());

  var result  = 0;
  var mlen    = 0;
  var prefix  = -1;
  var isVowel = {
      a: true
    , e: true
    , i: true
    , o: true
    , u: true
  };
  for (var i = 0, l = name.length; i < l; ++i) {
    if (isVowel[name[i]]) {
      mlen = 0;
    } else {
      ++mlen;

      // record the prefixes of this position of n consonants
      if (mlen >= n) {
        prefix = (i - n) + 1;
      }
    }

    // the first time 'prefix' is set, it will count the substring combinations
    //   leading up to the 'n' consonants
    //
    // continue incrementing to catch substring combinations including
    //   characters after the 'n' consonants
    //
    // continue updating 'prefix' to account for the multiple of combinations
    if (~prefix) {
      result += prefix + 1;
    }
    //console.warn(i, prefix, result);
  }

  console.log(str.sprintf('Case #%d: %s', cnum, result));
}

function numify(n) { return parseInt(n, 10); }
function numly(a,b) { return a - b; }
function rnumly(a,b) { return b - a; }
