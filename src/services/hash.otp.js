import bcrypt from "bcrypt"


const hashOtp = async (otp)=>{
    return await bcrypt.hash(otp,Number(process.env.OTP_SALT));

}


export default hashOtp