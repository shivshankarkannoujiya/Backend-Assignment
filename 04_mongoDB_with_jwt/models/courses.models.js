import mongoose from 'mongoose'


const courseSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    imageLink:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    isPublished:{
        type: Boolean,
        default: false
    }

},{timestamps:true})


const Course = mongoose.model('Course',courseSchema)
export {Course}