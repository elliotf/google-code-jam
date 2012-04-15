#!/usr/bin/env node

var gcj   = require('codejam');
var input = gcj.getInput();
var cnum  = 0;
var num_cases = gcj.numCases;

while (++cnum <= num_cases) {
    var config = input.shift();

    // existing directories
    var num_e = config[0];
    var e = {};
    while (num_e--) {
        e[input.shift()[0].replace(/^\//, '')] = true;
    }

    // num created
    var r = 0;
    var num_t = config[1];
    var t = [];
    while (num_t--) {
        t.push(input.shift()[0]);
    }

    t.forEach(function(p){
        var parts = p.split('/');
        parts.shift();
        var test = [];
        while (parts.length) {
            test.push(parts.shift());
            var path = test.join('/');
            if (!e[path]) {
                e[path] = true;
                ++r;
            }
        }
    });

    console.log("Case #{cnum}: {r}".supplant({
          'cnum': cnum
          , 'r': r
    }));
}
