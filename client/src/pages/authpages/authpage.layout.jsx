import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './auth.module.scss';
import axios from 'axios';
import { Select, Row } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import parseJwt from '../../utils/jwtDecode.utils.js'
import { loginSuccess } from '../../actions/customer.actions.js';

let cx = classNames.bind(styles);
const AuthpageLayout = ({ hideAuth }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [type, setType] = useState(1)

    const [dataLogin, setDataLogin] = useState({
        Email: '', Password: ''
    })

    const [dataRegister, setDataRegister] = useState({
        Email: '', Password: '', FullName: '', Address: '', PhoneNumber: '', Gender: ''
    })

    const handleChangeRegister = (e) => {
        const { name, value } = e.target;
        setDataRegister(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (fieldName, value) => {
        setDataRegister((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setDataLogin(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const changType = (value) => {
        try {
            setType(value);
        } catch (e) {
            console.log(e)
        }
    }

    const hideUIAuth = () => {
        try {
            hideAuth()
        } catch (e) {
            console.log(e)
        }
    }

    const handleRegister = async () => {
        try {
            let SendData = {
                Email: dataRegister.Email,
                Password: dataRegister.Password,
                FullName: dataRegister.FullName,
                Address: dataRegister.Address,
                PhoneNumber: dataRegister.PhoneNumber,
                Gender: dataRegister.Gender,
            }
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/customer/createNewCustomer`, SendData);

            if (response.data.success) {
                toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                setType(2);

            }
        } catch (e) {
            toast.error(e.response.data.error, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            console.log(e.response.data.error);
        }
    }

    const handleLogin = async () => {
        try {
            let SendData = {
                Email: dataLogin.Email,
                Password: dataLogin.Password,
            }
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/customer/loginCustomer`, SendData);
            console.log(response)

            if (response.data.success) {
                toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                history.push('/homepage');
                let token = response.data.dataCustomer;
                const DataCustomer = parseJwt(token);
                const JsonDataCustomer = JSON.stringify(DataCustomer)
                localStorage.setItem("CustomerAccount", JsonDataCustomer);
                setTimeout(() => {
                    const dataCustomer = localStorage.getItem("CustomerAccount")

                    if (dataCustomer) {
                        if (dataCustomer) {
                            dispatch(loginSuccess(dataCustomer));
                        }
                    }
                }, 1000);
                window.location.reload()

                hideAuth();

            }
        } catch (e) {
            toast.error(e.response.data.error, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            console.log(e.response.data.error);
        }
    }


    return (
        <div className={cx('auth')}>
            {
                type === 1 ?
                    <div className={cx('auth_login')}>
                        <div className={cx('title')}>Đăng nhập</div>
                        <form className={cx('form')}>
                            <div className={cx('input')}>
                                <input
                                    type='text'
                                    placeholder='Email của bạn'
                                    id='Email'
                                    name='Email'
                                    onChange={handleChangeLogin}
                                />
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <div className={cx('input')}>
                                <input
                                    type='text'
                                    placeholder='Mật khẩu của bạn'
                                    id='Password'
                                    name='Password'
                                    onChange={handleChangeLogin}
                                />
                                <i className="fa-solid fa-lock"></i>
                            </div>
                        </form>
                        <div className={cx('btn')}>
                            <button onClick={() => changType(2)}>Đăng ký</button>
                            <button onClick={() => handleLogin()}>Đăng nhập</button>

                        </div>
                        <div className={cx('btn_end')}>
                            <button onClick={() => hideUIAuth()}>Hủy</button>
                        </div>
                    </div> : null
            }
            {
                type === 2 ?
                    <div className={cx('auth_register')}>
                        <div className={cx('title')}>Đăng ký</div>
                        <form className={cx('form')}>
                            <div className={cx('input')}>
                                <input
                                    type='text'
                                    placeholder='Email của bạn'
                                    id='Email'
                                    name='Email'
                                    onChange={handleChangeRegister}
                                />
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <div className={cx('input')}>
                                <input
                                    type='text'
                                    placeholder='Mật khẩu của bạn'
                                    id='Password'
                                    name='Password'
                                    onChange={handleChangeRegister}
                                />
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <div className={cx('input')}>
                                <input
                                    type='text'
                                    placeholder='Họ vầ tên của bạn'
                                    id='FullName'
                                    name='FullName'
                                    onChange={handleChangeRegister}
                                />
                                <i className="fa-regular fa-user"></i>
                            </div>
                            <div className={cx('input')}>
                                <input
                                    type='text'
                                    placeholder='Địa chỉ của bạn'
                                    id='Address'
                                    name='Address'
                                    onChange={handleChangeRegister}
                                />
                                <i className="fa-solid fa-map-location-dot"></i>
                            </div>
                            <div className={cx('input')}>
                                <input
                                    type='text'
                                    placeholder='Số điện thoại của bạn'
                                    id='PhoneNumber'
                                    name='PhoneNumber'
                                    onChange={handleChangeRegister}
                                />
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className={cx('input')}>
                                <Select className={cx('select_input')}
                                    defaultValue="Nam giới"
                                    id='Gender' name='Gender' onChange={(value) => handleSelectChange('Gender', value)}
                                    options={[
                                        {
                                            value: 'Nam giới',
                                            label: 'Nam giới',
                                        },
                                        {
                                            value: 'Nữ giới',
                                            label: 'Nữ giới',
                                        },
                                    ]}
                                />

                                <i className="fa-solid fa-transgender"></i>
                            </div>
                        </form>
                        <div className={cx('btn')}>
                            <button onClick={() => changType(1)}>Đăng nhập</button>
                            <button onClick={() => handleRegister()}>Đăng ký</button>

                        </div>
                        <div className={cx('btn_end')}>
                            <button onClick={() => hideUIAuth()}>Hủy</button>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default AuthpageLayout