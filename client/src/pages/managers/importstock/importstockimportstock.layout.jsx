import React, { useState, useEffect } from 'react';
import { Typography, Steps, Divider, Form, Row, Result } from 'antd';
import classNames from 'classnames/bind';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatVND } from '../../../utils/services'
import styles from '../styles/importorder.module.scss';

let cx = classNames.bind(styles);
const ImportstockimportstockLayout = () => {
    const { Title } = Typography;
    const [statusStart, setStatusStart] = useState(true);
    const [statusCreateImport, setStatusCreateImport] = useState(false);
    const [statusCreateImportDetail, setStatusCreateImportDetail] = useState(false);
    const [statusCreateImportDone, setStatusCreateImportDone] = useState(false);


    //DATA LOAD
    const [importgoods, setImportgoods] = useState(1);
    const [importgoodsdetail, setImportgoodsdetail] = useState([]);

    //DATA SELECT
    const [importOrder, setImportOrder] = useState([])

    //STATUS IMPORT ORDERS
    const [resultImportStock, setResultImportStock] = useState(false)
    const [stockIsFull, setStockIsFull] = useState(false);


    const getAllImportoder = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/products/getAllImportoder`);
            if (response.data.getAllImportoderData[0] != null) {
                setImportOrder(response.data.getAllImportoderData[0])
            }
        } catch (e) {
            console.log(e)
        }
    }

    const checkStockProduct = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/products/checkStockProduct`);
            if (response.data.success) {
                setStockIsFull(true)
            }
            else {
                setStockIsFull(false)

            }
        } catch (e) {
            console.log(e)
        }
    }

    const getDetailImportProduct = async (values) => {
        if (importgoodsdetail != '') {
            toast.error('Bạn đã chọn đơn nhập hàng', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
        }
        try {
            console.log(values)
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/products/getDetailImportProduct`, { ImportOrderID: values });
            if (response.data.success) {
                setImportgoodsdetail(response.data.getDetailImportProductData[0])
                toast.success('Chọn đơn nhập hàng thành công', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });

            }

        } catch (e) {
            console.log(e)
        }
    }

    const hanldeStatusStart = (values) => {
        setStatusStart(values)
        setStatusCreateImport(true);
        checkStockProduct();

    }

    const hanldeStatusCreateImport = () => {
        if (importgoodsdetail != '') {
            setStatusCreateImport(false);
            setStatusCreateImportDetail(true);
        }
        else {
            toast.error('Chưa chọn đủ thông tin về phiếu nhập hàng', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
        }
    }

    const hanldeReturnStatusCreateImport = () => {
        setStatusCreateImport(true);
        setStatusCreateImportDetail(false);
    }

    const hanldeStatusCreateImportCheck = async () => {
        setResultImportStock(false);

        if (importgoodsdetail.length != '') {
            if (stockIsFull) {
                toast.error(`Kho tổng đã đầy hàng hóa`, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                return;
            }
            try {
                const importStockArray = importgoodsdetail.map(({ ProductID, Quantity }) => ({ ProductID, Quantity }));
                const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/products/importOrderInStock`, { importgoodsdetail: importStockArray });
                if (response.data.success) {

                    setTimeout(() => {
                        toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                        setStatusCreateImportDetail(false);
                        setStatusCreateImportDone(true)
                        setResultImportStock(true);

                    }, 5000);

                }

            } catch (e) {
                console.log(e)
                toast.error(`Lỗi nhập hàng`, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
            }


        }
        else {
            toast.error('Lỗi nhập hàng', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
        }
    }

    useEffect(() => {
        getAllImportoder();

    }, [])

    return (

        <div className={cx('importstockimportstock')}>
            <Title className={cx('text')} level={5}>Quy trình nhập hàng</Title>
            <div className={cx('wapper_importstockimportstock')}>
                <Steps
                    size='small'
                    direction='vertical'
                    progressDot
                    items={[
                        {
                            title: 'Tạo phiếu nhập hàng',
                            status: statusCreateImport ? 'finish' : !statusCreateImport ? 'wait' : 'error',
                        },
                        {
                            title: 'Kiểm tra lại thông tin',
                            status: statusCreateImportDetail ? 'finish' : !statusCreateImportDetail ? 'wait' : 'error',
                        },
                        {
                            title: 'Hoàn tất nhập hàng',
                            status: statusCreateImportDone ? 'finish' : !statusCreateImportDone ? 'wait' : 'error',
                        },
                    ]}
                />
                <div className={cx('main_settuing')}>

                    {
                        statusStart ?
                            <>
                                <button onClick={() => hanldeStatusStart(false)} className={cx('btn')}>
                                    <i style={{ marginRight: '1vh' }} className="fa-solid fa-file-import"></i>
                                    <span>
                                        Bắt đầu nhập hàng về kho
                                    </span>
                                </button>
                                <Divider></Divider>

                            </> : null
                    }
                    {
                        statusCreateImport ?
                            <>
                                <Divider orientation='left'>Tạo phiếu</Divider>
                                <Form layout='vertical' method="post" enctype="multipart/form-data">
                                    <Row>
                                        {
                                            importOrder && importOrder.map((item, key) => {
                                                return (
                                                    <div className={cx('importorder_paper')}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                                            <span>Nhà cung cấp: <span style={{ color: 'black', fontSize: '15px' }}>{item.SupplierName} </span></span>
                                                            <span>Tổng tiền: <span style={{ color: 'black', fontSize: '15px' }}>{formatVND(item.Total)} </span></span>
                                                        </div>
                                                        <span>Ngày tạo: <span style={{ color: 'black', fontSize: '15px' }}>{item.CreateAt}</span></span>
                                                        <button onClick={(ImportOrderID) => getDetailImportProduct(item.ImportOrderID)}>Chọn đơn hàng</button>

                                                    </div>
                                                )
                                            })
                                        }
                                    </Row>
                                    <Row>
                                        <button onClick={() => hanldeStatusCreateImport()} className={cx('btn')}>Tiếp tục</button>

                                    </Row>
                                    <Divider></Divider>

                                </Form>
                            </> : null
                    }
                    {
                        statusCreateImportDetail ?
                            <>
                                <Divider orientation='left'>Xem trước đơn hàng</Divider>
                                <Form layout='vertical' method="post" enctype="multipart/form-data">
                                    <div className={cx('list_product_box_importorderdetail')}>
                                        {
                                            importgoodsdetail && importgoodsdetail.map((item, key) => {
                                                return (
                                                    <div className={cx('box_importorderdetail')}>
                                                        <span>Tên sản phẩm : <span style={{ color: 'black', fontSize: '15px' }}>{item.NameProduct}</span></span>
                                                        <span>Số lượng : <span style={{ color: 'black', fontSize: '15px' }}>{item.Quantity}</span></span>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <Row>
                                        <button onClick={() => hanldeReturnStatusCreateImport()} className={cx('btn')}>Quay lại</button>
                                        <button onClick={() => hanldeStatusCreateImportCheck()} className={cx('btn')}>Nhập hàng</button>

                                    </Row>
                                    <Divider></Divider>
                                </Form>
                            </> : null
                    }

                    {
                        statusCreateImportDone ?
                            <>
                                {
                                    !resultImportStock ?
                                        <div className={cx('spinner')}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div> :
                                        <Result
                                            status="success"
                                            title="Bạn đã hoàn tất nhập hàng vào kho cửa hàng"
                                            subTitle="Mã phiếu nhập: 001"
                                            extra={[
                                                <button className={cx('btn')}>Hoàn thành</button>

                                            ]}
                                        />
                                }

                            </> : null
                    }
                </div>

            </div>
        </div>
    )
}

export default ImportstockimportstockLayout