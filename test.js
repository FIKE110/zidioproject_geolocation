import axios from "axios";
import { response } from "express";

function query(url,data){
    axios.post(url,data)
    .then(response=>response.data)
    .then(data=>console.log(data))
    .catch(err=>err)
}

