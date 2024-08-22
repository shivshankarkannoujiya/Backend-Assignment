# MongoDB Connection


## db.js
```javascript
const connectDB = async () => {
    try {
        const connectionInstance =  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected! DB host: ${(await connectionInstance).connection.host}`)
        
    } catch (error) {
        console.log(`MongoDB connection Error: ${error.message}`)
        
    }
}
 
```

## index.js

```javascript
// index.js
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening at ${PORT}`);
        
    })
})
.catch((err) => {
    console.log(`MongoDB connection ERROR: ${err.message}`);
    
})
```