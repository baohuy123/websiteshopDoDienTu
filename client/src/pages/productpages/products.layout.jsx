import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './styles/products.module.scss';
import axios from 'axios';
import { Col, Row, Select } from 'antd';
import { formatVND } from '../../utils/services.js'
import ListcategoryLayout from '../../components/listcategory/listcategory.layout.jsx';
import FooterLayout from '../../components/footer/footer.layout.jsx';

let cx = classNames.bind(styles);
const ProductsLayout = () => {

    const history = useHistory();

    const { CategoryID } = useParams();

    const [product, setProduct] = useState([]);
    const [brand, setBrand] = useState([]);
    const [categoryID, setCategoryID] = useState(CategoryID);

    const [selectProductFoCategory, setSelectProductFoCategory] = useState(true);
    const [selectAllProduct, setSelectAllProduct] = useState(false);

    const [selectAllProductForTopPrice, setSelectAllProductForTopPrice] = useState(false);
    const [selectAllProductForLowPrice, setSelectAllProductForLowPrice] = useState(false);

    const [selectedSortOption, setSelectedSortOption] = useState('top_price');

    const [selectedSortOptionBrand, setSelectedSortOptionBrand] = useState('');




    const getListProduct = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/products/getListProduct`);
            if (response.status === 200) {
                setProduct(response.data.productData[0]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getListBrand = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/products/getAllBrand`);
            if (response.status === 200) {
                setBrand(response.data.brandData[0]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadAllProduct = () => {
        try {
            setSelectProductFoCategory(false);
            setSelectAllProduct(true);
            setSelectAllProductForTopPrice(false);
            setSelectAllProductForLowPrice(false);
        } catch (e) {
            console.log(e);
        }
    }

    const loadProductForCategoryID = () => {
        return product.filter((item) => categoryID === '' || item.CategoryID === parseInt(categoryID));
    }

    const loadProductForSort = (sortDirection) => {
        try {
            const sortedProduct = [...product].sort((a, b) => {
                if (sortDirection === 'asc') {
                    return a.PriceProduct - b.PriceProduct;
                } else if (sortDirection === 'desc') {
                    return b.PriceProduct - a.PriceProduct;
                }
                return 0;
            });
            console.log(sortDirection)
            setProduct(sortedProduct);
            setSelectProductFoCategory(false);
            setSelectAllProduct(true);
            setSelectAllProductForTopPrice(sortDirection === 'asc');
            setSelectAllProductForLowPrice(sortDirection === 'desc');
        } catch (e) {
            console.log(e);
        }
    }

    const handleSelectChange = (value) => {
        setSelectedSortOption(value);
        setSelectedSortOptionBrand(value)
        console.log(value)
    }

    const handleFilterSortPrice = () => {
        if (selectedSortOption === 'top_price') {
            loadProductForSort('asc');
        } else if (selectedSortOption === 'low_price') {
            loadProductForSort('desc');
        }
    }

    const loadProductForBrand = () => {
        return product.filter((item) => categoryID === '' || item.BrandID === parseInt(selectedSortOptionBrand));
    }

    const handleFilterSortBrand = () => {
        setSelectAllProduct(false);

        loadProductForBrand();
    }

    const handleDetailProduct = (data) => {
        try {
            console.log(data)
            history.push({
                pathname: '/detailproduct',
                state: { data }
            });

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadProductForCategoryID();
    }, [CategoryID]);

    useEffect(() => {
        getListProduct();
        getListBrand();
        if (categoryID === 'allproduct') {
            loadAllProduct();

        }
    }, [CategoryID]);

    return (
        <div className={cx('product_main')}>
            <ListcategoryLayout />
            <Row>
                <Col span={18} push={6} className={cx('right')}>
                    <div className={cx('list_product')}>
                        <Row>
                            {
                                selectAllProduct ?
                                    <>
                                        {
                                            product.map((item, key) => {
                                                return (
                                                    <Col span={5} className={cx('box_product')}>
                                                        <div className={cx('img_product')}>
                                                            <img src={`${process.env.REACT_APP_MANAGEMENT_API_IMG}/product/${item.ImgProduct}`} alt={item.NameProduct} />
                                                            <span>{item.CategoryName}</span>
                                                        </div>
                                                        <div className={cx('name_product')}>
                                                            <span>{item.NameProduct}</span>
                                                        </div>
                                                        <div className={cx('price_product')}>
                                                            <span>{formatVND(item.PriceProduct)}</span>
                                                        </div>

                                                        <div className={cx('add_cart_product')}>
                                                            <button onClick={() => handleDetailProduct(item)}>Xem chi tiết</button>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </> : null
                            }
                            {selectAllProductForTopPrice || selectAllProductForLowPrice ?
                                <>
                                    {product.map((item, key) => {
                                        return (
                                            <Col span={5} className={cx('box_product')}>
                                                <div className={cx('img_product')}>
                                                    <img src={`${process.env.REACT_APP_MANAGEMENT_API_IMG}/product/${item.ImgProduct}`} alt={item.NameProduct} />
                                                    <span>{item.CategoryName}</span>
                                                </div>
                                                <div className={cx('name_product')}>
                                                    <span>{item.NameProduct}</span>
                                                </div>
                                                <div className={cx('price_product')}>
                                                    <span>{formatVND(item.PriceProduct)}</span>
                                                </div>

                                                <div className={cx('add_cart_product')}>
                                                    <button onClick={() => handleDetailProduct(item)}>Xem chi tiết</button>
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </> : null
                            }
                            {selectedSortOptionBrand || selectedSortOptionBrand ?
                                <>
                                    {loadProductForBrand().map((item, key) => {
                                        return (
                                            <Col span={5} className={cx('box_product')}>
                                                <div className={cx('img_product')}>
                                                    <img src={`${process.env.REACT_APP_MANAGEMENT_API_IMG}/product/${item.ImgProduct}`} alt={item.NameProduct} />
                                                    <span>{item.CategoryName}</span>
                                                </div>
                                                <div className={cx('name_product')}>
                                                    <span>{item.NameProduct}</span>
                                                </div>
                                                <div className={cx('price_product')}>
                                                    <span>{formatVND(item.PriceProduct)}</span>
                                                </div>

                                                <div className={cx('add_cart_product')}>
                                                    <button onClick={() => handleDetailProduct(item)}>Xem chi tiết</button>
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </> : null
                            }
                            {
                                selectProductFoCategory ?
                                    <>
                                        {
                                            loadProductForCategoryID().map((item, key) => {
                                                return (
                                                    <Col span={5} className={cx('box_product')}>
                                                        <div className={cx('img_product')}>
                                                            <img src={`${process.env.REACT_APP_MANAGEMENT_API_IMG}/product/${item.ImgProduct}`} alt={item.NameProduct} />
                                                            <span>{item.CategoryName}</span>
                                                        </div>
                                                        <div className={cx('name_product')}>
                                                            <span>{item.NameProduct}</span>
                                                        </div>
                                                        <div className={cx('price_product')}>
                                                            <span>{formatVND(item.PriceProduct)}</span>
                                                        </div>

                                                        <div className={cx('add_cart_product')}>
                                                            <button onClick={() => handleDetailProduct(item)}>Xem chi tiết</button>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </> : <div className={cx('box_product')}></div>
                            }

                        </Row>
                    </div>

                </Col>
                <Col span={6} pull={18} className={cx('left')}>
                    <div className={cx('title_category')}>
                        <p>Danh mục tùy chọn</p>


                        <div className={cx('btn_price')}>
                            <span>Lọc theo giá cả</span>
                        </div>
                        <div className={cx('select')}>
                            <Select className={cx('select_input')}
                                defaultValue="top_price"
                                onChange={(value) => handleSelectChange(value)}
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
                            />
                            <button onClick={() => handleFilterSortPrice()}>Lọc</button>

                        </div>
                        <div className={cx('all_product')}>
                            <button onClick={() => loadAllProduct()}>Hiển thị tất cả sản phẩm</button>
                        </div>
                        <div className={cx('product_brand_filter')}>
                            <span>Lọc theo thương hiệu</span>
                        </div>
                        <div className={cx('select')}>
                            <Select className={cx('select_input')}
                                onChange={(value) => handleSelectChange(value)}

                                options={
                                    brand &&
                                    brand.map((item) => ({
                                        value: item.BrandID,
                                        label: item.NameBrand,
                                    }))
                                }

                            />
                            <button onClick={() => handleFilterSortBrand()}>Lọc</button>

                        </div>
                    </div>
                </Col>
            </Row>
            <FooterLayout />
        </div>
    )
}

export default ProductsLayout