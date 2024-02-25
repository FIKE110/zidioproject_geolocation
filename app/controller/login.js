import { query } from "../../config/db.js";
import Axios  from "axios";
import dotenv from "dotenv"
import IP from "ip"
//const sql="SELECT * FROM users";

dotenv.config()

const locationsql=`INSERT INTO ip_information (user_id,ip, hostname, city, region, country, loc, org, postal, timezone)
VALUES (?,?,?,?,?,?,?,?,?,?)`;

export async function login(req,res){
    const {email,password} = req.body
    const sql=`SELECT * FROM zidiousers WHERE email=? AND password=? LIMIT 1`
    const result=await query(sql,[email,password])
    const mainres=result[0][0]
    if(mainres?.id){
        const {id}=mainres
        console.log(req.ip)
        const location=await getLocationByIP()
        const {ip,hostname,city,region,country,loc,org,postal,timezone}=await location
        if(ip){
            if(!city){
                req.session.userid=id
                res.redirect('/dashboard?error=Error Could not save location')
                return
            }
            const loc_save=await query(locationsql,[id,ip,hostname || ip,city,region,country,loc,org,postal,timezone])
        }
        req.session.userid=id
        res.redirect("/dashboard")
    }
    else{
        res.redirect("/login?error=Invalid credentials")
    }
}

async function getLocationByIP(){
    let ip=
    IP.address() ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||  
    req.ip || '';
    const ipLocation=Axios.get(`https://ipinfo.io/${ip}?token=${process.env.GEOLOCATION_TOKEN}`)
    .then(response=>response.data)
    .then(data=>data)
    .catch(err=>err)
    return await ipLocation
} 

export default login