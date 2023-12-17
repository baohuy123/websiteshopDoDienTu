const express = require('express');
const productController = require('../../controllers/product.controller.js')
const router = express.Router();

router.post('/addNewProduct', productController.addNewProduct); //Tạo sản phẩm mới
router.post('/addBrand', productController.addBrand); //Tạo mới thương hiệu
router.get('/getAllCategory', productController.getAllCategory); //Lấy tất cả thể loại
router.get('/getAllBrand', productController.getAllBrand); //lấy tất cả thương hiệu
router.post('/addNewSupplier', productController.addNewSupplier); //Thêm nhà cung cấp
router.get('/getListSupplier', productController.getListSupplier); //Lấy tất cả nhà cung cấp
router.get('/getListProduct', productController.getListProduct); //Tạo sản phẩm mới
router.post('/createPromotion', productController.createPromotion); //Tạo mã khuyến mãi
router.post('/getDetailProduct', productController.getDetailProduct); //Lấy chi tiết sản phẩm
router.get('/getAllImportoder', productController.getAllImportoder); // Lấy danh sách đơn nhập hàng vào kho
router.get('/getstock', productController.getstock); // Lấy danh sách kho
router.post('/getDetailImportProduct', productController.getDetailImportProduct); // Lấy danh sách chi tiet đơn nhập hàng vào kho
router.post('/importOrderInStock', productController.importOrderInStock); // Nhập hàng về kho tổng
router.post('/checkPromotion', productController.checkPromotion); //Kiểm tra mã khuyễn mãi và trả về giảm giá




router.post('/checkStockProduct', productController.checkStockProduct); // Kiểm tra xem kho tổng có hàng chưa
router.post('/getQuantityImportOrder', productController.getQuantityImportOrder); // Lấy số lượng đơn hàng đang chờ nhập vào kho tổng
router.post('/importProductInDistributionStockDetail', productController.importProductInDistributionStockDetail); // Nhập hàng vào kho phân phối thông qua ID của kho phân phối
router.post('/getProductInDistributionStockDetail', productController.getProductInDistributionStockDetail); // Lấy danh sách toàn bộ thông tin sản phẩm của kho phân phối thông qua ID Kho phân phối
router.post('/distributeStockToWarehouses', productController.distributeStockToWarehouses); // Lấy danh sách toàn bộ thông tin sản phẩm của kho phân phối thông qua ID Kho phân phối

router.post('/editProduct',); //Chỉnh sửa sản phẩm
router.post('/deleteProduct',); //Xóa sản phẩm
router.post('/editBrand',); //Chỉnh sửa thương hiệu 
router.post('/editPromotion',); //Chỉnh sửa mã khuyến mãi
router.post('/deletePromotion',); //Xóa mã khuyến mãi
router.post('/editSupplier',); //Chỉnh sửa nhà cung cấp

module.exports = router;
