const nodemailer = require('nodemailer');
require("dotenv").config();


const sendVerificationEmail = async (userEmail, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const url = `http://localhost:5173/verify?token=${token}`;

    await transporter.sendMail({
        from: '"Bênh viện CarePlus" <no-reply@projectff.com>',
        to: userEmail,
        subject: "Xác nhận tài khoản của bạn",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h3>Chào mừng bạn!</h3>
                <p>Nhấn nút bên dưới để xác thực tài khoản của bạn:</p>
                <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #1890ff; color: #ffffff; text-decoration: none; border-radius: 6px;">
                    Xác thực mail
                </a>
                <p style="margin-top: 20px; color: #555;">Nếu khung trên không hoạt động, bạn có thể sao chép và dán đường dẫn sau vào trình duyệt:</p>
                <p style="word-break: break-word;">${url}</p>
            </div>
        `
    });
};

module.exports = { sendVerificationEmail };