var csv_generator = require('csv-parser-generator');
var language_parser = require('./lib/parser');

function parser (source) {
  var rules = language_parser.parse(source);
  rules = rules || { };

  // generate a csv parser
  if (rules.type === 'csv') {
    rules.delimiter = rules.delimiter || ',';
    var options = { delimiter: rules.delimiter };

    if (options.flags && options.flags.indexOf('strip-whitespace') !== -1) {
      options['strip-whitespace'] = true;
    }

    if (options.flags && options.flags.indexOf('ignore-quotes') !== -1) {
      options['ignore-whitespace'] = true;
    }

    this._parser = csv_generator(options);
  }

  this.rules = rules;
}

parser.prototype.parse = function (row) {
  var parts = this._parser.parse(row);

  // iterate through the columns, and create the output
  var res = { };
  for (var i = 0; i < this.rules.columns.length; i++) {
    // last column?
    if (i === this.rules.columns.length - 1) {
      if (parts.length) {
        res[this.rules.columns[i]] = parts.join(this.rules.delimiter);
      }
    } else {
      res[this.rules.columns[i]] = parts.shift();
    }
  }

  return res;
};

module.exports = exports = parser;
