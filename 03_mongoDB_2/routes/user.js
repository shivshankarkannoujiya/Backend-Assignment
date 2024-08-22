import { Router } from "express";
import {User} from '../model/user.models.js'
import { Course } from "../model/courses.models.js";
import {userMiddleware} from '../middleware/user.js'

const router = Router()

router.post('/signup', async (req,res) => {

    try {
        const {username, password} = req.body
        await User.create({
            username,
            password
        })

        res.status(200).json({
            msg: `User Created Successfully!`
        })

    } catch (error) {
        res.status(500).json({
            msg: `Error Creating User`,
            error: error.message
        })
    }
})


router.get('/courses', userMiddleware, async (req,res) => {
    try {
        const response = await Course.find({})
        res.json({
            courses: response
        })
    } catch (error) {
        res.json({
            msg: `Error in fetching Courses`,
            error: error.message
        })
    }
})


router.post('/course/:courseId',userMiddleware, async (req,res) => {

    const courseId = req.params.courseId
    const username = req.headers.username

    await User.updateOne({
        username: username
    },{
        "$push":{
            purchasedCourse: courseId
        }
    })

    res.status(200).json({
        message: `Course Purchased Successfully!`
    })
})


router.get('/purchasedCourses', userMiddleware, async (req,res) => {
    
    try {
        const user = await User.findOne({
            username: req.headers.username
        })

        if (!user) {
           return res.status(404).json({msg: `User not found`})
        }
    
        if (!Array.isArray(user.purchasedCourse) || user.purchasedCourse.length === 0) {
             return res.status(200).json({
                msg: `No Courses purchased:`,
                courses: []
            })
        }


        const courses = await Course.find({
            _id: {
                "$in": user.purchasedCourse
            }
        })
    
        res.json({
            courses
        })
    }  catch (error) {
        res.json({
            message: `Unable to find purchased Courses`,
            error: error.message
        })
    }
})


export {router as userRouter}