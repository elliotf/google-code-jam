#!/usr/bin/env node

/*

  http://code.google.com/codejam/contest/1645485/dashboard#s=p0

  develop with (running in the current directory):
    ../node_modules/.bin/chicken -c "clear; cat A-sample.in | ./a.js" .

*/

var fs    = require('fs')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
  , cases = input.shift()
;

function numify(n) {
  return parseInt(n, 10);
}

while (++cnum <= cases) {
  var N   = numify(input.shift())
    , lvl = []
    , i
    , l
    , play = 0
    , st   = 0
  ;

  // get as many unused two stars with our current stars
  // if we didn't get any two stars
  //   get an unused one star with the highest two-star requirement
  //   if we didn't get any one stars
  //     give up
  // GOTO 2

  var forOne = [];
  var forTwo = [];
  for (i = 0; i < N; ++i) {
    l = input.shift().split(' ').map(numify);

    var obj = {
      lvl: i
      , o: l[0]
      , t: l[1]
    };

    forOne.push(obj);
    forTwo.push(obj);
  }
  var one = _.range(N).map(function(){return 0;});
  var two = {};

  forOne.sort(function(a,b){ return b.t - a.t; });
  forTwo.sort(function(a,b){ return a.t - b.t; });

  //console.warn(forTwo);
  //console.warn(forOne);

  var incr = 1
    , bef
  ;
  while (incr) {
    bef = st;

    for (i = 0; i < forTwo.length; ++i) {
      l = forTwo[i];
      if (two[l.lvl]) continue;
      if (st < l.t) continue;

      var gain = 2 - one[l.lvl];
      //console.warn(str.sprintf("Doing %s for %d star(s): (%d => %d)", l.lvl, gain, st, st + gain));

      one[l.lvl] = 1;
      two[l.lvl] = 1;

      st = st + gain;
      ++play;
    }

    if (st === bef) {
      for (i = 0; i < forOne.length; ++i) {
        l = forOne[i];
        if (st < l.o) continue;
        if (one[l.lvl]) continue;

        //console.warn(str.sprintf("Doing %s (%s) for 1 star: (%d => %d)", l.lvl, l.o, st, st + 1));
        one[l.lvl] = 1;
        ++st;
        ++play;

        break;
      }
    }

    incr = st - bef;
  }

  if (!play || _.keys(two).length !== N) play = 'Too Bad';

  console.log(str.sprintf("Case #%d: %s", cnum, play));
}
