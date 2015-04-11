'use strict';

var fs        = require('fs')
  , _         = require('underscore')
  , str       = require('underscore.string')
  , input     = fs.readFileSync('/dev/stdin').toString().split(/\n/)
  , num_cases = input.shift()
  , cnum      = 0
  , result
;

input.pop(); // get rid of empty string after last newline

var split_stops = [0,1,2,4,8,16,32,64,128,256,512,1024];

while (input.length) {
  cnum++;
  (function() {
    input.shift(); // number of people, ignored
    var plates     = input.shift().split(' ').map(Number);
    var max        = Math.max.apply(null, plates); // I *think* we only care about whatever plate has the most pancakes
    var minutes    = 0;
    var split_stop = 0;
    for(var i = 0; i < split_stops.length; ++i) {
      if (max < split_stops[i]) {
        break;
      }

      minutes    = i;
      split_stop = split_stops[i];
    }

    if (max > split_stop) {
      minutes++;
    }

    //console.log("minutes, max, split_stop", minutes, max, split_stop);

    console.log(str.sprintf('Case #%d: %s', cnum, minutes));
  })();
}

/*



19
10 9
5 5 4 5
2 2 2 2 2 3
1 1 1 1 1 1 1 1 2
0 0 0 0 0 0 0 0 1
0 0 0 0 0 0 0 0 0



19
16 3
8 8 1 2
4 4 4 4 1 1 1
2 2 2 2 2 2 2 2
1 1 1 1 1 1 1 1
0 0 0 0 0 0 0 0



18
9 9
4 4 5 5
2 2 2 2 2 3 2 3
1 1 1 1 1 1 1 1 2 2
0 0 0 0 0 0 0 0 1 1 1 1
0 0 0 0 0 0 0 0 0 0 0 0



18
16 2
8 8 1 1
4 4 4 4 1 1 1
2 2 2 2 2 2 2 2
1 1 1 1 1 1 1 1
0 0 0 0 0 0 0 0


16
8 8
4 4 4 4
2 2 2 2 2 2 2 2
1 1 1 1 1 1 1 1
0 0 0 0 0 0 0 0






*/


