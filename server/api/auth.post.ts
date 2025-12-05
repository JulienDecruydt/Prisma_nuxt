import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  if (user.password !== body.password) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  await setUserSession(event, {
    user: {
      email: user.email,
      id: user.id,
    },
    loggedInAt: new Date(),
  })

  return {
    statusMessage: 'Login successful',
    statusCode: 200,
  }
})
