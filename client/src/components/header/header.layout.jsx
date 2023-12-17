import React, { useState, useEffect } from 'react';
import { Route, NavLink, useHistory } from 'react-router-dom';
import {
    Avatar,
    Badge,
    Input,
    Modal
} from 'antd';

import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import InputLayout from '../input/input.layout';
import AuthpageLayout from '../../pages/authpages/authpage.layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let cx = classNames.bind(styles);
const HeaderLayout = () => {
    const history = useHistory();
    const [activeNavLink, setActiveNavLink] = useState(null);

    const handleNavLinkClick = (navLink) => {
        setActiveNavLink(navLink);
    };

    const [DataCustomer, setDataCustomer] = useState({})
    const [QuantityOrder, setQuantityOrder] = useState(0)

    const [isAuth, setIsAuth] = useState(false);

    const showOrHideAuth = () => {
        setIsAuth(true)
    }

    const hideAuth = () => {
        setIsAuth(false)

    };

    const goToCart = () => {
        history.push('/cart')
    }

    const logoutCustomer = () => {
        try {
            localStorage.removeItem('CustomerAccount')
            window.location.reload()

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const dataCustomer = localStorage.getItem('CustomerAccount');
        const JsonCustomer = JSON.parse(dataCustomer);

        const orderData = localStorage.getItem('OrderDetail');
        const JsonOrderData = JSON.parse(orderData);

        const lengthOrder = JsonOrderData ? JsonOrderData.length : 0;
        setQuantityOrder(lengthOrder);

        if (DataCustomer !== '') {
            setDataCustomer(JsonCustomer);
        }
    }, []);

    return (
        <div className={cx('wapper_header')}>
            {
                isAuth ?
                    <Modal open={isAuth} footer={null}>
                        <AuthpageLayout hideAuth={hideAuth} />
                    </Modal> : null
            }
            <div className={cx('contact_info')}>
                <div className={cx('contact_info_phone')}>
                    <i className="fa-solid fa-square-phone-flip"></i>
                    <span>0906657743</span>
                    <i style={{ marginLeft: '2vh' }} className="fa-solid fa-envelope"></i>
                    <span>dongnama@gmail.com</span>
                </div>
                {
                    !DataCustomer ?
                        <div className={cx('button_auth')}>

                            <button onClick={() => showOrHideAuth()}>
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                <span>Đăng nhập</span>
                            </button>


                        </div>
                        :
                        <div className={cx('wapper_name_auth')}>
                            <div className={cx('name_auth')}>
                                <span><i className="fa-regular fa-user"></i>{DataCustomer.FullName}</span>
                            </div>
                            <button onClick={() => logoutCustomer()} className={cx('btn_logout')}>
                                <span><i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</span>
                            </button>
                        </div>
                }
            </div>

            <div className={cx('logo_input')}>
                <div className={cx('logo')}>
                    <NavLink
                        exact
                        to='/homepage'
                        className={cx('navbar', { active: activeNavLink === 'homepage' })}
                        onClick={() => handleNavLinkClick('homepage')}
                    >
                        <span> <span style={{ color: '#ff1d63' }}>DONG</span>NAMA</span>

                    </NavLink>
                </div>
                <div className={cx('info_shop')}>
                    <NavLink
                        exact
                        to='/productpage/allproduct'
                        className={cx('navbar', { active: activeNavLink === 'productpage/allproduct' })}
                        onClick={() => handleNavLinkClick('productpage/allproduct')}
                    >
                        <div className={cx('title')}>
                            <span>
                                <i className="fa-solid fa-box-open"></i>
                            </span>
                            <span>Danh sách sản phẩm</span>

                        </div>
                    </NavLink>

                </div>
                <div className={cx('input_find_product')}>
                    <input placeholder='Tìm kiếm sản phẩm...' type='text' className={cx('input_find_product_text')} />
                    <button>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className={cx('btn_cart')}>
                    <button onClick={() => goToCart()}>
                        <Badge color='white' style={{ border: 'none', color: 'black' }} size='default' count={QuantityOrder} offset={[-8, -4]}>
                            <i style={{ color: 'white', marginRight: '2vh' }} className="fa-solid fa-cart-shopping"></i>

                        </Badge>
                        <span>Giỏ hàng</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderLayout