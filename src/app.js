import express from 'express'
import cors from 'cors'
import config from '../config/config.js'
import { promisify } from 'util'
import router from './routes.js'

const init = async () => {
  const app = express()
  const host = config.app.host
  const port = config.app.port

  app.use(cors())
  app.use(express.json())

  app.use(router)

  const listen = promisify(app.listen.bind(app))
  await listen(port, host)

  console.log(`Server running at http://${host}:${port}...`)
}

init()
