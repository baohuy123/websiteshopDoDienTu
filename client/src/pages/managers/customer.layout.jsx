import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import {
    Typography,
    Space, Table, Tag, Select, Modal, Input
} from 'antd';
import classNames from 'classnames/bind';
import { Bar } from '@ant-design/plots';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/dashboard.module.scss';

let cx = classNames.bind(styles);
const CustomerLayout = () => {
    const { Title } = Typography;
    const [showModalAddNew, setShowModalAddNew] = useState(false);

    const [customer, setCustomer] = useState([]);

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'FullName',
            key: 'FullName',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            render: (text) => <span>{text}</span>,

        },
        {
            title: 'Địa chỉ',
            dataIndex: 'Address',
            key: 'Address',
            render: (text) => <span>{text}</span>,

        },
        {
            title: 'Giới tính',
            dataIndex: 'Gender',
            key: 'Gender',
            render: (text) => <span>{text}</span>,

        },
        {
            title: 'Số điện thoại',
            dataIndex: 'PhoneNumber',
            key: 'PhoneNumber',
            render: (text) => <span>{text}</span>,

        },
        {
            title: 'Trạng thái',
            dataIndex: 'IsBanned',
            key: 'IsBanned',
            render: (text) => (
                <span style={{ fontSize: '15px', color: text ? 'red' : 'green' }}>
                    {text ? 'Bị Khóa' : 'Bình thường'}
                </span>
            ),
        },
        // {
        //     title: 'Hoạt động',
        //     dataIndex: 'IsOnline',
        //     key: 'IsOnline',
        //     render: (text) => (
        //         <span style={{ fontSize: '15px', color: text ? 'red' : 'green' }}>
        //             {text ? 'Online' : 'Offline'}
        //         </span>
        //     ),
        // },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Chỉnh sửa</a>
                    <a>Xóa</a>
                </Space>
            ),
        },
    ];


    const showModalNewAccount = (values) => {
        setShowModalAddNew(values);
    };

    const getAllCustomer = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/customer/getListCustomer`);
            if (response.status === 200) {
                setCustomer(response.data.customerData[0]);
            }
        } catch (error) {
            toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
        }
    }

    useEffect(() => {
        getAllCustomer();
    }, [])

    return (
        <div className={cx('dashboard')}>
            <div className={cx('title_admin')}>
                <Title className={cx('text')} level={5}>Quản lý khách hàng</Title>
                <span >Trang quản lý khách hàng</span>

            </div>
            <div className={cx('main_title')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title className={cx('title')} level={5}>Danh sách khách hàng</Title>
                    <div className={cx('btn_customer')}>
                        {/* <Select
                            defaultValue='top_price'
                            className={cx('btn_customer_select')}
                            options={[
                                {
                                    value: 'top_price',
                                    label: 'Nhân viên điểm cao nhất',
                                },
                                {
                                    value: 'low_price',
                                    label: 'Nhân viên điểm thấp nhất',
                                },
                                {
                                    value: 'low_price',
                                    label: 'Nhân viên bị khóa tài khoản',
                                },
                                {
                                    value: 'low_price',
                                    label: 'Nhân viên tài khoản không bị khóa',
                                },
                            ]}
                            placement='bottomRight'
                            loading={true}
                        /> */}
                        <input
                            placeholder='Tìm kiếm nhân viên...'
                            className={cx('btn_customer_search')}


                        />
                        <button className={cx('btn_customer_search_find')}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>

                    </div>
                </div>

                <Table
                    style={{ padding: '10px', marginTop: '2vh', backgroundColor: 'white', borderRadius: '10px', marginLeft: '1vh', border: '1px solid #e8e8e8' }}
                    columns={columns}
                    rowKey="CustomerID"
                    dataSource={customer}
                    loading={customer != null ? false : false}
                    pagination={{
                        pageSize: 6
                    }}
                    components={{
                        header: {
                            cell: (props) => <th style={{ backgroundColor: '#f5f5f5', color: 'black', borderRadius: '6px', textAlign: 'center' }}>{props.children}</th>,
                        },
                        body: {
                            cell: (props) => <td style={{ textAlign: 'center' }}>{props.children}</td>,
                        },
                    }} />;

            </div>
        </div>
    )
}

export default CustomerLayout