import React, { useState, useEffect } from 'react';
import {
    Typography,
    Divider, Table, Space, Select, Modal, Input
} from 'antd';
import classNames from 'classnames/bind';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/importorder.module.scss';

let cx = classNames.bind(styles);
const ListimportstockLayout = () => {
    const { Title } = Typography;

    const columns = [
        {
            title: 'Mã phiếu',
            dataIndex: 'ID',
            key: 'ID',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'SupplierName',
            key: 'SupplierName',
        },
        {
            title: 'Nhà kho',
            dataIndex: 'CreateAt',
            key: 'CreateAt',
        },
        {
            title: 'Tùy chọn',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button className={cx('btn_product_table_option_edit')}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Chi tiết</span>
                    </button>
                    <button className={cx('btn_product_table_option_delete')}>
                        <i className="fa-solid fa-trash"></i>
                        <span>Xóa</span>
                    </button>
                </Space>
            ),
        },
    ]

    const data = [
        {
            ID: 1,
            SupplierName: 'Nhà Cung Cấp Cơ Khí Điện Long Giang',
            CreateAt: '2023-11-25 19:40:01',
        },
        {
            ID: 2,
            SupplierName: 'Nhà Cung Cấp Sản Xuất Thương Mại Đạt Bình',
            CreateAt: '2023-11-25 19:40:01',
        }
    ];
    return (
        <div>
            <Title className={cx('text')} level={5}>Nhập hàng về kho phân phối</Title>



        </div>
    )
}

export default ListimportstockLayout