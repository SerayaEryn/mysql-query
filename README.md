# mysql-query

[![Greenkeeper badge](https://badges.greenkeeper.io/SerayaEryn/mysql-query.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/SerayaEryn/mysql-query.svg?branch=master)](https://travis-ci.org/SerayaEryn/mysql-query)
[![Coverage Status](https://coveralls.io/repos/github/SerayaEryn/mysql-query/badge.svg?branch=master)](https://coveralls.io/github/SerayaEryn/mysql-query?branch=master)
[![NPM version](https://img.shields.io/npm/v/@serayaeryn/mysql-query.svg?style=flat)](https://www.npmjs.com/package/@serayaeryn/mysql-query)

This module provides a performant way to escape your mysql queries to protect from SQL injection.

## Installation

```
npm install @serayaeryn/mysql-query
```

## Usage
Define your query string with placeholders starting with `?` (for example `?name`) and pass it to the function exported by the `@serayaeryn/mysql-query` module. It will create a function, that accepts the values for the previously defined placeholders and returns the query the escaped values.
```js
// on startup
const mysqlQuery = require('@serayaeryn/mysql-query');
const getEscapedQuery = mysqlQuery('SELECT email FROM users WHERE id=?id;');

// on runtime
const escapedQuery = getEscapedQuery('1');

connection.query(escapedQuery);
```
## Benchmark
The benchmark compares to the `format(sql, values)` function of the [sqlstring](https://www.npmjs.com/package/sqlstring) module.

### Usage
```
npm run benchmark
```
### Results

```bash
$ npm run benchmark

@serayaeryn/mysql-query x 5,428,143 ops/sec ±0.49% (86 runs sampled)
sqlstring - format x 1,968,558 ops/sec ±0.81% (91 runs sampled)
Fastest is @serayaeryn/mysql-query
```

## License

[MIT](./LICENSE)
