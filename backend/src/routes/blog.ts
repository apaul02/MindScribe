import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogSchema, updateBlogSchema } from "@ankanpaul/medium-common";

export const blogRouter = new Hono<{
  Bindings : {
    DATABASE_URL : string,
    JWT_SECRET : string
  },
  Variables : {
    userId : string
  }
}>()

blogRouter.use('/*', async(c, next) => {
  const authHeader = c.req.header('authorization') || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
      c.set("userId", user.id);
      await next()
    }else {
      c.status(403);
      c.json({
        message : "You are not logged in"
      })
    }
  }catch(e){
    c.status(403);
      c.json({
        message : "You are not logged in"
      })
  }
})

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const authorId = c.get('userId');
  const body = await c.req.json();
  const { success } = createBlogSchema.safeParse(body);
  if(!success){
    c.status(403)
    return c.json({
      message : "Invalid Inputs"
    })
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId) 
      }
    })
    return c.json({
      id : blog.id
    })
  }catch(e){
    c.status(411)
    return c.json({
      message : "Something went wrong"
    })
  }

  
})

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();
  const { success } = updateBlogSchema.safeParse(body);
  if(!success){
    c.status(403)
    return c.json({
      message : "Invalid Inputs"
    })
  }
  const blog = await prisma.blog.update({
    where : {
      id : body.id
    },
    data : {
      title: body.title,
      content : body.content
    }
  })

  return c.json({
    id : blog.id
  })
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.blog.findMany({
    select: {
      title: true,
      content: true,
      id: true,
      author: {
        select: {
          name:  true
        }
      }
    }
  });
  return c.json({
    blogs
  })

})

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const id = c.req.param('id')

  try {
    const blog = await prisma.blog.findFirst({
      where : {
        id: Number(id)
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })
    return c.json({
      blog
    })
  }catch(e) {
    c.status(411);
    return c.json({
      message : "Error while fetching blog post"
    })
  }
 
})

