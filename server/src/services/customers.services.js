const MYSQL = require('../configs/database.js');
const nodemailer = require("nodemailer");

let customerService = {};

customerService.checkExistEmail = async (email) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM customers WHERE Email = ?';
        const values = [email];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (e) {
        console.log(e);
    }
}

customerService.checkExistPhoneNumber = async (phoneNumber) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM customers WHERE PhoneNumber = ?';
        const values = [phoneNumber];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (e) {
        console.log(e);
    }
}

module.exports = customerService;
