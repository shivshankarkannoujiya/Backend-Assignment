import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

},{timestamps: true})



const User = mongoose.model('User',userSchema)
export {User}