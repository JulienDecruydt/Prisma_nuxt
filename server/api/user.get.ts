import { prisma } from '../utils/prisma'

export default defineEventHandler(async () => {
  const user = await prisma.user.findFirst()
  return user
})
