#!/usr/bin/env node

var gcj   = require('codejam');
var input = gcj.getInput();
var cnum  = 0;

while (++cnum <= gcj.numCases) {
    var num_items = input.shift();

    var one = input.shift().sort(function(a,b){return a - b});
    var two = input.shift().sort(function(a,b){return b - a});

    var result = 0;
    for (var i = 0, l = one.length; i < l; ++i) {
        result = result + (one[i] * two[i]);
    }

    console.log("Case #{c}: {result}".supplant({
          'c': cnum
        , 'result': result
    }));
}
