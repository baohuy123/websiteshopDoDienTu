const MYSQL = require('../configs/database.js');
const cartService = require('../services/carts.services');
const validator = require("email-validator");

let cartController = {};

cartController.addCart = async (req, res) => {
    try {
        const { ProductID, Quantity, CustomerID } = req.body;
        const CheckOrderCustomer = await cartService.checkOrderCustomer(CustomerID);
        if (CheckOrderCustomer) {
            cartService.createNewOrder(CustomerID);
        }
        try {
            const DistributionStockID = 0;
            const GetIDCustomer = await cartService.getIDCustomer(CustomerID)
            const orderID = JSON.stringify(GetIDCustomer);
            let jsonObject = JSON.parse(orderID);
            const OrderID = jsonObject.OrderID;

            const sql = 'CALL InsertOrderDetail(?,?,?,?)';
            const values = [ProductID, Quantity, OrderID, DistributionStockID];
            const result = await MYSQL.query(sql, values);
            if (result.affectedRows > 0) {
                res.status(200).json({
                    success: true
                });
            }
            console.log(result)
        } catch (e) {
            console.log(e)
        }


    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.getAllDistributionStock = async (req, res) => {
    try {
        const sql = 'CALL GetDistributionStock()';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công khu vực phân phối',
                distributionStockData: result
            });
        }

    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.getAllProductInStock = async (req, res) => {
    try {
        const { productID } = req.body;
        const sql = 'CALL GetAllProductInStock()';
        const result = await MYSQL.query(sql);
        if (result[0][0].Product.length > 0) {

            const ProductArray = JSON.parse(result[0][0].Product);
            const isInStock = ProductArray.some(product => product.ProductID === productID && product.Quantity > 0);
            if (isInStock) {
                res.status(200).json({
                    success: 'Sản phẩm còn hàng',
                });
            } else {
                res.status(404).json({
                    error: 'Sản phẩm hết hàng hoặc không tồn tại'
                });
            }

        }

    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.getAllCartProduct = async (req, res) => {
    try {
        const { CustomerID } = req.body;
        const sql = 'SELECT * FROM allinfoordersview WHERE CustomerID = (?);';
        const values = [CustomerID];
        const result = await MYSQL.query(sql, values);
        if (result.length > 0) {
            res.status(200).json({

                success: 'Lấy thành công danh sách sản phảm trong giỏ hàng',
                getAllCartProductData: result
            });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.deleteProductInCartByID = async (req, res) => {
    try {
        const { ProductID } = req.body;
        const sql = 'CALL DeleteProductInCartByID(?)';
        const values = [ProductID];
        const result = await MYSQL.query(sql, values);
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: 'Xóa thành công sản phảm trong giỏ hàng',
            });
        }


    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.addQuantityProduct = async (req, res) => {
    try {
        const { ProductID } = req.body;
        const sql = 'CALL AddQuantityProduct(?)';
        const values = [ProductID];
        const result = await MYSQL.query(sql, values);
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: 'Tăng thành công',
            });
        }


    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.subtractionQuantityProduct = async (req, res) => {
    try {
        const { ProductID } = req.body;
        const sql = 'CALL SubtractionQuantityProduct(?)';
        const values = [ProductID];
        const result = await MYSQL.query(sql, values);
        if (result != null) {
            res.status(200).json({
                success: 'Giảm thành công',
            });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.deleteAllProductInCart = async (req, res) => {
    try {
        const { CustomerID } = req.body;
        const sql = 'CALL DeleteAllProductInCart(?)';
        const values = [CustomerID];
        const result = await MYSQL.query(sql, values);
        if (result.affectedRows > 0) {
            res.status(200).json({
                success: 'Xóa giỏ hàng thành công',
            });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.sendMail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        const validatorEmail = validator.validate(email);
        if (!validatorEmail) {
            return res.status(500).json({ error: 'Email của bạn vừa nhập không đúng định dạng !' });
        }

        if (!email || email.trim().length === 0) {
            return res.status(500).json({ error: 'Vui lòng điền đầy đủ thông tin' });
        }

        const values = cartService.generateOneTimePassword(email);
        if (values != null) {
            return res.status(200).json({ success: 'Gửi mã xác nhận thành công!' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.sendOTP = async (req, res) => {
    try {
        const { DataSendToPayment } = req.body;
        console.log('DATA PAYMENT:', DataSendToPayment);
        if (!DataSendToPayment.TypePayment) {
            return res.status(400).json({ error: 'Vui lòng chọn phương thức thanh toán' });
        }
        if (!DataSendToPayment.OTP) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
        } else {
            try {
                const sql = 'CALL SendOTPPayment(?)';
                const values = [DataSendToPayment.OTP];
                const result = await MYSQL.query(sql, values);
                if (result[0][0].CustomerID) {

                    cartService.resetOTP(DataSendToPayment.Email);
                    const currentDate = new Date();
                    const day = currentDate.getDate();
                    const month = currentDate.getMonth() + 1;
                    const year = currentDate.getFullYear();
                    const DayNow = `${day}/${month}/${year}`;
                    const PaymentCode = (DataSendToPayment.OTP - 1) * DataSendToPayment.CustomerID;
                    const resultAddNewPayment = await cartService.addNewPayment(PaymentCode, DataSendToPayment.TypePayment, DataSendToPayment.CustomerID, null, 'Đang chờ duyệt đơn hàng', DayNow, DataSendToPayment.TotalAmount)

                    if (resultAddNewPayment) {

                        const resultAddDetailPayment = await cartService.addPaymentDetail(resultAddNewPayment, DataSendToPayment.ProductList);
                        if (resultAddDetailPayment) {
                            const orderIDs = Array.from(new Set(DataSendToPayment.ProductList.map(item => item.OrderID)));
                            const deleteListProductAndOrder = await cartService.deleteOrderPayment(orderIDs[0]);
                            if (deleteListProductAndOrder) {
                                res.status(200).json({
                                    success: 'Thanh toán thành công',
                                    PaymentCode: PaymentCode
                                });
                            }
                        }
                    }
                }
            } catch (e) {
                console.error('LỖI [cartController.sendOTP]:', e.message);
                res.status(500).json({ error: 'Đã xảy ra lỗi' });
            }
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

cartController.getListPayment = async (req, res) => {
    try {
        const sql = 'CALL GetListPayment()';
        const result = await MYSQL.query(sql);
        const data = result[0]
        if (result[0][0]) {
            res.status(200).json({
                success: 'success',
                getListPaymentData: data
            });

        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};


//CẬP NHẬT TRIGGER TẠI SERVICES CART
cartController.updateStatusPayment = async (req, res) => {
    try {
        const { DataChangStatus } = req.body;
        let Status;

        if (DataChangStatus.TYPE === 'TYPE_1_SELECT') {
            Status = 'Đơn hàng đã được duyệt';
        } else if (DataChangStatus.TYPE === 'TYPE_2_SELECT') {
            Status = 'Đơn hàng đang đóng gói';
        } else if (DataChangStatus.TYPE === 'TYPE_3_SELECT') {
            Status = 'Đơn hàng đang đến với bạn';
        } else if (DataChangStatus.TYPE === 'TYPE_4_SELECT') {
            Status = 'Đơn hàng đã giao thành công';
        } else if (DataChangStatus.TYPE === 'TYPE_5_SELECT') {
            Status = 'Đơn hàng bị từ chối nhận';
        }
        const IDpayment = DataChangStatus.PaymentID

        const sql = 'CALL UpdateStatusPayment(?,?)';
        const values = [IDpayment, Status];
        const result = await MYSQL.query(sql, values);

        if (result.affectedRows >= 1) {
            if (Status === 'Đơn hàng đã được duyệt') {
                const resultUpdateQuantityStock = await cartService.updateQuantityStock()///HÀM TRIGGER CẬP NHẬT GIÁ TRỊ ĐƠN HÀNG
            }

            res.status(200).json({
                success: 'success'
            });

        }

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};




module.exports = cartController;