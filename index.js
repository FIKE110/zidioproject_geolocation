import authRouter from "./app/router/authRouter.js"
import express from "express"
import cors from "cors"
import session from "express-session"
import { createConnection} from "./config/db.js"
import IPRouter from "./app/router/IPRouter.js"
import {getLocationFromDb} from "./app/controller/dashboardController.js"
import dotenv from "dotenv"

dotenv.config()

const app=express()
app.use(cors())
app.use(express.json())
app.use(session({
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
app.use(express.urlencoded({extended:true}))
app.use("/auth",authRouter)
app.use("/location",IPRouter)
app.use(express.static('public'))
app.set('trust proxy',true)
app.set('views', 'views');

// Set EJS as the view engine
app.set('view engine', 'ejs');

createConnection()

app.get('/',(req,res)=>{
    res.redirect('login')
})

app.get("/login",(req,res)=>{
    if(req.session?.userid){
        res.redirect("/dashboard")
        return
    }
    const error=req.query?.error
    if(error) console.log(error)
    res.render("login",{errorMessage:error})
})

app.get("/signup",(req,res)=>{
    if(req.session?.userid){
        res.redirect("/dashboard")
        return
    }
    const error=req.query?.error
    if(error) console.log(error)
    res.render("signup",{errorMessage:error})
})

app.get("/dashboard",async (req,res)=>{
    if(!req.session.userid){
        res.redirect("/login")
    }
    else{
        const error=req.query?.error
        if(error) console.log(error)
        const userid=req.session.userid
        const limit=5
        const data=await getLocationFromDb({userid,limit})
        const ipInformation=await data[0]
        res.render("dashboard",{ipInformation,errorMessage:error})
    }
})

app.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
      } else {
        // Redirect to a logged-out page or login page
        res.redirect('/login');
      }
    });
  });

  app.get("*",(req,res)=>{
    res.render("404")
  })

app.listen(process.env.EXPRESS_PORT || 3000,()=>{
    console.log("Server started")
})