'use strict';

var fs        = require('fs')
  , _         = require('underscore')
  , str       = require('underscore.string')
  , Big       = require('bn.js')
  , input     = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , num_cases = input.shift()
  , cnum      = 0
  , result
;

var zero = new Big('0', 10);
var one  = new Big('1', 10);
var two  = new Big('2', 10);
var max  = new Big('10000', 10);

// brute force, ho!
function isDivisible(input) {
  if (input.eq(one) || input.eq(two)) {
    return false;
  }

  for(var i = new Big(2, 10), s = input.divRound(two); i.lte(s); i.iadd(one)) {
    if (input.mod(new Big(i, 10)).eq(zero)) {
      return i;
    }

    if (i.gte(max)) {
      return false;
    }
  }

  return false;
}

function isJamcoin(input) {
  var r = [];
  var v;
  var d;
  if (input === '10000000000000000000010101010001') {
    //console.log('input', input);
  }

  for (var b = 2; b <= 10; ++b) {
    v = new Big(input, b);

    //console.log('v', v);
    d = isDivisible(v);

    if (
      input === '10000000000000000000010101010001' ||
      input === '10000000000000000000011110110111' ||
      input === '10000000000000000000011110111101'
    ) {
      //console.log('v.toString(10), b, d', v.toString(10), b, d.toString());
    };

    if (!d) {
      return false;
    }

    r.push(d);

    //console.log('d', d);
  }

  return r;
}

while (cnum++ < num_cases) {
  (function() {
    var t = input.shift().split(' ').map(Number);
    //console.log('t', t);
    var l = t.shift();
    var j = t.shift();

    //console.log('l', l);

    var min = new Big('1' + '0'.repeat(l-2) + '1', 2);
    var max = new Big('1'.repeat(l), 2);

    //console.log('max', max);

    var s;
    var r = [];
    var d;
    for (var i = min; i.lte(max); i.iadd(new Big('2', 10))) {
      s = i.toString(2);

      //console.log('s', s);

      d = isJamcoin(s);

      if (d) {
        r.push([s, d]);
      }

      if (r.length === j) {
        break;
      }
    }

    console.log('Case #%d:', cnum);
    r.forEach(function(r) {
      console.log(r[0], r[1].join(' '));
    });
  })();
}

