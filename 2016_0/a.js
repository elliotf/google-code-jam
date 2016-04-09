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

while (cnum++ < num_cases) {
  (function() {
    var n = new Big(input.shift());
    var c;

    var seen = {};
    for (var i = 1; ; ++i) {
      c = n.times(i);

      if (n.eq(0)) {
        c = 'INSOMNIA';
        break;
      }

      c.toString().split('').forEach(function(v) {
        seen[v] = true;
      });

      if (Object.keys(seen).length === 10) {
        break;
      }

      if (i > 1000) {
        throw new Error('Could not get an answer for ' + n);
      }
    }

    console.log(str.sprintf('Case #%d: %s', cnum, c));
  })();
}

