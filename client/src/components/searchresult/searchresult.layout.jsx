import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import axios from 'axios';
import { Col, Row, Descriptions, Table } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let cx = classNames.bind(styles);
const SearchresultLayout = () => {

    return (
        <div className={cx('input_search')}>

        </div>
    )
}

export default SearchresultLayout