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
import styles from '../styles/addnewaccount.module.scss';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let cx = classNames.bind(styles);
const AddnewaccountLayout = ({ handleFalseModal }) => {

    const { Title } = Typography;

    const handleFalseModalAddNew = (value) => {
        handleFalseModal(value)
    }
    const [department, setDepartment] = useState()
    const [data, setData] = useState({
        Email: '',
        FullName: '',
        Address: '',
        Phone: '',
        DepartmentID: '',
    })

    const handleChange = (e) => {
        let updatedData;

        if (e.target) {
            const { id, value } = e.target;
            updatedData = { ...data, [id]: value };
        } else if (e.value !== undefined) {
            updatedData = { ...data, DepartmentID: e.value };
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

    const loadAllDepartment = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/accounts/getListDepartment`);
            if (response.data.departmentData != null) {
                setDepartment(response.data.departmentData[0])
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadAllDepartment();
    }, [])


    const handleAddNewAccount = async () => {
        try {
            const dataAccount = {
                Email: data.Email,
                FullName: data.FullName,
                Address: data.Address,
                Phone: data.Phone,
                DepartmentID: data.DepartmentID,
            }
            console.log(dataAccount)
            const response = await axios.post(`${process.env.REACT_APP_MANAGEMENT_API}/accounts/createNewAccount`, dataAccount, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                toast.success('Tạo tài khoản nhân viên thành công', { position: "top-center", autoClose: 5000, theme: "light", progress: 0 });
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
            <Title level={3}>Tạo mới tài khoản nhân viên</Title>

            <Title level={5}>Tên nhân viên</Title>
            <Form.Item name='FullName' id='FullName' onChange={handleChange}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên nhân viên',
                    },
                ]}>
                <Input
                    style={{ padding: '10px', fontSize: '15px' }} />
            </Form.Item>
            <Row>
                <Col span={8}>
                    <Title level={5}>Email</Title>
                    <Form.Item name='Email' id='Email' onChange={handleChange}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email nhân viên',
                            },
                        ]}>
                        <Input
                            style={{ padding: '10px', fontSize: '15px' }} />
                    </Form.Item>
                </Col>
                <Col span={7} style={{ marginLeft: '1vh', marginRight: '1vh' }}>
                    <Title level={5}>Số điện thoại</Title>
                    <Form.Item name='Phone' id='Phone' onChange={handleChange}
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
                <Col span={7} style={{ marginLeft: '1vh', marginRight: '1vh' }}>
                    <Title level={5}>Cấp bậc</Title>
                    <Select id='DepartmentID' name='DepartmentID' onChange={(value) => handleSelectChange('DepartmentID', value)}

                        style={{ fontSize: '15px', height: '5vh', width: '100%' }}
                        options={
                            department &&
                            department.map((item) => ({
                                value: item.DepartmentID,
                                label: item.DepartmentName,
                            }))
                        }
                    />
                </Col>
            </Row>


            <Title level={5}>Địa chỉ</Title>
            <Form.Item name='Address' id='Address' onChange={handleChange}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập địa chỉ nhân viên',
                    },
                ]}>
                <Input
                    style={{ padding: '10px', fontSize: '15px' }} />
            </Form.Item>

            <Row>
                <Col span={11}>
                    <Form.Item >
                        <button onClick={() => handleAddNewAccount()} className={cx('btn')}>Thêm</button>
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

export default AddnewaccountLayout