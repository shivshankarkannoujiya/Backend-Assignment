import {Admin} from '../model/admin.models.js'

async function adminMiddleware(req,res,next){
    const username = req.headers.username
    const password = req.headers.password

    if (!username || !password) {
        res.status(400).json({
            msg: `username and password required!`
        })
    }

    try {

        const admin = await Admin.findOne({
            username: username,
            password: password
        })

        if (admin) {
            next()
        }else{
            res.status(403).json({
                msg: `Admin doesn't exist or Incorrect Cresential`
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: `Internal Server Error`,
            error: error.message
        })
        
    }
}

export {adminMiddleware}