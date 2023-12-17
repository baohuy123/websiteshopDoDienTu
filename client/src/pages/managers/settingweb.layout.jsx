import React, { useState, useEffect } from 'react';
import {
    Typography,
    Col, Divider, Row
} from 'antd';
import classNames from 'classnames/bind';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/settingweb.module.scss';

let cx = classNames.bind(styles);
const SettingwebLayout = () => {
    const { Title } = Typography;

    const [backupDB, setBackupDB] = useState();


    const handleBackupDB = async () => {
        try {
            const response = await axios.get('REACT_APP_MANAGEMENT_APIaccounts/backupDB');
            if (response.status === 200) {
                toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }

        } catch (e) {
            toast.error('Backup DB thất bại', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });

        }
    }

    return (
        <div className={cx('dashboard')}>
            <div className={cx('title_admin')}>
                <Title className={cx('text')} level={5}>Cài đặt</Title>
                <span >Trang cài đặt</span>

            </div>
            <div className={cx('main_title')}>
                <div className={cx('wapper_setting')}>
                    <Row justify="center">
                        <Col className={cx('box')} span={4}>
                            <div className={cx('backup_db')}>
                                <Title className={cx('text')} level={5}>Backup FILE Database</Title>
                                <button onClick={() => handleBackupDB()}>Backup</button>
                            </div>
                        </Col>
                        <Col className={cx('box')} span={6}>
                            <div className={cx('rate_import')}>
                                <Title className={cx('text')} level={5}>Điều chỉnh tỉ lệ nhập hàng</Title>
                                <input type='number' min={1} max={5} placeholder='Tỉ lệ nhập hàng' />
                                <button>Xác nhận</button>
                            </div>
                        </Col>
                        <Col className={cx('box')} span={4}>
                            <Title className={cx('text')} level={5}></Title>

                        </Col>

                    </Row>
                </div>
            </div>
        </div>
    )
}

export default SettingwebLayout