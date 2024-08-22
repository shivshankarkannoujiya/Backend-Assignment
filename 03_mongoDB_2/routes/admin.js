import Router from "express";
import { Admin } from "../model/admin.models.js";
import { Course } from "../model/courses.models.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = Router();




router.post("/signup", async (req, res) => {

  try {

    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password,
    })

    res.json({
        msg: `Admin Created Successfully`,
    });
} catch (error) {
    res.status(500).json({
        msg: `Error Creating Admin`,
        error: error.message
    })
  }
});


router.post('/courses', adminMiddleware, async (req,res) => {

    try {
        const {title, description, imageLink, price, isPublished } = req.body
        const newCourse = await Course.create({
            title,
            description,
            price,
            imageLink,
            isPublished
        })
    
        res.json({
            msg: `Course Created Successfully courseId: ${newCourse._id}`
        })
    } catch (error) {
        res.status(500).json({
            msg: `Error creating Course`,
            error: error.message
        })
    }
})


router.get('/courses',adminMiddleware, async (req,res) => {

    try {
        const response = await Course.find({})
        res.json({
            courses: response
        })
    } catch (error) {
        res.json({
            msg: `Unable to fetch Courses`,
            error: error.message
        })
    }
})


export {router as adminRouter}
