import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB =  async ()=>{

    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongo database is connected!!! ${conn.connection.host} `)
    }catch(error){
        throw error
    }

}




export default connectDB
 
