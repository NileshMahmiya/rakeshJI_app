import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const mailTransporter = nodemailer.createTransport({
    // Bypasses Render's internal DNS IPv6 routing restrictions
    host: "142.250.115.108", 
    port: 465,
    secure: true, 
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
    tls: {
        // Keeps the secure SSL certificate handshake valid for Gmail
        servername: "smtp.gmail.com",
    },
    family: 4,
    connectionTimeout: 30000,
    socketTimeout: 30000
});

export default mailTransporter;