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
    var s = input.shift();

    //console.log('s', s);

    s = s.replace(/\-+/g, '-');
    s = s.replace(/\++/g, '+');

    //console.log('s', s);

    s = s.split('');

    // if the bottom-most pancake is already face-up, it's free.
    if (s[s.length - 1] === '+') {
      s.pop();
    }

    //console.log('s', s.join(''));

    var r = 0;

    console.log(str.sprintf('Case #%d: %s', cnum, s.length));
  })();
}

