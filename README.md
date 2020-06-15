# mysql-query

![Build Status](https://github.com/SerayaEryn/mysql-query/workflows/ci/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/SerayaEryn/mysql-query/badge.svg?branch=master)](https://coveralls.io/github/SerayaEryn/mysql-query?branch=master)
[![NPM version](https://img.shields.io/npm/v/@serayaeryn/mysql-query.svg?style=flat)](https://www.npmjs.com/package/@serayaeryn/mysql-query)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This module provides a performant way to escape your mysql queries to protect from SQL injection.

## Installation

```
npm install @serayaeryn/mysql-query
```

## Usage
Define your query string with placeholders starting with a question mark `?` (for example `?name`) and pass it to the function exported by the `@serayaeryn/mysql-query` module. It will create a function, that accepts the values for the previously defined placeholders and returns the query the escaped values. <br>
**Note**: The values need to be passed in the same order as the placeholders are defined in the query.
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
Clone the repository and run `npm run benchmark`.
### Results

```bash
$ npm run benchmark

@serayaeryn/mysql-query x 5,618,794 ops/sec ±0.40% (89 runs sampled)
sqlstring - format x 1,981,991 ops/sec ±0.23% (92 runs sampled)
Fastest is @serayaeryn/mysql-query
```

## License

[MIT](./LICENSE)
