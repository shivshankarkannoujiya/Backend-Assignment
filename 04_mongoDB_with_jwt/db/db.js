import mongoose from 'mongoose'
import {DB_NAME} from '../constant.js'


const connectDB = async () => {

    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected! DB host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log(`Error in connecting DB: ${error.message}`)
        process.exit(1)
    }
}


export {connectDB}