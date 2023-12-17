const MYSQL = require('../configs/database.js');
const nodemailer = require("nodemailer");

let accountService = {};

accountService.passwordValidator = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
};

accountService.checkExistEmailAccount = async (Email) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM accounts WHERE Email = ?';
        const values = [Email];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (e) {
        console.log(e);
    }
}

accountService.checkExistPhoneNumberAccount = async (Phone) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM accounts WHERE Phone = ?';
        const values = [Phone];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (e) {
        console.log(e);
    }
}

accountService.getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

accountService.generateOTP = (length) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += accountService.getRandomInt(0, 9);
    }
    return otp;
}

accountService.checkTimeOTP = (time, email) => {
    try {
        setTimeout(async () => {
            const OTP = 'null';
            const sql = `UPDATE accounts SET Password = ? WHERE Email = ?`;
            const values = [OTP, email];
            const result = await MYSQL.query(sql, values);
            console.log(result)
            console.log(`OTP của ${email} đã được RESET`)

            if (result.affectedRows >= 1) {
                return;
            }
        }, 1000 * 60 * time);
    } catch (e) {
        console.log(e);
    }
};


accountService.generateOneTimePassword = async (email) => {
    try {
        const OTP = accountService.generateOTP(6);
        const sql = `UPDATE accounts SET Password = ? WHERE Email = ?`;
        const values = [OTP, email];
        const result = await MYSQL.query(sql, values);

        if (result.affectedRows >= 1) {
            accountService.sendMail(email, OTP);
            accountService.checkTimeOTP(1, email);
            return OTP;
        }
    } catch (e) {
        console.log(e);
    }
};

accountService.sendMail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "thanhhaivevo@gmail.com",
            pass: "vgab wcrk ewph wvsn",
        },
    });

    await transporter.sendMail({
        from: 'ĐÔNG NAM Á EMAIL',
        to: email,
        subject: "XÁC NHẬN TÀI KHOẢN",
        text: ` `,
        html: `<b>XÁC NHẬN TÀI KHOẢN : ${otp}</b>`,
    });
};



module.exports = accountService;
