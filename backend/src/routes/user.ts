import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinSchema, signupSchema } from "@ankanpaul/medium-common";

export const userRouter = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    JWT_SECRET : string
  }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const { success } = signupSchema.safeParse(body);
  if(!success){
    c.status(403)
    return c.json({
      message : "Invalid Inputs"
    })
  }
  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name
      }
    })
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)


    return c.json({
      msg : "Successfully signed up",
      token : jwt
    })
  } catch(e){
    c.status(411)
    return c.json({
      msg : "invalid"
    })
  }
  
  
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signinSchema.safeParse(body);
  if(!success){
    c.status(403)
    return c.json({
      message : "Invalid Inputs"
    })
  }
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        username: body.username,
        password: body.password
      }
    })
    if(!findUser){
      c.status(403)
      return c.json({
        msg : "User does not exist"
      })
    }
    const jwt = await sign({
      id : findUser.id
    }, c.env.JWT_SECRET)

    return c.json({
      msg : "Successfully signed in",
      token: jwt
    })
  }catch(e){
    c.status(411)
    c.json({
      msg : "Invalid"
    })
  }
})

userRouter.get('/me', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const authHeader = c.req.header('authorization') || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    const userDetails = await prisma.user.findUnique({
      where : {
        id : user.id
      },
      select : {
        username : true
      }
    })
    return c.json({
      userDetails
    })
  }catch(err){
    c.status(403);
    return c.json({
      msg : "Invalid"
    })
  }
})