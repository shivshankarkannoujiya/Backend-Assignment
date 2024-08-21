import express from 'express'
const app = express()
let requestCount = 0




// Count number of Request made on Server
app.use(function (req,res,next){
    requestCount++
    next()
})


app.get('/user', function(req,res){
    res.status(200).json({user: `Raj`})
})


app.post('/user', function(req,res){
    res.status(200).json({msg: `User Created Successfully`})
})

app.get('/requestCount', function(req,res){
    res.status(200).json({requestCount})
})



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening at:${port}`)
    
})