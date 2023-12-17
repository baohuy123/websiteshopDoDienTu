const serviceProduct = require("../services/products.services");
const MYSQL = require('../configs/database.js');
const imagesService = require('../services/images.services.js');
const multer = require('multer');
const util = require('util');

let productController = {};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/product');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});


const upload = multer({ storage: storage, });

const uploadAsync = util.promisify(upload.single('ImgProduct'));

productController.addNewProduct = async (req, res) => {
    try {
        await uploadAsync(req, res);

        const { NameProduct, BrandID, CategoryID, NationalProduct, DescProduct, PriceProduct, Model, Color, LaunchYear, Guarantee, Mass, Size } = req.body;

        const nameProductExists = await serviceProduct.checkExistNameProduct(NameProduct);

        if (nameProductExists) {
            return res.status(500).json({ error: 'Tên sản phẩm này đã tồn tại' });
        }

        if (DescProduct.length > 1000) {
            return res.status(500).json({ error: 'Miêu tả sản phẩm không quá 1000 kí tự' });
        }

        const ImgProduct = req.file ? req.file.filename : null;

        const sql = 'CALL AddNewProduct(?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const values = [NameProduct, BrandID, CategoryID, ImgProduct, NationalProduct, DescProduct, PriceProduct, Model, Color, LaunchYear, Guarantee, Mass, Size];

        const result = await MYSQL.query(sql, values);

        if (result.affectedRows >= 1) {

            return res.status(200).json({ success: `Tạo sản phẩm ${NameProduct} thành công` });
        }
    } catch (error) {
        console.error('Lỗi tạo sản phẩm:', error);
        return res.status(500).json({ error: 'Lỗi tạo sản phẩm' });
    }
};

productController.getAllBrand = async (req, res) => {
    try {
        const sql = 'CALL GetAllBrand()';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công danh sách các thương hiệu',
                brandData: result
            });

        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

productController.getAllCategory = async (req, res) => {
    try {
        const sql = 'CALL GetAllCategory()';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công danh sách các loại hàng',
                categoryData: result
            });

        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

productController.getListSupplier = async (req, res) => {
    try {
        const sql = 'CALL GetAllSupplier()';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công danh sách nhà cung cấp',
                supplierData: result
            });

        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

