const customerServices = require('../services/customers.services.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const MYSQL = require('../configs/database.js');
const validator = require("email-validator");



let customerController = {};

customerController.createNewCustomer = async (req, res) => {
    try {
        const { Email, Password, FullName, Gender, Address, PhoneNumber } = req.body;

        if (!Email || Email.trim().length === 0 || !FullName || FullName.trim().length === 0
            || !Address || Address.trim().length === 0 || !PhoneNumber || PhoneNumber.trim().length === 0) {
            res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
            return;
        } else if (PhoneNumber.length !== 10) {
            res.status(400).json({ error: 'Số điện thoại phải đủ 10 số' });
            return;
        }

        const validatorEmail = validator.validate(Email);
        if (!validatorEmail) {
            return res.status(400).json({ error: 'Email không đúng định dạng!' });
        }

        const emailExists = await customerServices.checkExistEmail(Email);
        if (emailExists) {
            res.status(500).json({ error: 'Email này đã tồn tại!' });
            return;
        }

        const phoneNumberExists = await customerServices.checkExistPhoneNumber(PhoneNumber);
        if (phoneNumberExists) {
            res.status(500).json({ error: 'Số điện thoại này đã tồn tại!' });
            return;
        } else {
            try {
                const Avatar = 'avatar1.png'
                const IsOnline = 0
                const IsBanned = 0
                const FacebookID = ''
                const GoogleID = ''
                const md5Hash = crypto.createHash('md5');

                md5Hash.update(Password);
                const hashedPassword = md5Hash.digest('hex');
                const sql = 'CALL RegisterCustomer(?, ?, ?, ?, ?, ?, ?,?,?,?,?)';
                const values = [Email, hashedPassword, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID];
                const result = await MYSQL.query(sql, values);

                if (result.affectedRows >= 1) {

                    res.status(200).json({
                        success: 'Tạo tài khoản khách hàng mới thành công. Bây giờ bạn hãy đăng nhập',
                    });
                    return;
                }
            } catch (error) {
                console.error('LỖI [accountController.createNewCustomer]:', error.message);
                throw error;
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Đã xảy ra lỗi', e });
    }
};

customerController.loginCustomer = async (req, res) => {
    try {
        const { Email, Password } = req.body;


        if (!Email || Email.trim().length === 0 || !Password || Password.trim().length === 0) {
            res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
            return;
        }

        const validatorEmail = validator.validate(Email);
        if (!validatorEmail) {
            return res.status(400).json({ error: 'Email không đúng định dạng!' });
        } else {
            try {
                const md5Hash = crypto.createHash('md5');

                md5Hash.update(Password);
                const hashedPassword = md5Hash.digest('hex');
                console.log(Email, hashedPassword)

                const sql = 'CALL LoginCustomer(?, ?)';
                const values = [Email, hashedPassword];
                const result = await MYSQL.query(sql, values);

                console.log(result[0][0])
                if (result[0] != '') {
                    const { CustomerID, Email, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID } = result[0][0];

                    const token = jwt.sign(
                        { CustomerID, Email, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID },
                        'doanchuyennghanh',
                        { expiresIn: '100h' }
                    );
                    res.status(200).json({
                        success: `Đăng nhập tài khoản ${FullName} thành công`,
                        dataCustomer: token
                    });
                    return;
                }
            } catch (error) {
                console.error('LỖI [accountController.loginCustomer]:', error.message);
                throw error;
            }
        }


    } catch (e) {
        console.log(e);
    }
}

customerController.getListCustomer = async (req, res) => {
    try {
        const sql = 'CALL GetAllCustomer()';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy danh sách khách hàng',
                customerData: result
            });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

customerController.getDataCustomerByID = async (req, res) => {
    try {
        const { CustomerID } = req.body;
        const sql = 'CALL GetDataCustomerByID(?)';
        const value = [CustomerID];
        const result = await MYSQL.query(sql, value);

        const { Email, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID } = result[0][0];
        const token = jwt.sign(
            { CustomerID, Email, FullName, Gender, Address, Avatar, PhoneNumber, IsOnline, IsBanned, FacebookID, GoogleID },
            'doanchuyennghanh',
            { expiresIn: '100h' }
        );

        if (result.length > 0) {
            res.status(200).json({
                success: 'Cập nhật thông tin thành công',
                customerData: token
            });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

module.exports = customerController;