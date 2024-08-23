import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/db.js'
import {adminRouter} from './routes/admin.js'
import { userRouter } from './routes/user.js'
const app = express()

dotenv.config({
    path: './.env'
})

app.use(express.json())
app.use('/admin', adminRouter)
app.use('/user',userRouter)




const PORT = process.env.PORT || 3000
connectDB()
.then(function(){
    app.listen(PORT, () => {
        console.log(`Serving at http://localhost:${PORT}`)
    })
})
.catch(function(err){
    console.log(`MongoDB connection ERROR: ${err.message}`)
    
})