productController.addBrand = async (req, res) => {
    try {
        const { NameBrand, DescBrand } = req.body;

        if (!NameBrand || NameBrand.trim().length === 0) {
            res.status(400).json({ error: 'Vui lòng điền đầy đủ tên thương hiệu' });
            return;
        } else if (!DescBrand || DescBrand.trim().length === 0) {
            res.status(400).json({ error: 'Vui lòng điền đầy đủ mô tả' });
            return;
        }

        const brandExists = await serviceProduct.checkExistBrand(NameBrand);
        if (brandExists) {
            res.status(500).json({ error: 'Tên thương hiệu này đã tồn tại' });
            return;
        }
        else {
            try {
                const sql = 'CALL AddNewBrand(?, ?)';
                const values = [NameBrand, DescBrand];
                const result = await MYSQL.query(sql, values);
                if (result.affectedRows >= 1) {
                    res.status(200).json({ success: 'Tạo tên thương hiệu thành công' });
                    return;
                }
            } catch (error) {
                console.error('LỖI [productController.addBrand]:', error.message);
                throw error;
            }

        }
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};

productController.addNewSupplier = async (req, res) => {
    try {
        const { SupplierName, SupplierPhone } = req.body;
        if (!SupplierName || SupplierName.trim().length === 0) {
            res.status(400).json({ error: 'Vui lòng điền đầy đủ tên nhà cung cấp' });
            return;
        } else if (!SupplierPhone || SupplierPhone.trim().length === 0) {
            res.status(400).json({ error: 'Vui lòng điền đầy số điện thoại nhà cung cấp' });
            return;
        }
        else if (SupplierPhone.length != 10) {
            res.status(400).json({ error: 'Số điện thoại phải đủ 11 số' });
            return;
        }
        const SupplierNameExists = await serviceProduct.checkExistSupplierName(SupplierName);
        if (SupplierNameExists) {
            res.status(500).json({ error: 'Nhà cung cấp này đã tồn tại' });
            return;
        }
        const SupplierPhoneExists = await serviceProduct.checkExistSupplierPhoneNumber(SupplierPhone);
        if (SupplierPhoneExists) {
            res.status(500).json({ error: 'Số điện thoại nhà cung cấp này đã tồn tại' });
            return;
        }
        else {
            try {
                const sql = 'CALL AddNewSupplier(?, ?)';
                const values = [SupplierName, SupplierPhone];
                const result = await MYSQL.query(sql, values);
                if (result.affectedRows >= 1) {
                    res.status(200).json({ success: 'Tạo nhà cung cấp mới thành công' });
                    return;
                }
            } catch (error) {
                console.error('LỖI [productController.addNewSupplier]:', error.message);
                throw error;
            }
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

productController.createPromotion = async (req, res) => {
    try {
        const { PromotionName, PromotionDesc, PromotionCode, CreateAt, Expired } = req.body;

        if (!PromotionName || PromotionName.trim().length === 0 && !PromotionDesc || PromotionDesc.trim().length === 0 && !PromotionCode || PromotionCode.trim().length === 0
            && !CreateAt || CreateAt.trim().length === 0 && !Expired || Expired.trim().length === 0) {
            res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
            return;
        }
        const PromotionNameExists = await serviceProduct.checkExistPromotionName(PromotionName);
        if (PromotionNameExists) {
            res.status(500).json({ error: 'Tên mã khuyến mãi này đã tồn tại' });
            return;
        }
        const PromotionCodeExists = await serviceProduct.checkExistPromotionCode(PromotionCode);
        if (PromotionCodeExists) {
            res.status(500).json({ error: 'CODE này đã tồn tại' });
            return;
        } else {
            try {
                const sql = 'CALL AddNewPromotion(?, ?,?,?,?)';
                const values = [PromotionName, PromotionDesc, PromotionCode, CreateAt, Expired];
                const result = await MYSQL.query(sql, values);
                if (result.affectedRows >= 1) {
                    res.status(200).json({ success: 'Tạo mã khuyến mãi thành công' });
                    return;
                }
            } catch (error) {
                console.error('LỖI [productController.createPromotion]:', error.message);
                throw error;
            }
        }

    } catch (e) {
        console.log(e)
    }
}

productController.getListProduct = async (req, res) => {
    try {
        const sql = 'CALL GetAllProduct()';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công danh sách các sản phẩm',
                productData: result
            });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};

productController.getDetailProduct = async (req, res) => {
    const { ProductID } = req.body;
    try {
        console.log(ProductID)
        const sql = 'CALL GetProductDetails(?)';
        const values = [ProductID];
        const result = await MYSQL.query(sql, values);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công chi tiết sản phẩm',
                detailProductData: result
            });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

productController.getAllImportoder = async (req, res) => {
    try {
        const sql = 'call GetImportOrder()';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công danh sách các phiếu nhập',
                getAllImportoderData: result
            });

        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

productController.getDetailImportProduct = async (req, res) => {
    try {
        const { ImportOrderID } = req.body;
        const sql = 'CALL getDetailImportProduct(?)';
        const values = [ImportOrderID];
        const result = await MYSQL.query(sql, values);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công danh sách các phiếu nhập',
                getDetailImportProductData: result
            });

        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}


productController.getstock = async (req, res) => {
    try {
        const sql = 'CALL getstocks();';
        const result = await MYSQL.query(sql);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công danh sách các chi tiet phiếu nhập',
                getstockData: result
            });

        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}


productController.importOrderInStock = async (req, res) => {
    try {
        const { importgoodsdetail } = req.body;
        const stock = 1
        const sql = 'CALL ImportOrderInStock(?,?)';
        const values = [stock, JSON.stringify(importgoodsdetail)]
        const result = await MYSQL.query(sql, values);
        console.log(result)

        if (result.affectedRows > 0) {
            res.status(200).json({
                success: 'Nhập hàng về kho tổng thành công',
                importOrderInStockData: result
            });

        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}

productController.checkPromotion = async (req, res) => {
    try {
        const { promocode } = req.body;
        console.log(promocode)
        const sql = 'CALL CheckPromoCode(?)';
        const values = [promocode]
        const result = await MYSQL.query(sql, values);
        const resultPromo = result[0][0]
        if (resultPromo.Result > 0) {
            res.status(200).json({
                success: true,
                result: resultPromo.PromotionName
            });

        }

    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}


////TASK CHƯA LÀM
////TASK CHƯA LÀM
productController.checkStockProduct = async (req, res) => {
    try {
        const sql = 'CALL checkStockProduct(1)';
        const result = await MYSQL.query(sql);
        const isProductIDExists = result[0][0].Result;

        // Sử dụng giá trị để xử lý logic tương ứng
        if (isProductIDExists === 1) {
            res.json({ result: true });
        } else {
            res.json({ result: false });
        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};

productController.getQuantityImportOrder = async (req, res) => {
    //Chỉ lấy lấy số lượng đơn hàng. VD có 4 đơn hàng thì result trả về 4
    try {
        const { ProductID } = req.body; 
        const sql = 'CALL getQuantityImportOrder(?)';
        const values = [ProductID];
        console.log(values);
        const result = await MYSQL.query(sql, values);
        if (result.length > 0) {
            res.status(200).json({
                success: 'Lấy thành công danh sách ',
                getQuantityImportOrderData: result
            });

        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};

productController.importProductInDistributionStockDetail = async (req, res) => {

    //DATA nhận từ client : DistributionStockID (Dùng để chọn đúng mã kho phân phối để insert vào DistributionStockDetail)
    try {
        const sql = 'CALL ImportProductInDistributionStockDetail(?)';
        const values = [];
        const result = await MYSQL.query(sql, values);


    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};

productController.getProductInDistributionStockDetail = async (req, res) => {
    //DATA nhận từ client : DistributionStockID. Dùng nó sanh sánh với DistributionStockID trong DistributionStockDetail để lấy ra thông tin sản phẩm và số lượng
     try {
        const { DistributionStockID } = req.body; 
        const sql = 'CALL GetProductInDistributionStockDetail(?)';
        const values = [DistributionStockID];
        const result = await MYSQL.query(sql, values);
        if (result.length >= 0) {
            res.status(200).json({
                success: 'Lấy thành công danh sách',
                getProductInDistributionStockDetailData: result
            });

        }
    } catch (e) {
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
};

module.exports = productController;

// Phan phoi hang 
productController.distributeStockToWarehouses = async (req, res) => {
    try {
        const { percent1, percent2, percent3, percent4 } = req.body;

        // Kiểm tra tổng của percent1-4 có bằng 100 không
        const totalPercentage = percent1 + percent2 + percent3 + percent4;
        if (totalPercentage !== 100) {
            return res.status(400).json({ error: 'Tổng phần trăm phân phối phải bằng 100%' });
        }

        const sql = 'CALL DistributeStockToWarehouses(?,?,?,?)';
        const values = [percent1, percent2, percent3, percent4];
        const result = await MYSQL.query(sql, values);
            res.status(200).json({
                success: 'Phân phối hàng thành công',
                getDetailImportProductData: result
            });
        
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
}