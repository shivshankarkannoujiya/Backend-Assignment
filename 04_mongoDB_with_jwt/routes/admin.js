import Router from 'express'
import {Admin} from '../models/admin.models.js'
import {Course} from '../models/courses.models.js'
import jwt from 'jsonwebtoken'
import {adminMiddleware} from '../Middlewares/admin.js'
import { SECRET_KEY } from '../config.js'
const router = Router()


router.post('/signup', async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        await Admin.create({
            username: username,
            password: password
        })
    
        res.status(200).json({
            message: `Admin Created Successfully!`
        })
    } catch (error) {
        res.json({
            message: `Error in creating Admin`,
            error: error.message
        })
    }
})



router.post('/signin', async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    
    try {
        const admin = await Admin.find({
            username,
            password
        })

        if (admin) {
            const token = jwt.sign({username}, SECRET_KEY)
            res.json({
                token
            })
        }else{
            res.json({
                message: `Incorrect Username and password`
            })
        }
    } catch (error) {
        res.json({
            message: `Unable to SignIn Admin`,
            error: error.message
        })
    }
})


router.post('/courses',adminMiddleware, async (req,res) => {
    const {title, description, imageLink, price, isPublished} = req.body

    try {
        const newCourse = Course.create({
            title,
            description,
            imageLink,
            price,
            isPublished
        })
        res.json({
            message: `Course created Successfully, CourseId: ${(await newCourse)._id}`
        })
    } catch (error) {
        res.status(500).json({
            message: `Error in Creating Course`,
            error: error.message
        })
    }
})


router.get('/courses', adminMiddleware, async (req,res) => {
    
    try {
        const response = await Course.find({})
        res.json({
            courses: response
        })
    } catch (error) {
        res.json({
            message: `Unable to fetch Courses`,
            error: error.message
        })
    }
})


export {router as adminRouter}
