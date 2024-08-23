import jwt from 'jsonwebtoken'
import {SECRET_KEY} from '../config.js'
import { Router } from 'express'



function adminMiddleware(req,res,next){
    const token = req.headers.authorization
    const words = token.split(" ")
    const jwtToken = words[1]
    const decodedValue = jwt.verify(jwtToken,SECRET_KEY)

    try {
        if (decodedValue.username) {
            next()
        }else{
            res.status(403).json({
                message: `Admin not Authenticated!`
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
    adminMiddleware
}