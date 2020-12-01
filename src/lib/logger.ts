export enum Level {
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

export const levelMapper = {
  [`${Level.ERROR}`]: 'error',
  [`${Level.WARN}`]: 'warn',
  [`${Level.INFO}`]: 'info',
  [`${Level.DEBUG}`]: 'debug',
};

export class Logger {
  public level: Level = Level.INFO;
  private prefix: string | undefined;
  onLog: ((level: Level, args: Array<any>) => any) | undefined;

  constructor({
    prefix,
    level,
    titleTemplate,
    onLog,
  }: {
    prefix?: typeof Logger.prototype.prefix;
    level?: typeof Logger.prototype.level;
    titleTemplate?: typeof Logger.prototype.titleTemplate;
    onLog?: typeof Logger.prototype.onLog;
  } = {}) {
    if (prefix) this.prefix = prefix;
    if (level) this.level = level;
    if (titleTemplate) this.titleTemplate = titleTemplate;
    if (onLog) this.onLog = onLog;
  }

  log(runtimeLevel: Level, args) {
    if (runtimeLevel <= this.level) {
      const title = this.titleTemplate({
        prefix: this.prefix,
        level: runtimeLevel,
      });

      if (this.onLog) this.onLog(runtimeLevel, args);

      console[levelMapper[runtimeLevel]](title, ...args);
    }
  }

  error(...args) {
    this.log(Level.ERROR, args);
  }

  warn(...args) {
    this.log(Level.WARN, args);
  }

  info(...args) {
    this.log(Level.INFO, args);
  }

  debug(...args) {
    this.log(Level.DEBUG, args);
  }

  titleTemplate({
    prefix,
    level,
  }: {
    prefix: typeof Logger.prototype.prefix;
    level: typeof Logger.prototype.level;
  }) {
    return prefix
      ? `[${prefix}:${levelMapper[level]}]`
      : `[${levelMapper[level]}]`;
  }
}
