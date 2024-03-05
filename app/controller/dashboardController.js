import { query } from "../../config/db.js"

export async function getLocationFromDb({userid,limit}){
    const sql=`SELECT * FROM ip_information where user_id=? ORDER BY id DESC LIMIT ?`;
    const sql2=`SELECT * FROM zidiousers where id=?`
    const result=await query(sql,[userid,limit])
    const result2=await query(sql2,[userid])
    return await {result,result2}
}

async function getLocationFromDbController(req,res){
    if(!req.session?.userid){
        res.json({msg:"session expired please login in"})
    }
    else{
        const userid=req.session.userid
        const limit=5
        const data=await getLocationFromDb({userid,limit})
        res.json(await data[0])
    }
}

export default getLocationFromDbController