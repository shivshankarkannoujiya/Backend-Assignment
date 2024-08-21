import express from 'express'
const app = express()


let errorCount = 0

app.get(`/user`, function(req,res){
    try {
        throw new Error(`User not found...`)
    } catch (error) {
        next(error)
    }
})


app.post(`/user`, function(req,res){
    res.status(200).json({msg: `User Created Successfully...`})
})


app.get(`/errorCount`, function(req,res){
    res.status(200).json({
        errorCount: errorCount
    })
})


// Error Handling Middleware
app.use(function(err,req,res,next){
    res.status(404).json({})
    errorCount = errorCount + 1
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening at: ${port}`)
})