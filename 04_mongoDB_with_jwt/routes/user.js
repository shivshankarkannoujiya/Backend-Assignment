import { Router } from 'express'
import { Course } from '../models/courses.models.js'
import {User} from '../models/user.models.js'
import { SECRET_KEY } from '../config.js'
import {userMiddleware} from '../Middlewares/user.js'
import jwt from 'jsonwebtoken'
const router = Router()


// User Register
router.post('/signup', async (req,res) => {
    const {username, password} = req.body

    if (!username || !password) {
        return res.status(400).json({
            message: `username and password required`
        })
    }

    try {
        await User.create({
            username: username,
            password: password
        })
        res.status(200).json({
            message: `User created Successfully`
        })
    } catch (error) {
        res.json({
            message: `Error in Creating User`,
            error: error.message
        })
    }
})


// User login
router.post('/signin', async (req,res) => {
    const {username, password} = req.body

    try {
        const user = await User.find({
            username,
            password
        })

        if (user) {
            const token = jwt.sign({username}, SECRET_KEY)
            res.json({
                token
            })
        }else{
            message: `Incorrect Credential`
        }
    } catch (error) {
        res.json({
            message: `Ubable to SignIn`,
            error: error.message
        })
    }
})


// Fetch Courses
router.get('/courses',userMiddleware, async (req,res) => {
    
    try {
        const response = await Course.find({})
        return res.status(200).json({
            courses: response
        })
    } catch (error) {
        return res.status(500).json({
            message: `An error occurred while fetching courses`,
            error: error.message
        })
    }
})


export {router as userRouter}

