import React, { useState } from 'react'
import classNames from 'classnames/bind';
import axios from 'axios';
import { useHistory } from "react-router-dom";


import {
    Typography,
    Button,
    Form,
    Input,
    DatePicker,
    Select
} from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/account.actions.js';
import parseJwt from '../../utils/jwtDecode.utils.js'
import styles from './styles/admin.module.scss';

let cx = classNames.bind(styles);

const LoginadminLayout = () => {
    const dispatch = useDispatch();
    const { Title } = Typography;
    const history = useHistory();

    const [sendOTP, setSendOTP] = useState(false);
    const [data, setData] = useState({
        Email: '', otp: ''
    })


    const handleSendMail = async () => {
        try {
            const email = data.Email;
            console.log(email)
            const response = await axios.post(`REACT_APP_MANAGEMENT_APIaccounts/sendMail`, { email });
            if (response.status) {
                setSendOTP(true)
                toast.success('Gửi mail thành công. Vui lòng nhập mã OTP để xác nhận', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });

            }

        } catch (error) {
            console.log('error.data:', error.data)

            if (error.response) {
                console.log(error.response)
                toast.error(error.response.data.error, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
            else {
                toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
        }
    }

    const handleSendOTPLogin = async () => {
        try {
            const otp = data.otp;
            const response = await axios.post(`REACT_APP_MANAGEMENT_APIaccounts/sendOTP`, { otp });
            if (response.data.success) {
                let token = response.data.token;
                const DataAccount = parseJwt(token);
                const JsonDataAccount = JSON.stringify(DataAccount)
                localStorage.setItem("DataAccount", JsonDataAccount);
                console.log(DataAccount)
                setTimeout(() => {
                    // window.location.reload();
                    const dataAccount = localStorage.getItem("DataAccount")

                    if (dataAccount) {
                        if (dataAccount) {
                            dispatch(loginSuccess(dataAccount));
                        }
                    }
                }, 1000);
                history.push('/admin/dashboard');
                toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });

            }
        } catch (error) {
            console.log('error.data:', error.data)

            if (error.response) {
                console.log(error.response)
                toast.error(error.response.data.error, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
            else {
                toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
        }
    }


    const handleChange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };


    return (
        <div className='container' style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            position: 'relative',
            right: '20vh',
            backgroundImage: 'url(https://www.younetgroup.com/wp-content/uploads/2023/03/S8-1536x1117-1.png)',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className={cx('login')}>
                <div>

                </div>
                <Title level={3}>Đăng nhập ADMIN</Title>
                <Form style={{ width: 600, }}
                    initialValues={{ remember: true, }}
                    autoComplete="off">
                    <Title level={5} style={{ color: 'black' }}>Email của bạn</Title>
                    <Form.Item name='Email' id='Email' onChange={handleChange}
                        style={{ backgroundColor: 'white' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email của bạn',
                            },
                        ]}>
                        <Input
                            disabled={sendOTP}
                            style={{ padding: '10px', fontSize: '15px', backgroundColor: 'white', borderRadius: '7px' }} />
                    </Form.Item>
                    <Form.Item >
                        <button disabled={sendOTP} onClick={() => handleSendMail()} className={cx('btn')}>Gửi Mail xác nhận</button>
                    </Form.Item>
                    {
                        sendOTP ?
                            <>
                                <Title level={5}>Nhập OTP</Title>
                                <p>Lưu ý mã OTP chỉ có hiệu lực trong vòng 5 phút</p>
                                <Form.Item name='otp' id='otp' onChange={handleChange}

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu của bạn',
                                        },
                                    ]} >
                                    <Input.Password style={{ padding: '10px', fontSize: '15px', backgroundColor: 'white' }} />
                                </Form.Item>

                                <Form.Item >
                                    <button onClick={() => handleSendOTPLogin()} className={cx('btn')}>Đăng nhập</button>
                                </Form.Item>
                            </>
                            : null
                    }
                </Form>

            </div>

        </div>
    )
}

export default LoginadminLayout



