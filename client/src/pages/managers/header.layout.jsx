import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
    Typography,
    Divider,
    Modal,
    Breadcrumb,
    Dropdown,
    Button
} from 'antd';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import styles from './styles/header.module.scss';

let cx = classNames.bind(styles);

const HeaderLayout = () => {
    const { Title } = Typography;
    const history = useHistory();

    const [activeNavLink, setActiveNavLink] = useState(null);
    const [showModalBuyNow, setShowModalBuyNow] = useState(false);

    const handleNavLinkClick = (navLink) => {
        setActiveNavLink(navLink);
    };
    let account = useSelector((state) => state.accountReducer.account);

    const JsonAccount = JSON.parse(account)

    const roleAccount = JsonAccount.DepartmentID;


    const showModalBuy = (values) => {
        setShowModalBuyNow(values);

    };

    const handleFalseModal = (values) => {
        setShowModalBuyNow(values);
    };

    const handleLogout = () => {
        localStorage.removeItem("DataAccount")
        history.push('/admin/login');
        showModalBuy(false)
        window.location.reload();

    }


    return (
        <div className={cx('right')}>
            {
                showModalBuyNow ?
                    <Modal open={showModalBuyNow} footer={null} >
                        <div>
                            <h2>ĐĂNG XUẤT</h2>
                            <p>
                                Bạn chắc chắn đăng xuất tài khoản:
                                <span> {JsonAccount.FullName}</span>
                            </p>
                            <button
                                onClick={() => handleLogout()}
                                type="button"
                                className={cx('btn_logout_btn')}
                            >Đăng xuất</button>
                            <button
                                onClick={() => showModalBuy(false)}
                                type="button"
                                className={cx('btn_logout_btn')}
                            >Hủy</button>
                        </div>
                    </Modal> : null
            }
            <div className={cx('title_admin')}>
                <Title className={cx('text')} level={5}>Chào mừng</Title>
                <span >{JsonAccount.FullName}</span>
            </div>
            <div className={cx('list_nav')}>
                <NavLink
                    exact
                    to={`/admin/dashboard`}
                    className={cx('navbar', { active: activeNavLink === `/admin/dashboard` })}
                    onClick={() => handleNavLinkClick(`/admin/dashboard`)}
                >
                    <div className={cx('title')}>
                        <i className="fa-solid fa-chart-line"></i>
                        <span style={{ marginLeft: '-0.3vh' }}>Thống kê cửa hàng</span>
                    </div>
                </NavLink>
                <NavLink
                    exact
                    to={`/admin/listproduct`}
                    className={cx('navbar', { active: activeNavLink === `/admin/listproduct` })}
                    onClick={() => handleNavLinkClick(`/admin/listproduct`)}
                >
                    <div className={cx('title')}>
                        <i className="fa-solid fa-box"></i>
                        <span>Quản lý sản phẩm</span>
                    </div>
                </NavLink>
                {roleAccount === 5 || roleAccount === 6 || roleAccount === 7 ? (
                    <NavLink
                        exact
                        to={`/admin/listaccount`}
                        className={cx('navbar', { active: activeNavLink === `/admin/listaccount` })}
                        onClick={() => handleNavLinkClick(`/admin/listaccount`)}
                    >
                        <div className={cx('title')}>
                            <i className="fa-solid fa-users"></i>
                            <span style={{ marginLeft: '-0.5vh' }}>Quản lý nhân viên</span>
                        </div>
                    </NavLink>
                ) : null}


                <NavLink
                    exact
                    to={`/admin/listcustomer`}
                    className={cx('navbar', { active: activeNavLink === `/admin/listcustomer` })}
                    onClick={() => handleNavLinkClick(`/admin/listcustomer`)}
                >
                    <div className={cx('title')}>
                        <i className="fa-solid fa-people-group"></i>
                        <span style={{ marginLeft: '-0.5vh' }}>Quản lý khách hàng</span>
                    </div>
                </NavLink>
                <NavLink
                    exact
                    to={`/admin/listorder`}
                    className={cx('navbar', { active: activeNavLink === `/admin/listorder` })}
                    onClick={() => handleNavLinkClick(`/admin/listorder`)}
                >
                    <div className={cx('title')}>
                        <i className="fa-solid fa-hard-drive"></i>
                        <span>Quản lý đơn hàng</span>
                    </div>
                </NavLink>
                <NavLink
                    exact
                    to={`/admin/importorder`}
                    className={cx('navbar', { active: activeNavLink === `/admin/importorder` })}
                    onClick={() => handleNavLinkClick(`/admin/importorder`)}
                >
                    <div className={cx('title')}>
                        <i className="fa-solid fa-file-import"></i>
                        <span>Quản lý nhập hàng</span>
                    </div>
                </NavLink>
                <NavLink
                    exact
                    to={`/admin/setting`}
                    className={cx('navbar', { active: activeNavLink === `/admin/setting` })}
                    onClick={() => handleNavLinkClick(`/admin/setting`)}
                >
                    <div className={cx('title')}>
                        <i className="fa-solid fa-gear"></i>
                        <span style={{ marginLeft: '0.1vh' }}>Cài đặt</span>
                    </div>
                </NavLink>
                {/*   <NavLink
                    exact
                    to={`/admin/profile`}
                    className={cx('navbar', { active: activeNavLink === `/admin/profile` })}
                    onClick={() => handleNavLinkClick(`/admin/profile`)}
                >
                    <div className={cx('title')}>
                        <i className="fa-solid fa-user"></i>
                        <span style={{ marginLeft: '0.1vh' }}>Tài khoản cá nhân</span>
                    </div>
                </NavLink> */}
                <button
                    onClick={() => showModalBuy(true)}
                    handleFalseModal={handleFalseModal}
                    type="button"
                    className={cx('btn_logout')}
                >  <div className={cx('title')}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Đăng xuất</span>
                    </div>
                </button>

            </div>
        </div>
    )
}

export default HeaderLayout