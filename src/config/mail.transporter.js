import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()

const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
    // Forces IPv4 to bypass the ENETUNREACH IPv6 timeout on cloud environments
    family: 4, 
    connectionTimeout: 30000, // 30 seconds timeout buffer
    socketTimeout: 30000
});

export default mailTransporter;