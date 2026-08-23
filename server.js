
import { app } from "./src/app.js";


import connectDB from "./src/db/connectDb.js";





connectDB()
const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`Connect to server on port: ${port}`)
})