import dotenv from 'dotenv'
dotenv.config()

const config = {
  app: {
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : process.env.HOST,
    port: process.env.PORT
  }
}

export default config
