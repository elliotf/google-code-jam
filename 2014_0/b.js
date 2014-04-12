#!/usr/bin/env node

'use strict';

/*
  Run with:
    cat input.file | ./b.js  > output.file
*/

var fs        = require('fs')
  , _         = require('underscore')
  , str       = require('underscore.string')
  , input     = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , num_cases = parseInt(input.shift(),10)
  , cnum      = 0
  , result
;

function res(cnum, result) {
  console.log(str.sprintf('Case #%d: %s', cnum, result));
}

_.range(1,num_cases + 1).map(function(cnum){
  var tmp        = input.shift().split(' ');
  var farm_cost  = Number(tmp.shift());
  var farm_yield = Number(tmp.shift());
  var target     = Number(tmp.shift());
  var result     = 0;

  var count  = 0;
  var rate   = 2;
  var time   = 0;
  var remain = target;

  function tick() {
    var no_farm   = remain / rate;
    var farm_time = farm_cost / rate;
    var farm      = (remain) / (rate + farm_yield) + farm_time;

    if (no_farm <= farm) {
      time = time + no_farm;
      remain = 0;
    } else {
      time = time + farm_time;
      rate = rate + farm_yield;
    }
  }

  while (remain) {
    tick();
  }

  res(cnum, time);
})
