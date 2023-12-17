import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './styles/profiles.module.scss';
import axios from 'axios';
import { Col, Row, Table, Checkbox, Tag } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatVND } from '../../utils/services.js'

let cx = classNames.bind(styles);
const ProfilesLayout = () => {

    return (

        <div>

        </div>
    )
}

export default ProfilesLayout