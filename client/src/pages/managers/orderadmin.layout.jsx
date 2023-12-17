import React, { useState, useEffect } from 'react';
import {
    Typography,
    Space, Table, Tag, Select, Modal, Statistic
} from 'antd';
import classNames from 'classnames/bind';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/orderadmin.module.scss';
import { formatVND } from '../../utils/services.js'
import CountUp from 'react-countup';


let cx = classNames.bind(styles);

const OrderadminLayout = () => {
    const formatter = (value) => <CountUp end={value} separator="," />;

    const [payment, setPayment] = useState();

    const [DANG_CHO_DUYET_DON_HANG, setDANG_CHO_DUYET_DON_HANG] = useState(0);
    const [DON_HANG_DA_DUOC_DUYET, setDON_HANG_DA_DUOC_DUYET] = useState(0);
    const [DON_HANG_DANG_DONG_GOI, setDON_HANG_DANG_DONG_GOI] = useState(0);
    const [DON_HANG_HANG_DANG_DEN_BAN, setDON_HANG_HANG_DANG_DEN_BAN] = useState(0);
    const [DON_HANG_GIAO_THANH_CONG, setDON_HANG_GIAO_THANH_CONG] = useState(0);
    const [DON_HANG_BI_TU_CHOI_NHAN, setDON_HANG_BI_TU_CHOI_NHAN] = useState(0);


    const [TYPE_STATUS, setTYPE_STATUS] = useState();
    const [PaymentIDSelect, setPaymentIDSelect] = useState();

    const handleTypeChange = (value, PaymentID) => {
        setTYPE_STATUS(value);
        setPaymentIDSelect(PaymentID)
        if (!TYPE_STATUS) {
            toast.error('Vui lòng chọn lại', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            return;
        }
        else {
            changStatusPayment();
            calculateCounts();

        }
    };
    const { Title } = Typography;
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'PaymentCode',
            key: 'PaymentCode',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'FullName',
            key: 'FullName',
            render: (text) => <span>{text}</span>,

        },
        {
            title: 'Tổng tiền',
            dataIndex: 'Total',
            key: 'Total',
            render: (text) => <span>{formatVND(text)}</span>,

        },
        {
            title: 'Trang thái đơn hàng',
            dataIndex: 'Status',
            key: 'Status',
            render: (text) => <span>{text}</span>,

        },
        {
            title: 'Ngày tạo',
            dataIndex: 'CreateAt',
            key: 'CreateAt',
            render: (text) => <span>{text}</span>,

        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'PaymentType',
            key: 'PaymentType',
            render: (text) => <div>{
                text === 1 ? <div>
                    <Tag color="green">Thanh toán COD</Tag>
                </div> : <div>
                    <Tag color="blue">Thanh toán VNPAY</Tag>

                </div>
            }</div>,

        },
        {
            title: 'Tùy chỉnh đơn',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div>
                        <Select
                            defaultValue={record.Status}
                            className={cx('btn_order_select')}
                            options={[
                                {
                                    value: 'TYPE_1_SELECT',
                                    label: 'Đơn hàng đã duyệt',
                                },
                                {
                                    value: 'TYPE_2_SELECT',
                                    label: 'Đơn hàng đang đóng gói',
                                },
                                {
                                    value: 'TYPE_3_SELECT',
                                    label: 'Đơn hàng đang giao',
                                },
                                {
                                    value: 'TYPE_4_SELECT',
                                    label: 'Đơn hàng giao thành công',
                                },
                                {
                                    value: 'TYPE_5_SELECT',
                                    label: 'Đơn hàng bị từ chối nhận',
                                },
                            ]}
                            placement='bottomRight'
                            loading={true}
                            onChange={(value) => {
                                handleTypeChange(value, record.PaymentID);
                            }}
                        />
                    </div>
                    <button className={cx('button')}>Chi tiết đơn</button>
                </Space>
            ),
        },
    ];


    const changStatusPayment = async () => {
        try {
            const DataChangStatus = {
                TYPE: TYPE_STATUS,
                PaymentID: PaymentIDSelect
            }
            try {
                const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/carts/updateStatusPayment`, { DataChangStatus });
                if (response.status === 200) {
                    getListPayment();
                    toast.success('Cập nhật đơn hàng thành công', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                }
            } catch (error) {
                toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }
        } catch (e) {
            console.log(e)
        }
    }

    const calculateCounts = () => {
        if (payment) {
            const TYPE_1 = payment.filter(order => order.Status === 'Đang chờ duyệt đơn hàng');
            const TYPE_2 = payment.filter(order => order.Status === 'Đơn hàng đã được duyệt');
            const TYPE_3 = payment.filter(order => order.Status === 'Đơn hàng đang đóng gói');
            const TYPE_4 = payment.filter(order => order.Status === 'Đơn hàng đang đến với bạn');
            const TYPE_5 = payment.filter(order => order.Status === 'Đơn hàng đã giao thành công');
            const TYPE_6 = payment.filter(order => order.Status === 'Đơn hàng bị từ chối nhận');

            setDANG_CHO_DUYET_DON_HANG(TYPE_1.length);
            setDON_HANG_DA_DUOC_DUYET(TYPE_2.length);
            setDON_HANG_DANG_DONG_GOI(TYPE_3.length);
            setDON_HANG_HANG_DANG_DEN_BAN(TYPE_4.length);
            setDON_HANG_GIAO_THANH_CONG(TYPE_5.length);
            setDON_HANG_BI_TU_CHOI_NHAN(TYPE_6.length);

            console.log(DANG_CHO_DUYET_DON_HANG)
        }
    }


    const getListPayment = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/carts/getListPayment`);
            if (response.status === 200) {
                setPayment(response.data.getListPaymentData);

            }
        } catch (error) {
            toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
        }
    }

    useEffect(() => {
        getListPayment();


    }, [])



    return (

        <div className={cx('dashboard')}>
            <div className={cx('title_admin')}>
                <Title className={cx('text')} level={5}>Quản lý đơn hàng</Title>
                <span >Trang quản lý đơn hàng</span>

            </div>
            <div className={cx('main_title')}>

                <div className={cx('order_status')}>
                    <Title className={cx('text')} level={5}>Trạng thái đơn hàng</Title>
                    <div className={cx('order_status_list')}>
                        <div className={cx('order_status_detail')}>
                            <span>Đơn hàng đang chờ duyệt</span>
                            <p>
                                <Statistic value={DANG_CHO_DUYET_DON_HANG} formatter={formatter} />
                            </p>
                        </div>
                        <div className={cx('order_status_detail')}>
                            <span>Đơn hàng đã duyệt</span>
                            <p>
                                <Statistic value={DON_HANG_DA_DUOC_DUYET} formatter={formatter} />
                            </p>
                        </div>
                        <div className={cx('order_status_detail')}>
                            <span>Đơn hàng đóng gói</span>
                            <p>
                                <Statistic value={DON_HANG_DANG_DONG_GOI} formatter={formatter} />
                            </p>
                        </div>
                        <div className={cx('order_status_detail')}>
                            <span>Đơn hàng đang giao</span>
                            <p> <Statistic value={DON_HANG_HANG_DANG_DEN_BAN} formatter={formatter} /></p>
                        </div>

                        <div className={cx('order_status_detail')}>
                            <span>Đơn hàng giao thành công</span>
                            <p><Statistic value={DON_HANG_GIAO_THANH_CONG} formatter={formatter} /></p>
                        </div>
                        <div className={cx('order_status_detail')}>
                            <span>Đơn hàng bị từ chối</span>
                            <p><Statistic value={DON_HANG_BI_TU_CHOI_NHAN} formatter={formatter} /></p>
                        </div>
                    </div>
                </div>

                <div className={cx('box_order')}>
                    <div className={cx('top_box_order')}>
                        <Title className={cx('text')} level={5}>Danh sách đơn hàng</Title>
                        <div className={cx('right_top_box_order')}>
                            <button onClick={() => calculateCounts()}>Lấy thông tin trạng thái</button>

                            {/* <Select
                                defaultValue='TYPE_1_1'
                                className={cx('btn_account_select')}
                                options={[
                                    {
                                        value: 'TYPE_1_1',
                                        label: 'Đơn hàng đang chờ duyệt',
                                    },
                                    {
                                        value: 'TYPE_2_2',
                                        label: 'Đơn hàng đã duyệt',
                                    },
                                    {
                                        value: 'TYPE_3_3',
                                        label: 'Đơn hàng đang đóng gói',
                                    },
                                    {
                                        value: 'TYPE_4_4',
                                        label: 'Đơn hàng đang giao',
                                    },
                                    {
                                        value: 'TYPE_5_5',
                                        label: 'Đơn hàng giao thành công',
                                    },
                                    {
                                        value: 'TYPE_6_6',
                                        label: 'Đơn hàng bị từ chối nhận',
                                    },
                                ]}
                                placement='bottomRight'
                                loading={true}
                            /> */}
                        </div>
                    </div>
                    <div className={cx('table_box_order')}>
                        <Table
                            style={{ padding: '10px', marginTop: '2vh', backgroundColor: 'white', borderRadius: '10px', marginLeft: '1vh', border: '1px solid #e8e8e8' }}
                            columns={columns}
                            rowKey="PaymentID"
                            dataSource={payment}
                            loading={payment != null ? false : false}
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

            </div>
        </div>
    )
}

export default OrderadminLayout