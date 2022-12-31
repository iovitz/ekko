/* eslint-disable no-console */
export enum LogLevel {
  Normal = 'Normal',
  Debug = 'Debug'
}

class Printer {
  private level: LogLevel = LogLevel.Normal

  setLevel(level: LogLevel) {
    this.level = level
  }
  transformParam(params: any[]) {
    return params.map((param) => (typeof param === 'object' && param !== null ? JSON.stringify(param, null, 2) : param))
  }
  success(...args: any[]) {
    console.log('SUC', ...this.transformParam(args))
  }
  error(...args: any[]) {
    console.log('ERR', ...this.transformParam(args))
  }
  info(...args: any[]) {
    console.log('INF', ...this.transformParam(args))
  }
  custom(prefix: string, ...args: any[]) {
    console.log(prefix, ...this.transformParam(args))
  }
  verbose(...args: any[]) {
    if (this.level !== LogLevel.Debug) return
    console.log('DEB', ...this.transformParam(args))
  }
}

export const printer = new Printer()
