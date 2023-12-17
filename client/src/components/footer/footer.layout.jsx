import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

let cx = classNames.bind(styles);
const FooterLayout = () => {

    return (
        <div className={cx('footer_main')}>
            <div className={cx('logo')}>
                <p>DONAMA STORE</p>
            </div>
            <div className={cx('ask')}>
                <p>Bảo hành chính hảng</p>

            </div>
            <div className={cx('ask_mail')}>
                <p>donama@gmail.com</p>

            </div>
        </div>
    )
}

export default FooterLayout