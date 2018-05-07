'use strict'

const sqlstring = require('sqlstring');

const MATCH_PLACEHOLDERS_REGEXP = /\?(\w+)/g;

function build(queryString) {
  var parameters = []; 
  var functionString = queryString;
  MATCH_PLACEHOLDERS_REGEXP.lastIndex = 0;
  var match;
  while ((match = MATCH_PLACEHOLDERS_REGEXP.exec(queryString))) {
    var parameter = match[1];
    parameters.push(parameter);
    functionString = functionString.replace('?' + parameter, '${sqlstring.escape(' + parameter + ')}');
  }
  
  functionString = `return function(${parameters.join(', ')}) { return \`${functionString}\`}`;
  return Function.apply(null, ['sqlstring', functionString]).apply(null, [sqlstring]);
}

module.exports = build;
