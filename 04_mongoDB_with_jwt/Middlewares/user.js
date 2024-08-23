import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

function userMiddleware(req,res,next){
    const token = req.headers.authorization
    const words = token.split(" ");
    const jwtToken = words[1]
    const decodedValue = jwt.verify(jwtToken, SECRET_KEY)

    try {
        
        if (decodedValue.username) {
            req.username = username
            next()
        }else{
            res.status(403).json({
                message: `User not Authenticated!`
            })
        }

    } catch (error) {
        res.json({
            message: `Incorrect Inputs`,
            error: error.message
        })
    }
}

export{
    userMiddleware
}