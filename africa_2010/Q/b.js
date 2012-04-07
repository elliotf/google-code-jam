#!/usr/bin/env node

var gcj   = require('codejam');
var input = gcj.getInput();
var cnum  = 0;

while (++cnum <= gcj.numCases) {
    console.log("Case #{c}: {s}".supplant({
          'c': cnum
        , 's': input.shift().reverse().join(' ')
    }));
}
