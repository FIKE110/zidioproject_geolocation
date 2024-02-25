import {z} from "zod"

const loginSchema=z.object({
    email:z.string().email().max(255),
    password:z.string().min(6).max(255)
})

const signupSchema=z.object({
    name:z.string().min(4,{message:"Name must be a minimum of 4 characters"})
    .max(255,{message:"Name must be a max of 255 characters"}),
    email:z.string().email({message:"This is an invalid email"}).max(255),
    password:z.string().min(6,{message:"Password must be a minimum of 4 characters"})
    .max({message:"Password must be a max of 255 characters"})
})

export {loginSchema,signupSchema}