const accountService = require('../services/accounts.services.js');
const jwt = require('jsonwebtoken');
const MYSQL = require('../configs/database.js');
const validator = require("email-validator");


let accountController = {};

accountController.getListAccount = async (req, res) => {
    try {
        const sql = 'CALL GetAllAccounts()';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy danh sách nhân viên',
                accountData: result
            });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

accountController.getListDepartment = async (req, res) => {
    try {
        const sql = 'CALL GetAllDepartment()';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy danh sách phòng ban',
                departmentData: result
            });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

accountController.lockAccount = async (req, res) => {
    try {
        const { AccountID } = req.body;
        if (AccountID != null) {
            try {
                const IsBanned = 1;
                const sql = `CALL LockAccount(?,?)`;
                const values = [AccountID, IsBanned];
                const result = await MYSQL.query(sql, values);

                if (result.affectedRows >= 1) {
                    res.status(200).json({
                        success: 'Khóa tài khoản thành công'
                    });
                    return;
                }
            } catch (error) {
                console.error('LỖI [accountController.lockAccount]:', error.message);
                throw error;
            }
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

accountController.unLockAccount = async (req, res) => {
    try {
        const { AccountID } = req.body;
        if (AccountID != null) {
            try {
                const IsBanned = 0;
                const sql = `CALL UnLockAccount(?,?)`;
                const values = [AccountID, IsBanned];
                const result = await MYSQL.query(sql, values);

                if (result.affectedRows >= 1) {
                    res.status(200).json({
                        success: 'Mở khóa tài khoản thành công'
                    });
                    return;
                }
            } catch (error) {
                console.error('LỖI [accountController.unLockAccount]:', error.message);
                throw error;
            }
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

accountController.editAccount = async (req, res) => {
    try {
        const { AccountID, Email, FullName, Address, Phone, DepartmentID } = req.body;
        if (!Email || Email.trim().length === 0 && !FullName || FullName.trim().length === 0
            && !Address || Address.trim().length === 0

        ) {
            res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
            return;
        } else if (Phone.length != 10) {
            res.status(400).json({ error: 'Số điện thoại phải đủ 11 số' });
            return;
        }
        const validatorEmail = validator.validate(Email);
        if (!validatorEmail) {
            return res.status(400).json({ error: 'Email của bạn vừa nhập không đúng định dạng !' });
        }
        const EmailAccountExists = await accountService.checkExistEmailAccount(Email);
        if (EmailAccountExists) {
            res.status(500).json({ error: 'Email này đã tồn tại!' });
            return;
        }
        const phoneNumberExists = await accountService.checkExistPhoneNumberAccount(Phone);
        if (phoneNumberExists) {
            res.status(500).json({ error: 'Số điện thoại này đã tồn tại!' });
            return;
        } else {
            try {
                const sql = `CALL UpdateAccount(?,?,?,?,?,?)`;
                const values = [AccountID, Email, FullName, Address, Phone, DepartmentID];
                const result = await MYSQL.query(sql, values);

                if (result.affectedRows >= 1) {
                    res.status(200).json({
                        success: `Chỉnh sửa thành công tài khoản tên : ${FullName}`
                    });
                    return;
                }
            } catch (error) {
                console.error('LỖI [accountController.editAccount]:', error.message);
                throw error;
            }
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

accountController.createNewAccount = async (req, res) => {
    try {
        const { Email, FullName, Address, Phone, DepartmentID } = req.body;

        console.log(Email, FullName, Address, Phone, DepartmentID)

        if (!Email || Email.trim().length === 0 && !FullName || FullName.trim().length === 0
            && !Address || Address.trim().length === 0 && !Phone || Phone.trim().length === 0

        ) {
            res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
            return;
        } else if (Phone.length != 10) {
            res.status(400).json({ error: 'Số điện thoại phải đủ 11 số' });
            return;
        }
        const validatorEmail = validator.validate(Email);
        if (!validatorEmail) {
            return res.status(400).json({ error: 'Email của bạn vừa nhập không đúng định dạng !' });
        }
        const EmailAccountExists = await accountService.checkExistEmailAccount(Email);
        if (EmailAccountExists) {
            res.status(500).json({ error: 'Email này đã tồn tại!' });
            return;
        }
        const phoneNumberExists = await accountService.checkExistPhoneNumberAccount(Phone);
        if (phoneNumberExists) {
            res.status(500).json({ error: 'Số điện thoại này đã tồn tại!' });
            return;
        } else {
            try {
                const Password = 'null';
                const Reward = 0;
                const Avatar = 'avatar1.png';
                const IsBanned = 0;

                const sql = `CALL CreateNewAccount(?, ?, ?, ?, ?, ?, ?, ?,?)`;
                const values = [Email, Password, FullName, Address, Phone, Avatar, Reward, DepartmentID, IsBanned];
                const result = await MYSQL.query(sql, values);

                if (result.affectedRows >= 1) {
                    res.status(200).json({
                        success: 'Tạo tài khoản nhân viên mới thành công'
                    });
                    return;
                }
            } catch (error) {
                console.error('LỖI [accountController.createNewAccount]:', error.message);
                throw error;
            }
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Đã xảy ra lỗi', e });
    }
}

accountController.sendMail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Email send mail:', email)
        const validatorEmail = validator.validate(email);
        if (!validatorEmail) {
            return res.status(500).json({ error: 'Email của bạn vừa nhập không đúng định dạng !' });
        }

        if (!email || email.trim().length === 0) {
            return res.status(500).json({ error: 'Vui lòng điền đầy đủ thông tin' });
        }

        const values = accountService.generateOneTimePassword(email);
        if (values != null) {
            return res.status(200).json({ success: 'Gửi mã xác nhận thành công!' });
        }
    } catch (e) {
        console.log('LỖI [accountController.sendMail]:', e.message);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};

accountController.sendOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        console.log('OTP:', otp);

        if (!otp || otp.trim().length === 0) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
        } else {
            try {
                const sql = 'CALL SendOTPAccount(?)';
                const values = [otp];
                const result = await MYSQL.query(sql, values);

                if (result.length > 0) {
                    const { AccountID, Email, FullName, Address, Phone, Avatar, Reward, DepartmentID } = result[0];
                    const token = jwt.sign(
                        { AccountID, Email, FullName, Address, Phone, Avatar, Reward, DepartmentID },
                        'doanchuyennghanh',
                        { expiresIn: '5h' }
                    );
                    res.status(200).json({
                        success: 'Đăng nhập tài khoản hệ thống thành công',
                        token: token,
                    });
                } else {
                    res.status(401).json({ error: 'OTP không hợp lệ hoặc đã hết hạn nhập' });
                }
            } catch (e) {
                console.error('LỖI [accountController.sendOTP]:', e.message);
                res.status(500).json({ error: 'Đã xảy ra lỗi' });
            }
        }
    } catch (e) {
        console.error('LỖI [accountController.sendOTP]:', e.message);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};



accountController.backupDB = async (req, res) => {
    try {
        MYSQL.backupDB();
        res.status(200).json({ success: 'Backup DB thành công' });
    } catch (err) {
        console.error('Backup failed:', err);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}


module.exports = accountController;


