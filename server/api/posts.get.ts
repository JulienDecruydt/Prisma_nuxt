import { prisma } from '../utils/prisma'

export default defineEventHandler(async () => {
  const posts = await prisma.post.findMany()
  return posts
})
