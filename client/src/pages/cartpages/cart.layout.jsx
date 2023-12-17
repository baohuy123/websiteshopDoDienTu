import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './styles/cart.module.scss';
import axios from 'axios';
import { Col, Row, Table, Checkbox, Tag, Modal } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatVND } from '../../utils/services.js'

let cx = classNames.bind(styles);
const CartLayout = () => {
    const history = useHistory();
    const [cart, setCart] = useState();
    const [TotalAmount, setTotalAmount] = useState(0);
    const [DataCustomer, setDataCustomer] = useState({})

    const [showAcceptOrder, setShowAcceptOrder] = useState(false);

    const [promoRate, setPromoRate] = useState(0);

    const [typePayment, setTypePayment] = useState(0);

    const [sendOTP, setSendOTP] = useState(false);

    const [OTP, setOTP] = useState('');

    const [showPaymentDone, setShowPaymentDone] = useState(false);

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'ImgProduct',
            key: 'ImgProduct',
            render: (text) => <div className={cx('img_table')}>
                <img src={`${process.env.REACT_APP_MANAGEMENT_API_IMG}/product/${text}`} />
            </div>,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'NameProduct',
            key: 'NameProduct',
            render: (text) => <div style={{ width: '20vh' }}>{text.toUpperCase()}</div>,

        },

        {
            title: 'Giá',
            dataIndex: 'PriceProduct',
            key: 'PriceProduct',
            render: (text) => <span>{formatVND(text)}</span>,

        },
        {
            title: 'Số lượng',
            dataIndex: 'Quantity',
            key: 'Quantity',
            render: (text, record) => <div className={cx('btn_quantity')}>
                <button onClick={(ProductID) => addQuantityProduct(record.ProductID)}>+</button>
                <input defaultValue={text} />
                <button onClick={(ProductID) => subtractionQuantityProduct(record.ProductID)}>-</button>
            </div>,

        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => <span>{formatVND(text)}</span>,

        },
        {
            title: 'Tùy chọn',
            key: 'action',
            render: (_, record) => (
                <div className={cx('btn_table')}>
                    {/* <button className={cx('btn_edit')}>Chỉnh số lượng</button> */}
                    <button onClick={(ProductID) => deleteCart(record.ProductID)} className={cx('btn_delete')}>Xoá khỏi giỏ hàng</button>
                </div>
            ),
        },
    ];


    const deleteCart = async (ProductID) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/carts/deleteProductInCartByID`, { ProductID });
            if (response.status === 200) {
                getAllCartProduct(DataCustomer.CustomerID);
                toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }

        } catch (e) {
            console.log(e);
        }
    };

    const getPromoRate = async (e) => {
        try {
            const promocode = e.target.value;
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/products/checkPromotion`, { promocode });
            if (response.status === 200) {
                setPromoRate(response.data.result)
            }

        } catch (e) {
            console.log(e);
        }
    };

    const getAllCartProduct = async (CustomerID) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/carts/getAllCartProduct`, { CustomerID });
            if (response.status === 200) {
                const cartData = response.data.getAllCartProductData;

                const updatedCart = cartData.map(item => {
                    const totalPrice = item.Quantity * item.PriceProduct;
                    return {
                        ...item,
                        totalPrice: totalPrice
                    };
                });
                const totalCartPrice = updatedCart.reduce((total, item) => total + item.totalPrice, 0);

                setTotalAmount(totalCartPrice);
                setCart(updatedCart);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addQuantityProduct = async (ProductID) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/carts/addQuantityProduct`, { ProductID });
            if (response.status === 200) {
                getAllCartProduct(DataCustomer.CustomerID);

            }

        } catch (e) {
            console.log(e);
        }
    }

    const subtractionQuantityProduct = async (ProductID) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}carts/subtractionQuantityProduct`, { ProductID });
            if (response.status === 200) {
                getAllCartProduct(DataCustomer.CustomerID);

            }

        } catch (e) {
            console.log(e);
        }
    }

    const deleteAllProductInCart = async (CustomerID) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/carts/deleteAllProductInCart`, { CustomerID });
            if (response.status === 200) {
                window.location.reload();
                toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });

            }

        } catch (e) {
            console.log(e);
        }
    }

    const sendMail = async () => {
        try {
            const email = DataCustomer.Email;
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/carts/sendMail`, { email });
            console.log(response)
            if (response.status == 200) {
                setSendOTP(true)
                toast.success('Gửi mail thành công. Vui lòng nhập mã OTP để xác nhận', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
        } catch (error) {
            toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });

        }
    }

    const sendOTPToServer = async () => {
        try {
            const DataSendToPayment = {
                OTP: OTP,
                ProductList: cart,
                TypePayment: typePayment,
                TotalAmount: TotalAmount,
                CustomerID: DataCustomer.CustomerID,
                Email: DataCustomer.Email

            }
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/carts/sendOTP`, { DataSendToPayment });
            console.log(response)
            if (response.status == 200) {
                setSendOTP(false)
                toast.success('Thanh toán thành công đơn hàng', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                setShowPaymentDone(true);
                window.location.reload();

            }
        } catch (error) {
            toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });

        }
    }

    const changTypePayment = (values) => {
        setTypePayment(values)
    }

    const onChangeCheckPayment = (e) => {
        if (e.target.checked === true) {
            setShowAcceptOrder(true)
        }
        else {
            setShowAcceptOrder(false)
        }
    };

    useEffect(() => {
        const dataCustomer = localStorage.getItem("CustomerAccount");
        const JsonCustomer = JSON.parse(dataCustomer);

        if (JsonCustomer && JsonCustomer.CustomerID) {
            setDataCustomer(JsonCustomer);
            getAllCartProduct(JsonCustomer.CustomerID);
        }
    }, [promoRate]);


    const getOTPSend = (e) => {
        setOTP(e.target.value);
    };

    const handleClosePaymentDone = () => {
        setShowPaymentDone(false)
    }
    return (

        <div className={cx('cart')}>
            {
                showPaymentDone ?
                    <Modal width={500}
                        open={showPaymentDone} footer={null} >
                        <div className={cx('done_payment')}>
                            <i class="fa-solid fa-circle-check"></i>
                            <h4>Thanh toán đơn hàng thành công</h4>
                            <div className={cx('btn_payment_done')}>
                                <button className={cx('left')} onClick={() => handleClosePaymentDone()}>Đóng</button>
                                <button className={cx('right')} onClick={() => handleClosePaymentDone()}>Xem đơn hàng</button>

                            </div>
                        </div>
                    </Modal> : null
            }
            <Row>
                <Col span={18} push={7} className={cx('left_cart')}>
                    <div className={cx('info_cart')}>
                        <div className={cx('title_cart')}>
                            <span>Thông tin giỏ hàng</span>
                        </div>
                        <div>
                            {
                                !DataCustomer ? <span> Vui lòng đăng nhập để thanh toán</span> : null
                            }
                        </div>
                    </div>

                    <div className={cx('list_cart')}>
                        <div className={cx('top_cart')}>
                            <div className={cx('left')}>
                                <span>Số lượng sản phẩm : <span>{!cart ? 0 : cart.length} sản phẩm</span></span>
                            </div>
                            <div className={cx('right')}>
                                {
                                    DataCustomer && DataCustomer.CustomerID ?
                                        <button onClick={() => deleteAllProductInCart(DataCustomer.CustomerID)}>Xóa sản phẩm khỏi giỏ hàng</button>
                                        : null

                                }
                            </div>
                        </div>
                        <div className={cx('table')}>
                            <Table
                                style={{ padding: '0', marginTop: '2vh', backgroundColor: 'white', borderRadius: '10px', marginLeft: '1vh', }}
                                columns={columns}
                                rowKey="OrderDetailID"
                                dataSource={cart}
                                loading={cart != null ? false : false}
                                pagination={false}
                                components={{
                                    header: {
                                        cell: (props) => <th style={{ backgroundColor: '#f5f5f5', color: 'black', borderRadius: '6px', textAlign: 'center' }}>{props.children}</th>,
                                    },
                                    body: {
                                        cell: (props) => <td style={{ textAlign: 'center' }}>{props.children}</td>
                                    },
                                }} />
                        </div>
                        <div className={cx('total')}>
                            {/* <button className={cx('payment_now_order')}>Thanh toán giỏ hàng này</button> */}
                            <span className={cx('total_text')}>Tổng giá : {formatVND(TotalAmount)}</span>

                        </div>
                    </div>

                </Col>
                <Col span={6} pull={18} className={cx('right_cart')}>
                    {
                        DataCustomer ?
                            <div className={cx('info_payment')}>
                                <div className={cx('title_payment')}>
                                    Thông tin thanh toán
                                </div>
                                <div className={cx('total_product')}>
                                    <i className="fa-solid fa-landmark"></i>
                                    <div className={cx('text_total')}>
                                        <span>Phí giao hàng</span>
                                        <h4>100.000 đ</h4>
                                    </div>
                                </div>
                                <div className={cx('total_product')}>
                                    <i className="fa-regular fa-credit-card"></i>
                                    <div className={cx('text_total')}>

                                        {
                                            promoRate != 0 ?
                                                <h4>
                                                    {formatVND((TotalAmount + 100000) - (TotalAmount * 0.03))}
                                                    <Tag style={{ marginLeft: '1vh', textDecoration: 'line-through' }} color="red">{formatVND(TotalAmount + 100000)}</Tag>
                                                </h4> :
                                                <>
                                                    <span>Tổng tiền</span>
                                                    <h4>
                                                        {formatVND(TotalAmount + 100000)}
                                                    </h4>
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className={cx('total_product')}>
                                    <i className="fa-regular fa-user"></i>
                                    <div className={cx('text_total')}>
                                        <span>Tên của bạn</span>
                                        <h4>{DataCustomer.FullName}</h4>
                                    </div>
                                </div>
                                <div className={cx('total_product')}>
                                    <i className="fa-solid fa-phone"></i>
                                    <div className={cx('text_total')}>
                                        <span>Số điện thoại</span>
                                        <h4>{DataCustomer.PhoneNumber}  </h4>
                                    </div>
                                </div>
                                <div className={cx('total_product')}>
                                    <i className="fa-solid fa-location-arrow"></i>
                                    <div className={cx('text_total')}>
                                        <span>Địa chỉ</span>
                                        <h4>{DataCustomer.Address}</h4>
                                    </div>
                                </div>
                                <div className={cx('total_product')}>
                                    <i className="fa-solid fa-percent"></i>
                                    <div className={cx('text_total')}>
                                        <span>Mã khuyến mãi</span>
                                        <input
                                            type='text'
                                            name='promoCode'
                                            id='promoCode'
                                            placeholder='Nhập mã khuyến mãi'
                                            onChange={(e) => getPromoRate(e)}
                                        />
                                    </div>
                                </div>
                                <div className={cx('option_payment')}>Hình thức thanh toán</div>
                                <div className={cx('btn_payment')}>
                                    <button onClick={() => changTypePayment(1)}
                                        className={cx('payment_vnpay')}
                                        style={{
                                            backgroundColor: `${typePayment === 1 ? 'black' : 'white'}`,
                                            color: `${typePayment === 1 ? 'white' : 'black'}`
                                        }}
                                    >
                                        Tiền mặt
                                    </button>
                                    <button onClick={() => changTypePayment(0)}
                                        className={cx('payment_vnpay')}
                                        style={{
                                            backgroundColor: `${typePayment === 0 ? 'black' : 'white'}`,
                                            color: `${typePayment === 0 ? 'white' : 'black'}`
                                        }}
                                    >
                                        VNPAY
                                    </button>

                                </div>
                                <div className={cx('payment_accept')}>
                                    <Checkbox onChange={onChangeCheckPayment}>

                                    </Checkbox>
                                    <span>Chọn để xác nhận đồng ý thanh toán giỏ hàng</span>
                                </div>
                                {
                                    showAcceptOrder ?
                                        <div className={cx('send_mail_payment_accept')}>
                                            <span>Xác nhận mua hàng</span>
                                            {/* <input
                                                type='text'
                                                name='SendMail'
                                                id='SendMail'
                                                placeholder='Nhập email xác nhận'
                                                disabled={sendOTP}
                                                onChange={(e) => getEmailSend(e)}
                                            /> */}
                                            <button
                                                style={{
                                                    backgroundColor: sendOTP ? 'black' : '',
                                                    color: sendOTP ? 'white' : 'white',
                                                }}
                                                disabled={sendOTP} onClick={() => sendMail()}>Gửi email xác nhận</button>
                                            {
                                                sendOTP ?
                                                    <>
                                                        <input
                                                            type='text'
                                                            name='OTP'
                                                            id='OTP'
                                                            placeholder='Nhập mã OTP xác nhận'
                                                            onChange={(e) => getOTPSend(e)}
                                                        // onChange={(e) => getPromoRate(e)}
                                                        />
                                                        <button onClick={() => sendOTPToServer()}>Xác nhận mua hàng</button>
                                                    </> : null
                                            }
                                        </div> : null
                                }
                            </div> :
                            <div className={cx('info_payment_falselogin')}>
                                <div className={cx('title_payment')}>
                                    Thông tin thanh toán
                                </div>
                                <p>Vui lòng đăng nhập để tiếp tục thanh toán</p>
                            </div>
                    }

                </Col>
            </Row>
        </div>
    )
}

export default CartLayout