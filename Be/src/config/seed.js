require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const User = require('../models/user');

const seedAdmin = async () => {
    try {
        const adminEmail = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (!adminEmail) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);
            await User.create({
                name: process.env.ADMIN_NAME,
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                role: 'ADMIN'
            })
            console.log("[SEED] Tạo Admin thành công");
        }
        else {
            console.log("[SEED] Đã có Admin tồn tại, không cần tạo mới");
        }
    } catch (error) {
        console.error('Error occurred while seeding admin:', error);
    }
}

module.exports = seedAdmin;