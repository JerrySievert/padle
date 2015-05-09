var test = require('tape');

var parser = require('../lib/parser');

test('parser parses full statement', function (t) {
  var str = 'parser p_test { csv( columns("a", "b") flags("none") delimiter(" ") ); };';

  var parsed = parser.parse(str);

  t.plan(5);

  t.equal(typeof(parsed), 'object');
  t.equal(parsed.name, 'p_test');
  t.equal(parsed.columns.length, 2);
  t.equal(parsed.flags[0], 'none');
  t.equal(parsed.delimiter, ' ');
});

test('parser parses statement without flags', function (t) {
  var str = 'parser p_test { csv( columns("a", "b") delimiter(" ") ); };';

  var parsed = parser.parse(str);

  t.plan(5);

  t.equal(typeof(parsed), 'object');
  t.equal(parsed.name, 'p_test');
  t.equal(parsed.columns.length, 2);
  t.equal(parsed.flags, undefined);
  t.equal(parsed.delimiter, ' ');
});

test('parser parses statement without delimiter', function (t) {
  var str = 'parser p_test { csv( columns("a", "b") flags("none") ); };';

  var parsed = parser.parse(str);

  t.plan(5);

  t.equal(typeof(parsed), 'object');
  t.equal(parsed.name, 'p_test');
  t.equal(parsed.columns.length, 2);
  t.equal(parsed.flags[0], 'none');
  t.equal(parsed.delimiter, undefined);
});

test('parser parses statement without flags or delimiter', function (t) {
  var str = 'parser p_test { csv( columns("a", "b") ); };';

  var parsed = parser.parse(str);

  t.plan(5);

  t.equal(typeof(parsed), 'object');
  t.equal(parsed.name, 'p_test');
  t.equal(parsed.columns.length, 2);
  t.equal(parsed.flags, undefined);
  t.equal(parsed.delimiter, undefined);
});
