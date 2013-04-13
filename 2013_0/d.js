#!/usr/bin/env node

/*
  https://code.google.com/codejam/contest/2270488/dashboard#s=p3

  Run with:
    cat input.file | ./d.js  > output.file
*/

var fs    = require('fs')
  , print = require('prettyjson').render
  , _     = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
;

var cases = input.shift();

function numify(s) { return parseInt(s, 10); }

while (cnum++ < cases) {
  var l = input.shift().split(' ').map(numify);
  var numKeys  = l[0]
    , numChest = l[1]
  ;

  var keys = input.shift().split(' ').map(numify);
  var chests = [];

  _.range(numChest).forEach(function(i){
    var l = input.shift().split(' ').map(numify);
    var req  = l.shift();
    var nk = l.shift();
    var chest = {
      r: req
      , k: l
    };

    chests.push(chest);
  });

  console.warn(print({
    k:   keys
    , c: chests
  }));

  var res;

  console.log(str.sprintf('Case #%d: %s', cnum, res));
}
