import mongoose from "mongoose";


const connectDb = async ()=>{
   await  mongoose.connect("mongodb+srv://nileshmahmiya111_db_user:fTyH1DmjL8VYbLwW@cluster0.xgufd1s.mongodb.net/rakesh_ji")
   console.log("connect to database")
}

export default connectDb