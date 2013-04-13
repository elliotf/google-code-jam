#!/usr/bin/env node

/*
  Messing around with brute-force generating fair-square numbers
*/

var fs  = require('fs')
  , big = require('bigint')
  , _   = require('underscore')
  , str = require('underscore.string')
;

function symm(s) {
  var l = s.length;
  var h = parseInt(l / 2, 10);
  for (var i = 0; i < h; ++i) {
    if (s[i] !== s[--l]) return false;
  }

  return true;
}

function toTri(i) {
  var t = [];
  while (i > 0) {
    t.push(i % 3);
    i = parseInt(i / 3, 10);
  }

  return t.reverse().join('');
}

var cache = [];

var max = big('1' + str.repeat('0', 50));
for (var i = 1; i; ++i) {
  var tri = toTri(i);
  if (symm(tri)){
    var pow = big(tri).pow(2);
    if (symm(pow.toString())) {
      console.log(tri);
      cache.push(tri);
    }
    if (pow.gt(max)) break;
  }
}

process.exit(0);
