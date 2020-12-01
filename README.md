# mini-logger

[![CircleCI](https://circleci.com/gh/JerryC8080/mini-logger/tree/master.svg?style=svg)](https://circleci.com/gh/JerryC8080/mini-logger/tree/master)

[![NPM Version](https://img.shields.io/npm/v/@jerryc/mini-logger.svg)](https://www.npmjs.com/package/@jerryc/mini-logger) [![NPM Downloads](https://img.shields.io/npm/dm/@jerryc/mini-logger.svg)](https://www.npmjs.com/package/@jerryc/mini-logger) [![Coverage Status](https://coveralls.io/repos/github/JerryC8080/mini-logger/badge.svg?branch=master)](https://coveralls.io/github/JerryC8080/mini-logger?branch=master) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@jerryc/mini-logger.svg)

一个迷你小 Logger，它可以：

1. 提供最小的 4 个 log level，你可以根据不同需要来控制日志输出 level。
2. 提供 `onLog` 钩子, 方便你扩展你需要的逻辑。
3. 以及提供 `prefix`, `title template` 来个性化输出的日志样式。

## Quick Usage

1. Install

   ```
   $ npm install @jerryc/mini-logger
   ```

2. Import and use

   ```javascript
   import { Logger } from '@jerryc/mini-logger';
   const logger = new Logger();

   logger.error('Hi');
   logger.warn('Hi');
   logger.info('Hi');
   logger.debug('Hi');

   // 输出：[error] Hi
   // 输出：[warn] Hi
   // 输出：[info] Hi
   // 输出：[debug] Hi
   ```

## Level 控制

Level 有级别之分，`new Logger({ level })` 时可以定义最低的 level，那么在比此 level 高的级别日志，就会被输出。

Level 级别：

| Level       | 级别 |
| ----------- | ---- |
| Level.ERROR | 1    |
| Level.WARN  | 2    |
| Level.INFO  | 3    |
| Level.DEBUG | 4    |

如：

```javascript
import { Logger, Level } from '@jerryc/mini-logger';
const logger = new Logger({ level: Level.ERROR });

logger.info('Hi, i am info');
logger.error('Hi, i am error');

// 输出: Hi, i am error
```

**运行时更新 level**

```javascript
logger.level = Level.INFO;

logger.info('Hi, i am info');
logger.error('Hi, i am error');

// 输出: Hi, i am info
// 输出: Hi, i am error
```

## 个性化格式输出

默认输出格式：`[prefix:level] log content`，支持输出格式的自定义。

**1. 使用 `prefix` 来区分模块**

```javascript
import { Logger, Level } from '@jerryc/mini-logger';
const userLogger = new Logger({
  prefix: 'user-services',
});

const goodsLogger = new Logger({
  prefix: 'goods-services',
});

userLogger.info('hi, i am info');
// 输出：[user-services:info] hi, i am info

goodsLogger.info('hi, i am info');
// 输出：[goods-services:info] hi, i am info
```

**2. 使用 `titleTemplate` 来更个性化改变格式**

```javascript
import { Logger, Level } from '@jerryc/mini-logger';

const logger = new Logger({
  prefix: 'my-logger',
  titleTemplate: ({ prefix, level }) => {
    return `[${prefix}-${levelMapper[level]}]`;
  },
});

logger.info('hi, i am info');
// 输出：[my-logger-info] hi, i am info
```

## 通过 `onLog` 钩子，进行更自定义的逻辑

```javascript
const logger = new Logger({
  onLog: (level, args) => {
    console.log({ level, args });
    // 连接自建的日志上报系统...
  },
});

logger.info('hi, i am info');

// 输出：{ level: 3, args: [ 'hi, i am info' ] }
```

## API

详见：https://jerryc8080.github.io/mini-logger/

## 测试覆盖率

详见：https://jerryc8080.github.io/mini-logger/coverages
