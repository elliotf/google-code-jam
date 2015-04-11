'use strict';

var fs        = require('fs')
  , _         = require('underscore')
  , str       = require('underscore.string')
  , input     = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , num_cases = input.shift()
  , cnum      = 0
  , result
;

while (cnum++ < num_cases) {
  (function() {
    var p = input.shift().split('').map(Number);
    p.shift();
    p.shift();

    var friends  = 0;
    var standing = 0;
    p.forEach(function(num_will_stand, needed_to_stand) {
      var need_more_friends = needed_to_stand - standing;
      if (need_more_friends > 0) {
        friends = friends + need_more_friends;
        standing = standing + need_more_friends;
      }

      standing = standing + num_will_stand;
    });

    result = friends;

    console.log(str.sprintf('Case #%d: %s', cnum, result));
  })();
}

