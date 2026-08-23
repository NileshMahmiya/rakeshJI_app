import mailTransporter from "../config/mail.transporter.js";



const sendMail = ({to , subject , html})=>{
    return mailTransporter.sendMail({
        from:process.env.GMAIL_USER,
        to,
        subject,
        html
    });
};


export default sendMail
