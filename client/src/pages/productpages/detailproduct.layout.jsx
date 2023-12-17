import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './styles/detailproduct.module.scss';
import { Col, Row } from 'antd';
import { formatVND } from '../../utils/services.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let cx = classNames.bind(styles);
const DetailproductLayout = () => {

    const history = useHistory();
    const location = useLocation();
    const { data } = location.state || {};

    const [DataCustomer, setDataCustomer] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(data);
    const [quantityProductInStock, setQuantityProductInStock] = useState(0)

    const handleChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 100) {
            setQuantity(newQuantity);
        }
    };

    const returnPage = () => {
        history.push('/productpage/allproduct');
    }

    const checkQuantityStockProduct = async () => {
        try {
            const productID = product.ProductID;
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/carts/getAllProductInStock`, { productID });
            console.log('checkQuantityStockProduct:', response)
            if (response.status === 200) {
                return true
            }
        } catch (e) {
            if (e.response.data.error) {
                return false;
            }
        }
    }

    const addCart = async () => {
        try {
            const resutQuantityProductInStock = await checkQuantityStockProduct();
            console.log(resutQuantityProductInStock)
            if (!resutQuantityProductInStock) {
                toast.error(`Sản phẩm này hết hàng trong kho hàng phân phối`, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                return;
            }
            if (!DataCustomer) {
                toast.error(`Vui lòng đăng nhập tài khoản để thêm giỏ hàng`, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                return;
            }
            else {
                const DataCart = {
                    ProductID: product.ProductID,
                    Quantity: quantity,
                    CustomerID: DataCustomer.CustomerID,
                };
                console.log(DataCart)
                const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/carts/addCart`, DataCart);

                if (response.data.success) {
                    toast.success(`Thêm ${product.NameProduct.toUpperCase()} vào giỏ hàng thành công`, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                    toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });

                }
            }
        } catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        const dataCustomer = localStorage.getItem("CustomerAccount")
        const JsonCustomer = JSON.parse(dataCustomer)


        if (DataCustomer != '') {
            setDataCustomer(JsonCustomer)
        }
    }, []);

    return (
        <div className={cx('detailproduct')}>
            <div className={cx('titler_product')}>
                <span className={cx('titler_product_text')}> Tên sản phẩm : <span>{product.NameProduct.toUpperCase()}</span></span>
                <div className={cx('btn_titler_product')}>
                    <button>
                        <i className="fa-regular fa-heart"></i>
                        <span> Yêu thích</span>
                    </button>
                    <button onClick={() => returnPage()} className={cx('button_return')}>
                        <i className="fa-solid fa-rotate-left"></i>
                        <span> Quay lại</span>
                    </button>
                </div>
            </div>
            <Row className={cx('center')}>
                <Col span={15} className={cx('left')}>
                    <div className={cx('img')}>
                        <img src={`${process.env.REACT_APP_MANAGEMENT_API_IMG}/product/${product.ImgProduct}`} alt={data.NameProduct} />
                    </div>
                </Col>
                <Col span={7} className={cx('right')}>

                    <div className={cx('price')}>
                        <span>Giá : {formatVND(product.PriceProduct)}</span>
                    </div>

                    <div className={cx('btn_buy')}>
                        <input
                            className={cx('btn_buy_now')}
                            id='quantity'
                            name='quantity'
                            onChange={handleChange}
                            placeholder='Số lượng'
                            type='number'
                            max={100}
                            min={1}
                            value={quantity}
                        />
                        <button onClick={() => addCart()} className={cx('btn_buy_add_cart')}>Thêm giỏ hàng</button>
                    </div>
                    <div className={cx('desc_one')}>
                        <p>Thương hiệu: <span>{product.NameBrand}</span></p>
                    </div>
                    <div className={cx('desc_tow')}>
                        <p>Xuất xứ: <span>{product.NationalProduct}</span></p>
                    </div>
                    <div className={cx('desc_tow')}>
                        <p>Mẫu mã: <span>{product.Model}</span></p>
                    </div>
                    <div className={cx('desc_tow')}>
                        <p>Màu sắc: <span>{data.Color}</span></p>
                    </div>
                    <div className={cx('desc_tow')}>
                        <p>Năm sản xuất: <span>{product.LaunchYear}</span></p>
                    </div>
                    <div className={cx('desc_tow')}>
                        <p>Bảo hành: <span>{product.Guarantee}</span></p>
                    </div>
                    <div className={cx('desc_tow')}>
                        <p>Năm sản xuất: <span>{product.LaunchYear}</span></p>
                    </div>
                    <div className={cx('desc_tow')}>
                        <p>Trọng lượng: <span>{product.Mass}</span></p>
                    </div>
                    <div className={cx('desc_tow')}>
                        <p>Kích thước: <span>{product.Size}</span></p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DetailproductLayout