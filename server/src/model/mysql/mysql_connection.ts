import { Sequelize } from 'sequelize-typescript'
import appConfig from '@/config/app_config'

const {
  mysql_host: host,
  mysql_user: user,
  mysql_password: password,
  mysql_dbname: dbName,
  mysql_port: port,
  mysql_dialect: dialect
} = appConfig.getConfig()

export const sequelize = new Sequelize(dbName, user, password, {
  host,
  port: Number(port) || 3306,
  dialect: dialect as 'mysql',
  define: {
    timestamps: false,
    freezeTableName: true
  },
  pool: {
    min: 5,
    max: 10,
    idle: 2e4
  },
  logging: false
})
