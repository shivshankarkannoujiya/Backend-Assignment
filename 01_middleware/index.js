import express from 'express'
const app = express()


let numberOfRequestForUser = {}
setInterval(()=>{
    numberOfRequestForUser = {}
},1000)


function handleRequestUserCanMake(req,res,next){
    const userId = req.headers[`user-id`]
    if (numberOfRequestForUser[userId]) {
        numberOfRequestForUser[userId]++
        if (numberOfRequestForUser[userId] > 5) {
            res.status(403).json({
                msg: `Request limit exceede...`
            })
        }else{
            next()
        }
    }else{
        numberOfRequestForUser[userId] = 1
        next()
    }
}

app.use(handleRequestUserCanMake)



app.get(`/user`, function(req,res){
    res.status(200).json({user:`Jack`})
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening at: ${port}`)
    
})