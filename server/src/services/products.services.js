const MYSQL = require('../configs/database.js');
let serviceProduct = {};

serviceProduct.checkExistBrand = async (nameBrand) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM brands WHERE NameBrand = ?';
        const values = [nameBrand];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (error) {
        console.error('LỖI:', error.message);
        throw error;
    }
}

serviceProduct.checkExistSupplierName = async (SupplierName) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM supplier WHERE SupplierName = ?';
        const values = [SupplierName];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (error) {
        console.error('LỖI:', error.message);
        throw error;
    }
}

serviceProduct.checkExistSupplierPhoneNumber = async (SupplierPhone) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM supplier WHERE SupplierPhone = ?';
        const values = [SupplierPhone];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (error) {
        console.error('LỖI:', error.message);
        throw error;
    }
}

serviceProduct.checkExistNameProduct = async (NameProduct) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM products WHERE NameProduct = ?';
        const values = [NameProduct];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (error) {
        console.error('LỖI:', error.message);
        throw error;
    }
}

serviceProduct.checkExistPromotionName = async (PromotionName) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM promotions WHERE PromotionName = ?';
        const values = [PromotionName];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (error) {
        console.error('LỖI:', error.message);
        throw error;
    }
}

serviceProduct.checkExistPromotionCode = async (PromotionCode) => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM promotions WHERE PromotionCode = ?';
        const values = [PromotionCode];
        const result = await MYSQL.query(sql, values);

        return result[0].count > 0;
    } catch (error) {
        console.error('LỖI:', error.message);
        throw error;
    }
}

module.exports = serviceProduct;
