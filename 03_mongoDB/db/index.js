import mongoose from 'mongoose'
import {DB_NAME} from '../constant.js'


const connectDB = async () => {
    try {
        const connectionInstance =  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected! DB host: ${(await connectionInstance).connection.host}`)
        
    } catch (error) {
        console.log(`MongoDB connection Error: ${error.message}`)
        
    }
}

export default connectDB