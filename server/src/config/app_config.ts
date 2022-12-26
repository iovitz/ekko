import dotenv, { DotenvParseOutput } from 'dotenv'
import { readFileSync } from 'fs'
import { CustomConfig } from './config'

export type EnvType = 'development' | 'production'

class AppConfig {
  public static DEV: EnvType = 'development'

  public static PROD: EnvType = 'production'

  public static appConfig = new AppConfig(AppConfig.DEV)

  private _config: DotenvParseOutput

  private constructor(public mode: EnvType) {
    this._config = this.initConfig()
  }

  private initConfig(): DotenvParseOutput {
    const ENV_FILE_NAME = '.env'
    const envFilePath = `${ENV_FILE_NAME}.${this.mode}`
    const commonEnvParams = dotenv.parse(readFileSync(ENV_FILE_NAME))
    const modeEnvParams = dotenv.parse(readFileSync(envFilePath))
    return {
      ...commonEnvParams,
      ...modeEnvParams
    }
  }

  getConfig(): CustomConfig

  getConfig<T extends keyof CustomConfig>(key: T): CustomConfig[T]
  getConfig<T extends keyof CustomConfig>(key?: T) {
    if (key) {
      return this._config[key]
    }
    return this._config
  }
}

const { appConfig } = AppConfig
export default appConfig
