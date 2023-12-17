const MYSQL = require('../configs/database.js');
const nodemailer = require("nodemailer");

let cartService = {};

cartService.createNewOrder = async (CustomerID) => {
    try {
        const sql = 'CALL InsertOrder(?)';
        const values = [CustomerID];
        const result = await MYSQL.query(sql, values);
        return result.affectedRows > 0;
    } catch (e) {
        console.log(e);
    }
}

cartService.checkOrderCustomer = async (CustomerID) => {
    try {
        const sql = 'CALL CheckCustomerIDExist(?)';
        const values = [CustomerID];
        const result = await MYSQL.query(sql, values);
        return result[0][0].Result === 0;

    } catch (e) {
        console.log(e);
        return false;
    }
};

cartService.getIDCustomer = async (OrderID) => {
    try {
        const sql = 'CALL GetIDCustomer(?)';
        const values = [OrderID];
        const result = await MYSQL.query(sql, values);
        return result[0][0];

    } catch (e) {
        console.log(e);
        return false;
    }
};


cartService.getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

cartService.generateOTP = (length) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += cartService.getRandomInt(0, 9);
    }
    return otp;
}

cartService.checkTimeOTP = (time, email) => {
    try {
        setTimeout(async () => {
            const OTP = 'null';
            const sql = `CALL CheckTimeSendEmailCart(?,?)`;
            const values = [email, OTP];
            const result = await MYSQL.query(sql, values);
            console.log(result)
            console.log(`OTP của ${email} đã được RESET`)

            if (result.affectedRows >= 1) {
                return;
            }
        }, 1000 * 60 * time);
    } catch (e) {
        console.log(e);
    }
};

cartService.resetOTP = async (email) => {
    try {
        const OTP = 'null';
        const sql = `CALL CheckTimeSendEmailCart(?,?)`;
        const values = [email, OTP];
        const result = await MYSQL.query(sql, values);
        console.log(result)
        console.log(`OTP của ${email} đã được RESET`)

        if (result.affectedRows >= 1) {
            return;
        }

    } catch (e) {
        console.log(e)
    }
}


cartService.generateOneTimePassword = async (email) => {
    try {
        const OTP = cartService.generateOTP(6);
        const sql = `CALL CheckTimeSendEmailCart(?,?)`;
        const values = [email, OTP];
        const result = await MYSQL.query(sql, values);
        console.log(result)
        if (result != null) {
            cartService.sendMail(email, OTP);
            cartService.checkTimeOTP(3, email);
            return OTP;
        }
    } catch (e) {
        console.log(e);
    }
};

cartService.addNewPayment = async (PaymentCode, PaymentType, CustomerID, AccountID, Status, CreateAt, Total) => {
    try {
        const sql = `CALL AddNewPayment(?,?,?,?,?,?,?)`;
        const values = [PaymentCode, PaymentType, CustomerID, AccountID, Status, CreateAt, Total];
        const result = await MYSQL.query(sql, values);
        const PaymentID = result[0][0].PaymentID
        if (result != null) {
            return PaymentID;
        }
        else {
            return null
        }
    } catch (e) {
        console.log(e);
    }
};
cartService.addPaymentDetail = async (PaymentID, ProductList) => {
    try {
        const promises = ProductList.map(async (item, key) => {
            const { ProductID, Quantity, totalPrice } = item;
            const sql = `CALL InsertPaymentDetail(?,?,?,?)`;
            const values = [PaymentID, ProductID, Quantity, totalPrice];

            try {
                const result = await MYSQL.query(sql, values);
                console.log(result);
                return result != null;
            } catch (queryError) {
                console.log('Lỗi câu truy vấn:', queryError);
                return false;
            }
        });
        const results = await Promise.all(promises);
        const isSuccess = results.every(result => result);
        return isSuccess;
    } catch (e) {
        console.log(e);
        return false;
    }
};

cartService.deleteOrderPayment = async (OrderID) => {
    try {
        console.log(OrderID)
        const sql = `CALL DeleteOrder(?)`;
        const values = [OrderID];
        const result = await MYSQL.query(sql, values);
        console.log('DeleteOrderPayment:', result)
        if (result.affectedRows >= 1) {
            return true;
        }
        else {
            return false;
        }
    } catch (e) {
        console.log(e);
    }
};

cartService.updateQuantityStock = async () => {
    try {

    } catch (e) {
        console.log(e);
    }
};


cartService.sendMail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "thanhhaivevo@gmail.com",
            pass: "vgab wcrk ewph wvsn",
        },
    });

    await transporter.sendMail({
        from: 'ĐÔNG NAM Á EMAIL',
        to: email,
        subject: "XÁC NHẬN MUA HÀNG",
        text: ` `,
        html: `
        <div>
            <p>Đây là mã OTP xác nhận mua hàng : <span style='color:red'>${otp}</span></p>
            <p>Vui lòng không tiết lộ mã OTP</p>
            <p>Mã có hiệu lực trong 3 phút</p>

        </div>
        
        `,
    });
};


module.exports = cartService;
