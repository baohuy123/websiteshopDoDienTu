import React, { useState, useEffect } from 'react';
import { Typography, Col, Row } from 'antd';

import classNames from 'classnames/bind';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/importorder.module.scss';

let cx = classNames.bind(styles);

const ImportstockhomeLayout = () => {
    const { Title } = Typography;

    return (
        <div className={cx('stock_home')}>
            <Title className={cx('text')} level={5}>Thông tin chung</Title>

            <Row>
                <Col xs={{ span: 5, offset: 1, }} lg={{ span: 6, offset: 2, }} >
                    <div className={cx('box_stockhome')}>
                        <p>Tổng số đơn hàng đang chờ nhập</p>
                        <span>5</span>
                    </div>
                </Col>
                <Col xs={{ span: 11, offset: 1, }} lg={{ span: 6, offset: 2, }}>
                    <div className={cx('box_stockhome')}>
                        <p>Danh sách kho hàng phân phối</p>
                        <span>5</span>
                    </div>
                </Col>
                <Col xs={{ span: 5, offset: 1, }} lg={{ span: 6, offset: 2, }} >
                    <div className={cx('box_stockhome')}>
                        <p>UPDATE</p>
                        <span>5</span>
                    </div>
                </Col>
            </Row>


        </div>
    )
}

export default ImportstockhomeLayout