#!/usr/bin/env node

var gcj    = require('codejam');
var _      = require('underscore');
var inputs = gcj.getInput('skip_parsing');
var cnum   = 0;

while (++cnum <= gcj.numCases) {
  var input = inputs.shift().join('').toLowerCase().replace(/[^a-z]/igm, '').split('');
  //console.log(input.join(''));
  //continue;

  var counts = {};
  input.forEach(function(l){
    counts[l] = (counts[l] || 0 ) + 1;
  });

  var value = 26;
  var result = 0;

  _.values(counts).sort(function(a,b){return a-b;}).reverse().forEach(function(count){
    result = result + (count * value--);
  });

  //console.log("Case #%d: %s", cnum, result);
  console.log("%s", result);
}
