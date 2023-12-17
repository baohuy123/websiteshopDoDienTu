import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import {
    Typography,
    Space, Table, Tag, Select, Modal, Input
} from 'antd';
import classNames from 'classnames/bind';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/dashboard.module.scss';
import AddnewaccountLayout from './popups/addnewaccount.layout';
import EditaccountLayout from './popups/editaccount.layout';

let cx = classNames.bind(styles);
const AccountsLayout = () => {
    const { Title } = Typography;
    const { Search } = Input;
    const [account, setAccount] = useState([]);


    const columns = [
        {
            title: 'ID',
            dataIndex: 'AccountID',
            key: 'AccountID',
            render: (text) => <div >{text}</div>,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'FullName',
            key: 'FullName',
            render: (text) => <span style={{ fontSize: '15px' }}>{text}</span>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'Address',
            key: 'Address',
            render: (text) => (
                <span style={{ fontSize: '13px', width: '10vh', whiteSpace: 'break-spaces' }}>
                    {text}
                </span>
            ),
        },

        {
            title: 'Số điện thoại',
            dataIndex: 'Phone',
            key: 'Phone',
        },
        {
            title: 'Vai trò',
            dataIndex: 'DepartmentName',
            key: 'DepartmentName',
        },
        {
            title: 'Điểm',
            dataIndex: 'Reward',
            key: 'Reward',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'IsBanned',
            key: 'IsBanned',
            render: (text) => (
                <span style={{ fontSize: '15px', color: text ? 'red' : 'green' }}>
                    {text ? 'Bị Khóa' : 'Bình thường'}
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={(AccountID, Email, FullName, Address, Phone, Reward, IsBanned) => showModalEditAccount(true, record.AccountID, record.Email, record.FullName, record.Address, record.Phone, record.Reward, record.IsBanned)} className={cx('btn_account_table_option_edit')}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Chỉnh sửa</span>
                    </button>
                    {record.IsBanned === 0 ? (
                        <button onClick={(AccountID) => handleLockAccount(record.AccountID)} className={cx('btn_account_table_option_lock')}>
                            <i className="fa-solid fa-lock"></i>
                            <span>Khóa tài khoản</span>
                        </button>
                    ) : (
                        <button onClick={(AccountID) => handleUnLockAccount(record.AccountID)} className={cx('btn_account_table_option_unlock')}>
                            <i className="fa-solid fa-lock-open"></i>
                            <span>Mở khóa</span>
                        </button>
                    )}
                </Space>
            ),
        },

    ];

    const getAllAccount = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/accounts/getListAccount`);
            if (response.status === 200) {
                setAccount(response.data.accountData[0]);
            }
        } catch (error) {
            toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
        }
    }

    const handleLockAccount = async (AccountID) => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}accounts/lockAccount`, { AccountID });
            if (response.status === 200) {
                toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                getAllAccount();
            }

        } catch (error) {
            console.log('error.data:', error.data)
            if (error.response) {
                console.log(error.response)
                toast.error(error.response.data.error, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
            else {
                toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
        }
    }

    const handleUnLockAccount = async (AccountID) => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/accounts/unLockAccount`, { AccountID });
            if (response.status === 200) {
                toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                getAllAccount();
            }

        } catch (error) {
            console.log('error.data:', error.data)
            if (error.response) {
                console.log(error.response)
                toast.error(error.response.data.error, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
            else {
                toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
        }
    }

    useEffect(() => {
        getAllAccount();
    }, [])

    const showModalNewAccount = (values) => {
        setShowModalAddNew(values);
    };

    const showModalEditAccount = (values, AccountID, Email, FullName, Address, Phone, Reward, IsBanned) => {
        const dataAccountEditAdmin = {
            AccountID: AccountID,
            FullName: FullName,
            Email: Email,
            Address: Address,
            Phone: Phone,
            Reward: Reward,
            IsBanned: IsBanned
        }
        setDataAccountEdit(dataAccountEditAdmin)
        setShowModalAddEdit(values)
    };

    const handleFalseModal = (values) => {
        if (values == false) {
            getAllAccount();
        }
        setShowModalAddNew(values);
        setShowModalAddEdit(values)

    };

    const [showModalAddNew, setShowModalAddNew] = useState(false);
    const [showModalEdit, setShowModalAddEdit] = useState(false);
    const [dataAccountEdit, setDataAccountEdit] = useState();
    const [searchFullName, setSearchFullName] = useState('');

    const searchDataAccount = account.filter((item) =>
        item.FullName.toLowerCase().includes(searchFullName.toLowerCase())
    );



    return (
        <div className={cx('dashboard')}>
            {
                showModalAddNew ?
                    <Modal width={1000}
                        open={showModalAddNew} footer={null} >
                        <div >
                            <AddnewaccountLayout handleFalseModal={handleFalseModal} />

                        </div>
                    </Modal> : null
            }

            {
                showModalEdit ?
                    <Modal width={1000}
                        open={showModalEdit} footer={null} >
                        <div >
                            <EditaccountLayout handleFalseModal={handleFalseModal} dataAccountEdit={dataAccountEdit} />

                        </div>
                    </Modal> : null
            }
            <div className={cx('title_admin')}>
                <Title className={cx('text')} level={5}>Quản lý nhân viên</Title>
                <span >Trang quản lý nhân viên</span>

            </div>
            <div className={cx('main_title')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title className={cx('title')} level={5}>Danh sách nhân viên</Title>
                    <div className={cx('btn_account')}>
                        <Select
                            defaultValue='top_price'
                            className={cx('btn_account_select')}
                            options={[
                                {
                                    value: 'top_price',
                                    label: 'Nhân viên điểm cao nhất',
                                },
                                {
                                    value: 'low_price',
                                    label: 'Nhân viên điểm thấp nhất',
                                },
                                {
                                    value: 'low_price',
                                    label: 'Nhân viên bị khóa tài khoản',
                                },
                                {
                                    value: 'low_price',
                                    label: 'Nhân viên tài khoản không bị khóa',
                                },
                            ]}
                            placement='bottomRight'
                            loading={true}
                        />
                        <input
                            placeholder='Tìm kiếm nhân viên...'
                            className={cx('btn_account_search')}
                            onChange={(e) => setSearchFullName(e.target.value)}
                            value={searchFullName}

                        />
                        <button className={cx('btn_account_search_find')}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>


                        <button onClick={() => showModalNewAccount(true)} className={cx('btn_account_add')}>
                            <i className="fa-solid fa-user-plus"></i>
                            <span> Tạo nhân viên mới</span>
                        </button>

                    </div>
                </div>

                <Table
                    style={{ padding: '10px', marginTop: '2vh', backgroundColor: 'white', borderRadius: '10px', marginLeft: '1vh', border: '1px solid #e8e8e8' }}
                    columns={columns}
                    rowKey="AccountID"
                    dataSource={searchDataAccount}
                    loading={account != null ? false : false}
                    pagination={{
                        pageSize: 6
                    }}
                    components={{
                        header: {
                            cell: (props) => <th style={{ backgroundColor: '#f5f5f5', color: 'black', borderRadius: '6px', textAlign: 'center' }}>{props.children}</th>,
                        },
                        body: {
                            cell: (props) => <td style={{ textAlign: 'center' }}>{props.children}</td>,
                        },
                    }} />;

            </div>
        </div>
    )
}

export default AccountsLayout