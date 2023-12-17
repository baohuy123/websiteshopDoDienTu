import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import {
    Typography,
    Col,
    Row,
    Statistic,
    Divider
} from 'antd';
import classNames from 'classnames/bind';
import ANTDChartColumn from '../../components/antd/ANTDChartColumn';
import styles from './styles/dashboard.module.scss';

let cx = classNames.bind(styles);
const DashboardLayout = () => {
    const { Title } = Typography;
    const formatter = (value) => <CountUp end={value} separator="," />;

    return (
        <div className={cx('dashboard')}>
            <div className={cx('title_admin')}>
                <Title className={cx('text')} level={5}>Trang quản lý</Title>
                <span >Quản lý trang web bán hàng đồ điện tử</span>
            </div>
            <div className={cx('main_title_dashboard')}>
                <div className={cx('box_overview')}>
                    <div className={cx('box_overview_title')}>
                        <p>Xu hướng</p>
                    </div>
                    <div className={cx('box_overview_box')}>
                        <div className={cx('box')}>
                            <p>Doanh thu</p>
                            <span>0đ</span>
                        </div>
                        <div className={cx('box')}>
                            <p>Số lượng khách hàng</p>
                            <span>0</span>
                        </div>
                        <div className={cx('box')}>
                            <p>Số lượng đơn hàng</p>
                            <span>0</span>
                        </div>
                        <div className={cx('box')}>
                            <p>Số lượng sản phẩm</p>
                            <span>0</span>
                        </div>
                    </div>

                    <div className={cx('chart_box')}>
                        <ANTDChartColumn />
                    </div>
                </div>


                <div className={cx('box_ratings')}>
                    <div className={cx('box_overview_title')}>
                        <p>Xếp hạng sản phẩm</p>
                    </div>
                    <div className={cx('box_ratings_box')}>
                        <div className={cx('box_ratings_box_detail')}>
                            <p>Xếp hạng theo số lượng bán</p>
                        </div>
                        <div className={cx('box_ratings_box_detail')}>
                            <p>Xếp hạng theo số lượng hiện có</p>

                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default DashboardLayout