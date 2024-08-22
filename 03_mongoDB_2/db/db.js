import mongoose from 'mongoose'
import {DB_NAME} from '../constant.js'


const connectDB = async () => {

    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected! DB host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log(`MongoDB Connection Failed: ${error.message}`) 
        process.exit(1)
    }
}

export {connectDB}