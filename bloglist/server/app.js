import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import { MongoDb_URI } from './utils/config.js'
import { info, error } from './utils/logger.js'
import blogsRouter from './controllers/bloig.controller.js'
import usersRouter from './controllers/user.controller.js'
import { tokenExtractor } from './utils/middleware.js'
import testingRouter from './controllers/testing.js' 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

info('connecting to MongoDB...')

const connectToDB = async () => {
  try {
    await mongoose.connect(MongoDb_URI, { family: 4 })
    info('connected to MongoDB successfully')
  } catch (err) {
    error('error connecting to MongoDB:', err.message)
  }
}

connectToDB()
app.use(express.json())
app.use(tokenExtractor)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users',usersRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

export default app