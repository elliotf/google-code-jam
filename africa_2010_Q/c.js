#!/usr/bin/env node

var gcj   = require('codejam');
var input = gcj.getInput();
var cnum  = 0;

var letters = [
  [' ']
  , []
  , 'abc'.split('')
  , 'def'.split('')
  , 'ghi'.split('')
  , 'jkl'.split('')
  , 'mno'.split('')
  , 'pqrs'.split('')
  , 'tuv'.split('')
  , 'wxyz'.split('')
];

var lookup = {};
letters.forEach(function(a,n){
    if (a.length == 0) return;
    a.forEach(function(c,i) {
        lookup[c] = n.toString().repeat(i + 1);
    });
});

//console.log(lookup);

while (++cnum <= gcj.numCases) {
    var chars = input.shift().join(' ').split('');
    var output = [];
    var last_num = null;
    chars.forEach(function(c,i) {
        var p = lookup[c];
        if (p.last() == last_num) output.push(' ');
        last_num = p.last();
        output.push(p);
    });
    console.log("Case #{c}: {s}".supplant({
        'c': cnum
        ,'s': output.join('')
    }));
}
