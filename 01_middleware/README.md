# Task - 1

- You have been given an express server which has a few endpoints.
- Your task is to create a global middleware (app.use) which will
- maintain a count of the number of requests made to the server in the global
 requestCount variable

## Solution

```javascript
app.use(function (req,res,next){
    requestCount++
    next()
})

```

# Task - 2

- You have been given an express server which has a few endpoints.
- Your task is to create a global middleware (app.use) which will
- rate limit the requests from a user to only 5 request per second
- If a user sends more than 5 requests in a single second, the server
- should block them with a 404.
- User will be sending in their user id in the header as 'user-id'
- You have been given a numberOfRequestsForUser object to start off with which
 clears every one second


 ## Solution

 ```javascript
 
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
 ```