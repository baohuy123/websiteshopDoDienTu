import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Divider } from 'antd';
import classNames from 'classnames/bind';
import styles from './styles/homepage.module.scss';
import axios from 'axios';
import ListcategoryLayout from '../../components/listcategory/listcategory.layout';
import FooterLayout from '../../components/footer/footer.layout';

let cx = classNames.bind(styles);
const HomepageLayout = () => {



    return (
        <div className={cx('homepage')}>
            <ListcategoryLayout />

            <div className={cx('box_banner_text')}>
                <div className={cx('box_banner_text_title')}>
                    <span>CÔNG TY ĐÔNG NAM Á</span>
                </div>
                <Divider></Divider>
                <div className={cx('box_banner_text_title_next')}>
                    <span>Thông tin về cửa hàng</span>
                    <p>Chuyên cung cấp các sản phẩm về thiết bị điện gia đình và công nghiệp. Các thiết bị an ninh và nhiều thứ khác.</p>
                </div>
            </div>

            <div className={cx('commit')}>
                <div className={cx('commit_item')} style={{ backgroundColor: '#ffece4' }}>
                    <p>Giao hàng nhanh</p>
                    <p><i style={{ backgroundColor: ' #ffa27a' }} className="fa-solid fa-truck"></i></p>
                </div>
                <div className={cx('commit_item')} style={{ backgroundColor: '#f1e8ff' }}>
                    <p>Sản phẩm chất lượng</p>
                    <i style={{ backgroundColor: ' #a16def' }} className="fa-solid fa-shield"></i>
                </div>
                <div className={cx('commit_item')} style={{ backgroundColor: '#f1e8ff' }}>
                    <p>Có nhiều giải thưởng</p>
                    <i style={{ backgroundColor: ' #52cd3b  ' }} className="fa-solid fa-medal"></i>
                </div>
                <div className={cx('commit_item')} style={{ backgroundColor: '#c9d0e7' }}>
                    <p>Hoàn trả nếu sản phẩm có lỗi</p>
                    <i style={{ backgroundColor: ' #4a6aa6' }} className="fa-solid fa-share"></i>
                </div>
            </div>

            <FooterLayout />
        </div>
    )
}

export default HomepageLayout