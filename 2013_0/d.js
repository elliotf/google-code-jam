#!/usr/bin/env node

/*
  https://code.google.com/codejam/contest/2270488/dashboard#s=p3

  Run with:
    cat input.file | ./d.js  > output.file
*/

function numify(s) { return parseInt(s, 10); }

var fs    = require('fs')
  , print = require('prettyjson').render
  , _     = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g).map(function(l){
    return l.split(' ').map(numify);
  })
  , cnum  = 0
;

var cases = input.shift();

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function iterate(keys, opened, remain) {
  var attempts = [];

  //console.log(keys, opened, remain);
  //console.log(opened);

  if (opened.length == remain.length) {
    return {
      keys: keys
      , opened: opened
      , remain: remain
    };
  }

  var k, o, r, need, have;
  //for (var i = 0, l = remain.length; i < l; ++i) {
  remain.forEach(function(item, i){
    var k = clone(keys);
    var o = clone(opened);
    var r = clone(remain);
    if (!r[i]) return;

    need = r[i].req;
    have = k.indexOf(need);

    if (have === -1) return;

    //console.log(o, i, need, have, k);

    k.splice(have, 1); // remove key once used

    k.push(r[i].keys); // add new keys, if any
    k = _.flatten(k);
    r[i] = null;

    o.push(i);

    attempts.push(iterate(k,o,r));
  });
  //}

  var success = _.find(attempts, function(a){
    if (a && a.opened.length === a.remain.length) {
      return a.opened;
    }
    return false;
  });

  if (success) {
    return success;
  }
}

while (cnum++ < cases) {
  var l = input.shift();
  var numKeys  = l[0]
    , numChest = l[1]
  ;

  var keys = input.shift();
  var chests = [];

  _.range(numChest).forEach(function(i){
    var l = input.shift();
    var req  = l.shift();
    var nk = l.shift();
    var chest = {
      req: req
      , keys: l
    };

    //console.log(chest);
    chests.push(chest);
  });

  var res = iterate(keys, [], chests);

  var text = 'IMPOSSIBLE';
  if (res) {
    text = res.opened.map(function(a){return ++a;}).join(' ');
  }

  console.log(str.sprintf('Case #%d: %s', cnum, text));
}
