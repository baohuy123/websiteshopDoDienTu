import React, { useState, useEffect } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import {
    Typography,
    Col,
    Row,
    Breadcrumb,
    Dropdown,
    Button
} from 'antd';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/account.actions.js';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles/admin.module.scss';
import HeaderLayout from './header.layout';
import DashboardLayout from './dashboard.layout';
import AccountsLayout from './accounts.layout';
import CustomerLayout from './customer.layout';
import ProductsLayout from './products.layout';
import MenbermanagerLayout from './menbermanager.layout';
import LoginadminLayout from './loginadmin.layout';
import ImportorderLayout from './importorder.layout.jsx';
import OrderadminLayout from './orderadmin.layout.jsx';
import SettingwebLayout from './settingweb.layout.jsx';

let cx = classNames.bind(styles);
const AdminLayout = () => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.accountReducer.account);

    useEffect(() => {
        const dataAccount = localStorage.getItem("DataAccount")

        if (dataAccount) {
            if (dataAccount) {
                dispatch(loginSuccess(dataAccount));
            }
        }
    }, [dispatch]);


    return (
        <div className={cx('admin_page')}>
            <Row>
                <Col span={20} push={4} >
                    <Switch>

                        <Route path='/admin/login'>
                            <LoginadminLayout />
                        </Route>

                        {
                            account != null && (
                                <>
                                    <Route path='/admin/dashboard'>
                                        <DashboardLayout />
                                    </Route>
                                    <Route path='/admin/listaccount'>
                                        <AccountsLayout />
                                    </Route>
                                    <Route path='/admin/listcustomer'>
                                        <CustomerLayout />
                                    </Route>
                                    <Route path='/admin/listproduct'>
                                        <ProductsLayout />
                                    </Route>
                                    <Route path='/admin/managermenber'>
                                        <MenbermanagerLayout />
                                    </Route>
                                    <Route path='/admin/importorder'>
                                        <ImportorderLayout />
                                    </Route>
                                    <Route path='/admin/listorder'>
                                        <OrderadminLayout />
                                    </Route>
                                    <Route path='/admin/setting'>
                                        <SettingwebLayout />
                                    </Route>
                                </>
                            )

                        }

                    </Switch>
                </Col>
                <Col span={4} pull={20} >
                    {
                        account != null && (<HeaderLayout />)
                    }
                </Col>
            </Row>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
            />

        </div>
    )
}

export default AdminLayout