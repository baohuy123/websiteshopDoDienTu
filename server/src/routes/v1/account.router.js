const express = require('express');
const accountController = require('../../controllers/account.controller.js');
const router = express.Router();

router.post('/createNewAccount', accountController.createNewAccount);//Tạo mới tài khoản nhân viên
router.get('/getListAccount', accountController.getListAccount);//Tạo mới tài khoản nhân viên
router.post('/sendMail', accountController.sendMail);//Gửi Mail xác nhận đăng nhập
router.post('/sendOTP', accountController.sendOTP);//Gửi Mail xác nhận đăng nhập
router.post('/lockAccount', accountController.lockAccount);//Khóa tài khoản
router.post('/unLockAccount', accountController.unLockAccount);//Mở khóa tài khoản
router.post('/editAccount', accountController.editAccount);//Chỉnh sửa tài khoản
router.get('/getListDepartment', accountController.getListDepartment);//Lấy danh sách phòng ban

router.get('/backupDB', accountController.backupDB);//Backup DATABSE



module.exports = router;
