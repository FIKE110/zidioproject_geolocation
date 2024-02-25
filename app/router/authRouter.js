import express from "express"
import login from "../controller/login.js"
import signup from "../controller/signup.js"
import { loginSchema,signupSchema } from "../model/schemas.js"
import { query } from "../../config/db.js"

const authRouter=express.Router()
authRouter.post("/login",loginMiddleware,login)
authRouter.post("/signup",signupMiddleWare,signup)
authRouter.get("/enter",(req,res)=>{
    req.session.number++
    res.status(200).send(req.session.number.toString())
})

function loginMiddleware(req,res,next){
    console.log(req.body)
    const message=loginSchema.safeParse(req.body)
    console.log(message)
    if(message.success){
        next()
    }
    else{
        res.redirect("/login?error=Invalid credentials")
        //res.json(message)
    }
}

async function signupMiddleWare(req,res,next){
    const message=signupSchema.safeParse(req.body)
    if(message.success){
        try{
        const {name,email}=req.body
        const verifysqlName=`SELECT name FROM zidiousers WHERE name=? `
        const resultverify=await query(verifysqlName,[name])
        const mainres=resultverify[0]
        const verifysqlEmail=`SELECT email FROM zidiousers WHERE email=? `
        const resultverifyEmail=await query(verifysqlEmail,[email])
        const mainresemail=resultverifyEmail[0]
        if(mainres.length>0){
            res.redirect("/signup?error=Name is already used")
            return
        }
        if(mainresemail.length>0){
            res.redirect("/signup?error=Email is already used")
            return
        }

        next()
        }
        catch(e){
            res.redirect('/signup?error=Server error e.g Database error contact admin')
        }
    }
    else{
        res.redirect(`/signup?error=${message.error.issues[0].message}`)
    }
}

export default authRouter