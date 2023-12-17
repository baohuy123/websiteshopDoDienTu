const express = require('express');
const customerController = require('../../controllers/customer.controller.js');
const router = express.Router();


//TASK CHƯA LÀM
router.post('/createNewCustomer', customerController.createNewCustomer);//Tạo mới tài khoản khách hàng
router.post('/loginCustomer', customerController.loginCustomer);//Đăng nhập tài khoản khách hàng
router.get('/getListCustomer', customerController.getListCustomer);//Lấy danh sách khách hàng
router.post('/getDataCustomerByID', customerController.getDataCustomerByID);//Lấy danh sách khách hàng

router.post('/createComment',);//Tạo bình luận
router.post('/deleteComment',);//Xóa bình luận
router.post('/editComment',);//Chỉnh sửa  bình luận


module.exports = router;
