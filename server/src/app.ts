import { Server } from './server'

const app = new Server()

setTimeout(async () => {
  app.init()
}, 0)
