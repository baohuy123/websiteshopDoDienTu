import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import {
    Typography,
    Space, Table, Tag, Button
} from 'antd';
import classNames from 'classnames/bind';
import { Bar } from '@ant-design/plots';
import OrganizationGraphANTD from '../../components/antd/OrganizationGraphANTD';
import styles from './styles/dashboard.module.scss';
import { useSelector } from 'react-redux';

let cx = classNames.bind(styles);
const MenbermanagerLayout = () => {
    const { Title } = Typography;
    let account = useSelector((state) => state.accountReducer.account);

    const JsonAccount = JSON.parse(account)

    console.log(JsonAccount)
    useEffect(() => {

    }, [account])

    return (
        <div className={cx('dashboard')}>
            <div className={cx('title_admin')}>
                <Title className={cx('text')} level={5}>Danh sách phòng ban</Title>
                <span >Biểu đồ phòng ban</span>

            </div>
            <div className={cx('main_title')}>
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <Title className={cx('title')} level={5}>Thông tin phòng ban</Title>
                </div>

                <OrganizationGraphANTD />
            </div>
        </div>
    )
}

export default MenbermanagerLayout