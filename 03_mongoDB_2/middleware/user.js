import {User} from '../model/user.models.js'

async function userMiddleware(req,res,next){
    const username = req.headers.username
    const password = req.headers.password

    if (!username || !password) {
        res.status(400).json({
            msg: `username and password required!`
        })
    }

    try {
        const user =  await User.findOne({
            username: username,
            password: password
        })

        if (user) {
            next()
        }else{
            res.status(403).json({
                msg: `User doesn'n Exist or Incorrect Credential`
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: `Internal Server Error`,
            error: error.message
        })
    }
}

export {userMiddleware}