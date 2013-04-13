#!/usr/bin/env node

/*
  https://code.google.com/codejam/contest/2270488/dashboard#s=p2

  Run with:
    cat input.file | ./c.js  > output.file
*/

var fs    = require('fs')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , big   = require('bigint')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
;

function numify(s) { return parseInt(s, 10); }

var cases = input.shift();

var good = {};

/*
var max = '1' + '000' + '000' + '000' + '000' + '000';
for (var i = big(1); i.le(max); i = i.add(1)){
  if (good[i.toNumber()]) {
    ++res;
    continue;
  }

  var is = i.toString();

  if (str.reverse(is) == is) {
    var s = i.pow(2);
    if (s.gt(max)) break;

    var ss = s.toString();
    if (str.reverse(ss) == ss) {
      good[i.toNumber()] = true;
      ++res;
    }
  }
}

var cache = Object.keys(good).map(numify).sort(function(a,b){return a-b;});
*/

/*
  generated offline using the above code
  will generate based on obvious pattern for other large set
*/
var cache = [
  1,
  2,
  3,
  11,
  22,
  101,
  111,
  121,
  202,
  212,
  1001,
  1111,
  2002,
  10001,
  10101,
  10201,
  11011,
  11111,
  11211,
  20002,
  20102,
  100001,
  101101,
  110011,
  111111,
  200002,
  1000001,
  1001001,
  1002001,
  1010101,
  1011101,
  1012101,
  1100011,
  1101011,
  1102011,
  1110111,
  1111111,
  2000002,
  2001002,
  10000001,
  10011001,
  10100101,
  10111101,
  11000011,
  11011011,
  11100111,
  11111111,
  20000002
];

//console.warn(cache);

while (cnum++ < cases) {
  var l = input.shift().split(' ');
  var min = big(l.shift(), 10)
    , max = big(l.shift(), 10)
  ;

  var res = 0;

  cache.forEach(function(n){
    var p = big(n).pow(2);
    if (p.ge(min) && p.le(max)) ++res;
  });

  console.log(str.sprintf('Case #%d: %s', cnum, res));
}
