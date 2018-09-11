'use strict'

const sqlstring = require('sqlstring')
const generateFunction = require('generate-function')

const MATCH_PLACEHOLDERS_REGEXP = /\?(\w+)/g

function build (queryString) {
  var parameters = []
  var functionString = queryString
  MATCH_PLACEHOLDERS_REGEXP.lastIndex = 0
  var match
  while ((match = MATCH_PLACEHOLDERS_REGEXP.exec(queryString))) {
    var parameter = match[1]
    parameters.push(parameter)
    functionString = functionString.replace('?' + parameter, '${sqlstring.escape(' + parameter + ')}')
  }
  const gen = generateFunction()
  gen(`
    function buildQuery (sqlstring) {
      return function(${parameters.join(', ')}) {
        return \`${functionString}\`
      }
    }
  `)
  return gen.toFunction()(sqlstring)
}

module.exports = build
