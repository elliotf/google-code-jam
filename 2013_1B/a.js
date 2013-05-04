#!/usr/bin/env node

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
  var l = input.shift().split(/\s+/).map(numify);
  var A = l.shift();
  var N = l.shift();
  var M = input.shift().split(/\s+/).map(numify).sort(numly);

  var result = 0;
  var m      = A;
  for (var i = 0; i < N; ++i) {
    // can't consume anything; can't get bigger
    if (m === 1) result = N;

    if (result >= N) {
      result = N;
      console.warn("we're at the worst-case scenario");
      break;
    }

    // insert motes, or remove/skip motes?
    // how many motes would we have to insert?
    // if we do not insert, can we get the rest?
    // this seems like a permutation of "longest increasing subsequence"
    //console.warn(m, M[i], M);

    // happy path; we can consume
    if (m > M[i]) {
      m += M[i];
      continue;
    }

    // if we consume this one, can we get the rest?
    // would we have to add more than there are elements left?
    var toConsume = 0, t = m;
    while (M[i] >= t) {
      t += (t - 1);
      ++toConsume;
    }

    if (toConsume + result < N) {
      result += toConsume;
      m = t + M[i];
    } else {
      console.warn(toConsume, " is >= ", (N - i));
      ++result;
    }
  }

  console.log(str.sprintf('Case #%d: %s', cnum, result));
}

function numify(n) { return parseInt(n, 10); }
function numly(a,b) { return a - b; }
function rnumly(a,b) { return b - a; }
