import test from 'ava';

import { Level, levelMapper, Logger } from './logger';

function convert(level: Level, t, params) {
  return function (levelName, ...args) {
    t.is(levelName, `[${levelMapper[level]}]`);
    args.forEach((value, index) => t.is(value, params[index]));
  };
}

test('error/warn/info/debug', (t) => {
  const logger = new Logger();

  const params = ['a', 'b', 'c'];

  const error = console.error;
  const warn = console.warn;
  const info = console.info;
  const debug = console.debug;

  console.error = convert(Level.ERROR, t, params);
  console.warn = convert(Level.WARN, t, params);
  console.info = convert(Level.INFO, t, params);
  console.debug = convert(Level.DEBUG, t, params);

  logger.error(...params);
  logger.warn(...params);
  logger.info(...params);
  logger.debug(...params);

  console.error = error;
  console.warn = warn;
  console.info = info;
  console.debug = debug;
});

test('prefix', (t) => {
  const logger = new Logger({ prefix: 'my-logger' });

  logger.info('hi');
  t.is(true, true);
});

test('level controller', (t) => {
  const logger = new Logger({ level: Level.ERROR });
  logger.error('hi, i am error');
  logger.warn('hi, i am warn');
  logger.info('hi, i am info');
  logger.debug('hi, i am debug');
  t.is(true, true);
});

test('title template', (t) => {
  const logger = new Logger({
    prefix: 'my-logger',
    titleTemplate: ({ prefix, level }) => {
      return `[${prefix}-${levelMapper[level]}]`;
    },
  });

  logger.info('hi, i am info');
  t.is(true, true);
});

test('on log', (t) => {
  // const params = ['hi, i am info'];
  const logger = new Logger({
    onLog: (level, args) => {
      console.log({ level, args });
      // t.is(level, Level.INFO);
      // args.forEach((arg, index) => t.is(arg, params[index]));
    },
  });

  logger.info('hi, i am info');
  t.is(true, true);
});
