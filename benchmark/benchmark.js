'use strict';

const Benchmark = require('benchmark');
const mysqlQuery = require('..');
const sqlstring = require('sqlstring');

const queryString1 = `SELECT email FROM users WHERE id=? AND name=? AND age=?;`;
const queryString2 = 'SELECT email FROM users WHERE id=?id AND name=?name AND age=?age;'
const emailQuery = mysqlQuery(queryString2);

const suite2 = new Benchmark.Suite();
 
suite2.add('@serayaeryn/mysql-query', function() {
  emailQuery('1', 'test', 42);
})
.add('sqlstring - format', function() {
  sqlstring.format(queryString1, ['1', 'test', 42])
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });