import {query} from "../../config/db.js"
import login from "./login.js"

async function signup(req,res){
    const {name,email,password} = req.body
    const sql=`INSERT INTO zidiousers 
    (name,email,password) VALUES(?,?,?)`
    const result=query(sql,[name,email,password])
    console.log(result)
    login(req,res)
    //res.send({msg:"Successfully created User"})
}

export default signup