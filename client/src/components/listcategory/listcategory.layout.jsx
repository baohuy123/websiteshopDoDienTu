import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import axios from 'axios';

let cx = classNames.bind(styles);
const ListcategoryLayout = () => {

    const history = useHistory();

    const [category, setCategory] = useState()

    const loadCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_MANAGEMENT_API}/products/getAllCategory`);
            if (response.data.categoryData != null) {
                setCategory(response.data.categoryData[0])
            }
        } catch (e) {
            console.log(e)
        }
    }

    const goToProductCategory = (value) => {
        history.push(`/productpage/${value}`)
        window.location.reload()

    }

    useEffect(() => {
        loadCategory()
    }, [])
    return (
        <div>
            <div className={cx('title_category')}>
                <span>
                    Danh mục sản phẩm


                </span>
            </div>
            <div className={cx('list_category')}>
                {
                    category && category.map((item, key) => {
                        return (
                            <div onClick={(CategoryID) => goToProductCategory(item.CategoryID)} className={cx('list_category_box')} key={item.CategoryID}>
                                <p className={cx('title_category_text')}>{item.CategoryName}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ListcategoryLayout