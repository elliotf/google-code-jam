#!/usr/bin/env node

/*

  http://code.google.com/codejam/contest/975485/dashboard#s=p1

  develop with (running in the current directory):
    ../node_modules/.bin/chicken -c "clear; cat B-sample.in | ./b.js" .

*/

var fs    = require('fs')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , pp    = require('prettyjson').render
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
  , cases = input.shift()
;

_.range(cases).forEach(function(cnum) {
  ++cnum;

  var repl = {};
  var inv = input.shift().split(/\s/);
  var nr = numify(inv.shift());
  inv.splice(0, nr).forEach(function(s){
    var out = s[2];
    var inp = s.substr(0,2);
    repl[str.reverse(inp)] = repl[inp] = out;
  });

  var clear = {};
  var nc = numify(inv.shift());
  inv.splice(0,nc).forEach(function(input){
    clear[str.reverse(input)] = clear[input] = true;
  });

  inv.shift();
  inv = inv.shift().split('');

  var res = [];
  inv.forEach(function(el) {
    var last  = res[res.length - 1];
    var combo = last + el;
    if (repl[combo]) {
      res[res.length -1] = repl[combo];
      return;
    }

    for (var i in res) {
      if (clear[res[i] + el]) {
        res = [];
        return;
      }
    }

    res.push(el);
  });

  console.log(str.sprintf("Case #%s: [%s]", cnum, res.join(', ')));
});

// util functions
function numify(n)   { return parseInt(n, 10); }
function numly(a,b)  { return a-b; }
function rnumly(a,b) { return b-a; }
