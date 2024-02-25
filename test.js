import axios from "axios";
import { response } from "express";

function query(url,data){
    axios.post(url,data)
    .then(response=>response.data)
    .then(data=>console.log(data))
    .catch(err=>err)
}

await query("http://localhost:3000/auth/login",{email:"iyke@gmail.com",password:"fortuneiyke"})
//await query("http://localhost:3000/auth/signup",{email:"iyke@gmail.com",name:"iyke@gmail.com",password:"11211434211"})