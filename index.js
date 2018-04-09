'use strict'

const sqlstring = require('sqlstring');

function build(queryString) {
  var dependencyNames = []; 
  var functionString = queryString;
  var r = /(\?\w+)/g
  var match;
  while ((match = r.exec(queryString)) != null) {
    var parameter = match[1].substring(1);
    dependencyNames.push(parameter);
    functionString = functionString.replace(match[1], '${this.sqlstring.escape(' + parameter + ')}');
  }
  
  functionString = `return \`${functionString}\``;
  dependencyNames.push(functionString);
  return Function.apply(null, dependencyNames).bind({sqlstring});
}

module.exports = build;
