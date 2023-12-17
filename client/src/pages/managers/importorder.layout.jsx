import React, { useState, useEffect } from 'react';
import {
    Typography,
    Divider, Table, Tag, Select, Modal, Input
} from 'antd';
import classNames from 'classnames/bind';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/importorder.module.scss';
import { NavLink, Switch, Route } from 'react-router-dom';
import ImportstockhomeLayout from './importstock/importstockhome.layout';
import ImportstockimportstockLayout from './importstock/importstockimportstock.layout';
import ListimportstockLayout from './importstock/listimportstock.layout';
import InstockLayout from './importstock/instock.layout';

let cx = classNames.bind(styles);

const ImportorderLayout = () => {
    const { Title } = Typography;

    const [activeNavLink, setActiveNavLink] = useState(null);
    const [showModalBuyNow, setShowModalBuyNow] = useState(false);

    const handleNavLinkClick = (navLink) => {
        setActiveNavLink(navLink);
    };

    return (

        <div className={cx('dashboard')}>
            <div className={cx('title_admin')}>
                <Title className={cx('text')} level={5}>Quản lý nhập hàng</Title>
                <span >Trang quản lý nhập hàng</span>

            </div>
            <div className={cx('main_title')}>
                <div className={cx('box_import')}>
                    <p className={cx('box_import_title')}>Nhập hàng hóa về cửa hàng</p>
                    <div className={cx('nav_list')}>
                        <NavLink
                            exact
                            to={`/admin/importorder/home`}
                            className={cx('navbar', { active: activeNavLink === `/admin/importorder/home` })}
                            onClick={() => handleNavLinkClick(`/admin/importorder/home`)}
                        >
                            <div className={cx('title')}>
                                <i className="fa-solid fa-file-arrow-up"></i>
                                <span style={{ marginLeft: '-0.3vh' }}>Thông tin chung</span>
                            </div>
                        </NavLink>
                        <NavLink
                            exact
                            to={`/admin/importorder/importstock`}
                            className={cx('navbar', { active: activeNavLink === `/admin/importorder/importstock` })}
                            onClick={() => handleNavLinkClick(`/admin/importorder/importstock`)}
                        >
                            <div className={cx('title')}>
                                <i className="fa-solid fa-layer-group"></i>
                                <span style={{ marginLeft: '-0.3vh' }}>Nhập hàng vào kho tổng</span>
                            </div>
                        </NavLink>
                        <NavLink
                            exact
                            to={`/admin/importorder/listimportstock`}
                            className={cx('navbar', { active: activeNavLink === `/admin/importorder/listimportstock` })}
                            onClick={() => handleNavLinkClick(`/admin/importorder/listimportstock`)}
                        >
                            <div className={cx('title')}>
                                <i className="fa-solid fa-table-list"></i>
                                <span style={{ marginLeft: '-0.3vh' }}>Nhập hàng kho phân phối</span>
                            </div>
                        </NavLink>
                        <NavLink
                            exact
                            to={`/admin/importorder/stock`}
                            className={cx('navbar', { active: activeNavLink === `/admin/importorder/stock` })}
                            onClick={() => handleNavLinkClick(`/admin/importorder/stock`)}
                        >
                            <div className={cx('title')}>
                                <i className="fa-regular fa-rectangle-list"></i>
                                <span style={{ marginLeft: '-0.3vh' }}>Trong kho hàng</span>
                            </div>
                        </NavLink>
                    </div>
                    <Divider>

                    </Divider>
                    <div className={cx('import_body')}>
                        <Switch>
                            <Route path='/admin/importorder/home'>
                                <ImportstockhomeLayout />
                            </Route>
                            <Route path='/admin/importorder/importstock' >
                                <ImportstockimportstockLayout />
                            </Route>
                            <Route path='/admin/importorder/listimportstock' >
                                <ListimportstockLayout />
                            </Route>
                            <Route path='/admin/importorder/stock' >
                                <InstockLayout />
                            </Route>
                        </Switch>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImportorderLayout