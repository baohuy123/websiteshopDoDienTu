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
import AddnewproductLayout from './popups/addnewproduct.layout';

let cx = classNames.bind(styles);
const ProductsLayout = () => {
    const { Title } = Typography;
    const { Search } = Input;

    const [product, setProduct] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [showModalAddNew, setShowModalAddNew] = useState(false);

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'NameProduct',
            key: 'NameProduct',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'NameBrand',
            key: 'NameBrand',
        },
        {
            title: 'Thể loại',
            dataIndex: 'CategoryName',
            key: 'CategoryName',
        },
        {
            title: 'Giá',
            dataIndex: 'PriceProduct',
            key: 'PriceProduct',
        },
        {
            title: 'Xuất xứ',
            dataIndex: 'NationalProduct',
            key: 'NationalProduct',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'Color',
            key: 'Color',
        },
        {
            title: 'Năm sản xuất',
            dataIndex: 'LaunchYear',
            key: 'LaunchYear',
        },
        {
            title: 'Bảo hành',
            dataIndex: 'Guarantee',
            key: 'Guarantee',
            render: (text) => <a>{text} tháng</a>,

        },
        {
            title: 'Khối lượng',
            dataIndex: 'Mass',
            key: 'Mass',
        },
        {
            title: 'Kích thước',
            dataIndex: 'Size',
            key: 'Size',
        },
        {
            title: 'Tùy chọn',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button className={cx('btn_product_table_option_edit')}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Chỉnh sửa</span>
                    </button>
                    <button className={cx('btn_product_table_option_delete')}>
                        <i className="fa-solid fa-trash"></i>
                        <span>Xóa</span>
                    </button>
                </Space>
            ),
        },
    ];


    const getListProduct = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/products/getListProduct`);
            if (response.status === 200) {
                setProduct(response.data.productData[0]);
            }
        } catch (error) {
            toast.error('Lỗi hệ thống', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
        }
    }

    const showModalNewProduct = (values) => {
        setShowModalAddNew(values);

    };

    const handleFalseModal = (values) => {
        setShowModalAddNew(values);
    };

    const searchDataNameProduct = product.filter((item) =>
        item.NameProduct.toLowerCase().includes(searchProduct.toLowerCase())
    );
    useEffect(() => {
        getListProduct();
    }, [])

    return (
        <div className={cx('dashboard')}>
            {
                showModalAddNew ?
                    <Modal width={1000}
                        open={showModalAddNew} footer={null} >
                        <div >
                            <AddnewproductLayout handleFalseModal={handleFalseModal} />

                        </div>
                    </Modal> : null
            }
            <div className={cx('title_admin')}>
                <Title className={cx('text')} level={5}>Quản lý sản phẩm</Title>
                <span >Trang quản lý sản phẩm</span>

            </div>
            <div className={cx('main_title')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title className={cx('title')} level={5}>Danh sách sản phẩm</Title>
                    <div className={cx('btn_product')}>
                        <Select
                            defaultValue='top_price'
                            className={cx('btn_product_select')}
                            options={[
                                {
                                    value: 'top_price',
                                    label: 'Sản phẩm giá cao nhất',
                                },
                                {
                                    value: 'low_price',
                                    label: 'Sản phẩm giá thấp nhất',
                                },

                            ]}
                            placement='bottomRight'
                            loading={true}
                        />
                        <input
                            placeholder='Tìm kiếm sản phẩm...'
                            className={cx('btn_product_search')}
                            onChange={(e) => setSearchProduct(e.target.value)}
                            value={searchProduct}


                        />
                        <button className={cx('btn_product_search_find')}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>


                        <button onClick={() => showModalNewProduct(true)} className={cx('btn_product_add')}>
                            <i className="fa-solid fa-plus"></i>
                            <span> Thêm sản phẩm</span>
                        </button>

                    </div>
                </div>

                <Table
                    style={{ padding: '10px', marginTop: '2vh', backgroundColor: 'white', borderRadius: '10px', marginLeft: '1vh', border: '1px solid #e8e8e8' }}
                    columns={columns}
                    dataSource={searchDataNameProduct}
                    rowKey="ProductID"
                    loading={product != null ? false : false}
                    pagination={{
                        pageSize: 5
                    }}
                    components={{
                        header: {
                            cell: (props) => <th style={{ backgroundColor: '#f5f5f5', borderRadius: '5px', color: 'black', textAlign: 'center' }}>{props.children}</th>,
                        },
                        body: {
                            cell: (props) => <td style={{ textAlign: 'center' }}>{props.children}</td>,
                        },
                    }} />;

            </div>
        </div >
    )
}

export default ProductsLayout