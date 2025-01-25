import nodemailer from 'nodemailer'
import path from 'path';
import ejs from 'ejs';
require('dotenv').config();

interface Options {
    subject: string,
    email: string,
    template: string,
    data: Record<string, any>
}

export const sendMail = async (options: Options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        logger: true,
        debug: true,
    })

    const {subject, email, data, template} = options;
    const templatePath = path.join(__dirname, "../mails", template);
    const html: string = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html,
    }

    await transporter.sendMail(mailOptions);

}