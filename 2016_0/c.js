'use strict';

var fs        = require('fs')
  , _         = require('underscore')
  , str       = require('underscore.string')
  , Big       = require('big.js')
  , input     = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , num_cases = input.shift()
  , cnum      = 0
  , result
;

Big.E_POS = 100;

// brute force, ho!
function isDivisible(input) {
  if (input === 2 || input === 1) {
    return true;
  }

  for(var i = 2, s = Math.ceil(input/2, 10); i <= s; ++i) {
    if (input % i === 0) {
      return i;
    }
  }

  return false;
}

function isJamcoin(input) {
  var r = [];
  for (var b = 2; b <= 10; ++b) {
    var v = parseInt(input, b);

    //console.log('v', v);
    var d = isDivisible(v);

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

    var min = parseInt('1' + '0'.repeat(l-2) + '1', 2);
    var max = parseInt('1'.repeat(l), 2);

    //console.log('max', max);

    var s;
    var r = [];
    var d;
    for (var i = min; i <= max; i = i + 2) {
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

    //console.log('r', r);

    console.log('Case #%d:');
    r.forEach(function(r) {
      console.log(r[0], r[1].join(' '));
    });
  })();
}

