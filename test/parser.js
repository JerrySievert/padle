var test = require('tape');

var parser = require('../index');

test('parser correctly parses a line', function (t) {
  var testData = '2015-04-20 21:25:58 PDT [84611-1] LOG:  database system was shut down at 2015-04-20 21:25:21 PDT';
  var source = 'parser p_test { csv( columns("date", "time", "timezone", "pid", "log") delimiter(" ") ); };';

  var p = new parser(source);

  var line = p.parse(testData);

  console.log(line);
  t.plan(5);

  t.equal(line.date, '2015-04-20');
  t.equal(line.time, '21:25:58');
  t.equal(line.timezone, 'PDT');
  t.equal(line.pid, '[84611-1]');
  t.equal(line.log, 'LOG:  database system was shut down at 2015-04-20 21:25:21 PDT');
});
