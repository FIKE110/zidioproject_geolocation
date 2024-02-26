import axios  from "axios"
import IP from 'ip'
import dotenv from 'dotenv'

dotenv.config()

async function getIpController(req,res){
    const ip=
    IP.address() ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||  '';
    console.log(ip,'gshsh')
    ip='2001:4860:4860::8888'
    if(ip != '::1'){
        const ipLocation=axios.get(`https://ipinfo.io/${ip}?token=${process.env.GEOLOCATION_TOKEN}`)
        .then(response=>response.data)
        .then(data=>data)
        .catch(err=>res.send(err))
        res.json(await ipLocation)
    }
}


export default getIpController