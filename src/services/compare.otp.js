import bcrypt from "bcrypt"



const compareOtp = async (otp, hashedOtp)=>{
    return await bcrypt.compare(otp, hashedOtp)
}

export default compareOtp