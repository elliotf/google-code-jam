#!/usr/bin/env node

/*

  http://code.google.com/codejam/contest/1460488/dashboard#s=p0

  develop with (running in the current directory):
    ../node_modules/.bin/chicken -c "clear; cat A-sample.in | ./a.js" .

*/

var fs    = require('fs')
  , _     = require('underscore')
  , str   = require('underscore.string')
  , input = fs.readFileSync('/dev/stdin').toString().split(/\n/g)
  , cnum  = 0
  , cases = input.shift()
;

var coded = " zqejpmysljylckdkxveddknmcrejsicpdrysirbcpcypcrtcsradkhwyfrepkymveddknkmkrkcddekrkdeoyakwaejtysrreujdrlkgcjv";
var clear = " qzourlanguageisimpossibletounderstandtherearetwentysixfactorialpossibilitiessoitisokayifyouwanttojustgiveup";
var lookup = {};

for (var i = 0, l = coded.length; i < l; ++i) {
  lookup[coded[i]] = clear[i];
}

while (++cnum <= cases) {
    var trans = input.shift().split('');
    for (var i = 0, l = trans.length; i < l; ++i) {
      trans[i] = lookup[trans[i]];
    }

    console.log(str.sprintf("Case #%d: %s", cnum, trans.join('')));
}
