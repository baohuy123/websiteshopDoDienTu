import React, { useState, useEffect } from 'react';
import { Typography, Col, Row } from 'antd';
import classNames from 'classnames/bind';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/importorder.module.scss';

let cx = classNames.bind(styles);
const InstockLayout = () => {
    const { Title } = Typography;

    return (
        <div>
            <Title className={cx('text')} level={5}>Thông tin về kho hàng</Title>

        </div>
    )
}

export default InstockLayout