import { Router } from 'express'
import { Blog } from '../models/blog.model.js'
import { User } from '../models/user.models.js'


const testingRouter = Router()

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

export default testingRouter