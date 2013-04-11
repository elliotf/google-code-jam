#!/usr/bin/env node

// http://code.google.com/codejam/contest/1460488/dashboard#s=p0

var gcj   = require('./codejam');
var input = gcj.getInput('skip_parsing');
var cnum  = 0;

var coded = " zqejpmysljylckdkxveddknmcrejsicpdrysirbcpcypcrtcsradkhwyfrepkymveddknkmkrkcddekrkdeoyakwaejtysrreujdrlkgcjv";
var clear = " qzourlanguageisimpossibletounderstandtherearetwentysixfactorialpossibilitiessoitisokayifyouwanttojustgiveup";
var lookup = {};

for (var i = 0, l = coded.length; i < l; ++i) {
  lookup[coded[i]] = clear[i];
}

while (++cnum <= gcj.numCases) {
    var str = input.shift().join(' ');
    var r = [];
    for (var i = 0, l = str.length; i < l; ++i) {
        r.push(lookup[str[i]]);
    }

    console.log("Case #{c}: {r}".supplant({
          'c': cnum
        , 'r': r.join('')
    }));
}
