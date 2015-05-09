# PADLE - PArser Description LanguagE

A simple logfile parser that generates the parser from a grammar.

## Usage

```js
var padle = require('padle');

var grammar = 'parser p_test { csv( columns("date", "time", "timezone", "pid", "log") delimiter(" ") ); };';
var parser = new padle(grammar);

var parts = parser.parse("2015-01-01 11:13:23 PST [123] Debug log");
```

Parses the log into:

```js
{
  "date": "2015-01-01",
  "time": "11:13:23",
  "timezone": "PST",
  "log": "Debug log"
}
```

## Parser Grammar

The grammar is broken into parts:

```
parser p_test {
  csv(
    columns("a", "b", "c")
    delimiter(",")
  );
};
```

`parser` denotes a parser definition, followed by the name of the parser.

`csv` is the type of parser (currently only csv is implemented).

`columns` is a list of columns to be parsed out.

`delimiter` is the delimiter to split on.
