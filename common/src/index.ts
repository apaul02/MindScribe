import z from 'zod'

export const signupSchema = z.object({
  username : z.string().email(),
  password : z.string().min(6),
  name : z.string().optional()
})


export const signinSchema = z.object({
  username : z.string().email(),
  password : z.string().min(6)
})


export const createBlogSchema = z.object({
  title : z.string(),
  content : z.string()
})


export const updateBlogSchema = z.object({
  title : z.string(),
  content : z.string(),
  id : z.number()
})

export type UpdateBlogInput = z.infer<typeof updateBlogSchema>
export type CreateBlogInput = z.infer<typeof createBlogSchema>
export type SigninInput = z.infer<typeof signinSchema>
export type SignupInput = z.infer<typeof signupSchema>

