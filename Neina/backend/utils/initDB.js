import {} from  'dotenv/config';
import mongoose from 'mongoose';

let db_url=process.env.DATABASE_URL;

async function connectToDb(){
    try{
        await mongoose.connect(db_url);
        console.log("Connect to DB");
    }catch(err){
        console.log("error in db connection :", err);
    }
}

export{connectToDb};