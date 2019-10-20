'use strict'

const test = require('ava')
const mysqlQuery = require('..')

test('Should escape parameter', (t) => {
  t.plan(1)
  const queryString = 'SELECT email FROM users WHERE id=?id;'

  const emailQuery = mysqlQuery(queryString)
  const escapedQuery = emailQuery('1')

  t.is(escapedQuery, 'SELECT email FROM users WHERE id=\'1\';')
})

test('Should escape parameter in camelcase', (t) => {
  t.plan(1)
  const queryString = 'SELECT email FROM users WHERE id=?userId;'

  const emailQuery = mysqlQuery(queryString)
  const escapedQuery = emailQuery('1')

  t.is(escapedQuery, 'SELECT email FROM users WHERE id=\'1\';')
})

test('Should escape multiple parameter', (t) => {
  t.plan(1)
  const queryString = 'SELECT email FROM users WHERE id=?id AND name=?name AND age=?age;'

  const emailQuery = mysqlQuery(queryString)
  const escapedQuery = emailQuery('1', 'test', 42)

  t.is(escapedQuery, 'SELECT email FROM users WHERE id=\'1\' AND name=\'test\' AND age=42;')
})
