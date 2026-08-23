import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  return await bcrypt.hash(password, Number(process.env.PASSWORD_SALT));
};


export default hashPassword