import React, { useEffect, useState } from 'react'
import {
    Select,
    Form,
    Input,
    Typography,
    Upload,
    Row,
    Col,
    InputNumber
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from '../styles/addnewproduct.module.scss';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let cx = classNames.bind(styles);
const AddnewproductLayout = ({ handleFalseModal }) => {


    const { Title } = Typography;


    const handleFalseModalAddNew = (value) => {
        handleFalseModal(value)
    }
    const [category, setCategory] = useState()
    const [brand, setBrand] = useState()

    const [data, setData] = useState({
        NameProduct: '',
        BrandID: '',
        CategoryID: '',
        ImgProduct: '',
        NationalProduct: '',
        DescProduct: '',
        PriceProduct: '',
        Model: '',
        Color: '',
        LaunchYear: '',
        Guarantee: '',
        Mass: '',
        Size: '',
    })

    const handleImageChange = (event) => {
        const imgurSelect = event.target.files[0];
        setData({
            ...data,
            ImgProduct: imgurSelect,
        });
    };


    const handleChange = (e) => {
        let updatedData;

        if (e.target) {
            const { id, value } = e.target;
            updatedData = { ...data, [id]: value };
        } else if (e.value !== undefined) {
            updatedData = { ...data, CategoryID: e.value };
        } else {
            console.error("Unhandled event type");
            return;
        }
        setData(updatedData);
    };


    const handleSelectChange = (fieldName, value) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };


    const loadAllCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/products/getAllCategory`);
            if (response.data.categoryData[0] != null) {
                setCategory(response.data.categoryData[0])
            }
        } catch (e) {
            console.log(e)
        }
    }

    const loadAllBrand = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/products/getAllBrand`);
            if (response.data.brandData[0] != null) {
                setBrand(response.data.brandData[0])
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadAllCategory();
        loadAllBrand();
    }, [])


    const handleAddNewProduct = async () => {
        try {
            const dataProduct = {
                NameProduct: data.NameProduct,
                BrandID: data.BrandID,
                CategoryID: data.CategoryID,
                ImgProduct: data.ImgProduct,
                NationalProduct: data.NationalProduct,
                DescProduct: data.DescProduct,
                PriceProduct: data.PriceProduct,
                Model: data.Model,
                Color: data.Color,
                LaunchYear: data.LaunchYear,
                Guarantee: data.Guarantee,
                Mass: data.Mass,
                Size: data.Size
            }
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/products/addNewProduct`, dataProduct, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                toast.success(response.data.success, { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
                handleFalseModal(false)

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
    };

    return (
        <Form layout='vertical' method="post" enctype="multipart/form-data">
            <Title level={3}>Thêm mới sản phẩm</Title>

            <Title level={5}>Tên sản phẩm</Title>
            <Form.Item name='NameProduct' id='NameProduct' onChange={handleChange}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên sản phẩm',
                    },
                ]}>
                <Input
                    style={{ padding: '10px', fontSize: '15px' }} />
            </Form.Item>
            <Row>
                <Col span={8}>
                    <Title level={5}>Mẫu mã</Title>
                    <Form.Item name='Model' id='Model' onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mẫu mã sản phẩm',
                            },
                        ]}>
                        <Input
                            style={{ padding: '10px', fontSize: '15px' }} />
                    </Form.Item>
                </Col>
                <Col span={7} style={{ marginLeft: '1vh', marginRight: '1vh' }}>
                    <Title level={5}>Màu sắc</Title>
                    <Form.Item name='Color' id='Color' onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập màu sắc sản phẩm',
                            },
                        ]}>
                        <Input
                            style={{ padding: '10px', fontSize: '15px' }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Title level={5}>Xuất xứ</Title>
                    <Form.Item name='NationalProduct' id='NationalProduct' onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập xuất xứ sản phẩm',
                            },
                        ]}>
                        <Input
                            style={{ padding: '10px', fontSize: '15px' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={8}>
                    <Title level={5}>Năm ra mắt</Title>
                    <Form.Item name='LaunchYear' id='LaunchYear' onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập năm ra mắt sản phẩm',
                            },
                        ]}>
                        <Input
                            style={{ padding: '10px', fontSize: '15px' }} />
                    </Form.Item>
                </Col>
                <Col span={7} style={{ marginLeft: '1vh', marginRight: '1vh' }}>
                    <Title level={5}>Khối lượng</Title>
                    <Form.Item name='Mass' id='Mass' onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập khối lượng sản phẩm',
                            },
                        ]}>
                        <Input
                            style={{ padding: '10px', fontSize: '15px' }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Title level={5}>Bảo hành</Title>
                    <Form.Item name='Guarantee' id='Guarantee' onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn thời gian bảo hành sản phẩm',
                            },
                        ]}>
                        <InputNumber
                            style={{ fontSize: '15px', width: '100%', height: '5vh' }} />
                    </Form.Item>
                </Col>
            </Row>


            <Row>
                <Col span={8}>
                    <Title level={5}>Kích thước</Title>
                    <Form.Item name='Size' id='Size' onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập kích thước sản phẩm',
                            },
                        ]}>
                        <Input
                            style={{ padding: '10px', fontSize: '15px' }} />
                    </Form.Item>
                </Col>
                <Col span={7} style={{ marginLeft: '1vh', marginRight: '1vh' }}>
                    <Title level={5}>Thương hiệu</Title>
                    <Select id='BrandID' name='BrandID' onChange={(value) => handleSelectChange('BrandID', value)}

                        style={{ fontSize: '15px', height: '5vh', width: '100%' }}
                        options={
                            brand &&
                            brand.map((item) => ({
                                value: item.BrandID,
                                label: item.NameBrand,
                            }))
                        }
                    />
                </Col>
                <Col span={8}>
                    <Title level={5}>Giá</Title>
                    <Form.Item name='PriceProduct' id='PriceProduct' onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá sản phẩm',
                            },
                        ]}>
                        <InputNumber
                            style={{ fontSize: '15px', width: '100%', height: '5vh' }} />
                    </Form.Item>
                </Col>
            </Row>


            <Title level={5}>Miêu tả</Title>
            <Form.Item name='DescProduct' id='DescProduct' onChange={handleChange}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập miêu tả sản phẩm',
                    },
                ]}>
                <Input
                    style={{ padding: '10px', fontSize: '15px' }} />
            </Form.Item>


            <Row>
                <Col span={11}>
                    <Title level={5}>Hình ảnh</Title>
                    <Form.Item >
                        <input type="file" id="file" accept="image/*" onChange={handleImageChange} />


                    </Form.Item>
                </Col>
                <Col span={11} style={{ marginLeft: '4vh' }}>
                    <Title level={5}>Thể loại</Title>
                    <Select id='CategoryID' name='CategoryID' onChange={(value) => handleSelectChange('CategoryID', value)}
                        style={{ fontSize: '15px', height: '5vh', width: '100%' }}
                        options={
                            category &&
                            category.map((item) => ({
                                value: item.CategoryID,
                                label: item.CategoryName,
                            }))
                        }
                    />
                </Col>
            </Row>

            <Row>
                <Col span={11}>
                    <Form.Item >
                        <button onClick={() => handleAddNewProduct()} className={cx('btn')}>Thêm</button>
                    </Form.Item>
                </Col>
                <Col span={11} style={{ marginLeft: '4vh' }}>
                    <Form.Item >
                        <button onClick={() => handleFalseModalAddNew(false)} className={cx('btn')}>Hủy</button>
                    </Form.Item>
                </Col>
            </Row>





        </Form>
    )
}

export default AddnewproductLayout