import React, { useState, useEffect } from 'react';
import {

    Input

} from 'antd';

import classNames from 'classnames/bind';

import styles from './styles.module.scss';

let cx = classNames.bind(styles);
const InputLayout = ({ title, nameBtn }) => {

    const { Search } = Input;


    return (

        <Search
            className={cx('input')}
            placeholder={title}
            allowClear
            size='large'
            enterButton={<button className={cx('btn')}>Tìm kiếm</button>}
        // onSearch={}
        />
    )
}

export default InputLayout