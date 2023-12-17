const express = require('express');
const cartController = require('../../controllers/cart.controller.js');
const router = express.Router();


//TASK CHƯA LÀM
router.post('/addCart', cartController.addCart);//Thêm mới giỏ hàng
router.get('/getAllDistributionStock', cartController.getAllDistributionStock);//Lấy khuc vực kho
router.post('/getAllProductInStock', cartController.getAllProductInStock);//Lấy số lượng sản phẩm trong kho
router.post('/getAllCartProduct', cartController.getAllCartProduct);//Lấy thông tin giỏ hàng
router.post('/deleteProductInCartByID', cartController.deleteProductInCartByID);//Xóa sản phẩm giỏ hàng theo ProductID
router.post('/addQuantityProduct', cartController.addQuantityProduct);//Tăng số lượng của 1 sản phẩm trong cart
router.post('/subtractionQuantityProduct', cartController.subtractionQuantityProduct);//Giảm số lượng của 1 sản phẩm trong cart
router.post('/deleteAllProductInCart', cartController.deleteAllProductInCart);//Xóa hết sản phẩm trong giỏ hàng
router.post('/sendMail', cartController.sendMail);//Gửi Mail xác nhận mua hàng
router.post('/sendOTP', cartController.sendOTP);//Send OTP để hoàn tất mua hàng

router.get('/getListPayment', cartController.getListPayment);//Lấy danh sách đơn hàng thanh toán
router.post('/updateStatusPayment', cartController.updateStatusPayment);//Cập nhật trang thái đơn hàng

module.exports = router;
