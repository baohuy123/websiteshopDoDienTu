import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss'
import { useDispatch } from 'react-redux';
import { loginSuccess } from './actions/customer.actions';
import { useSelector } from 'react-redux';

import HeaderLayout from './components/header/header.layout';
import AdminLayout from './pages/managers/admin.layout';
import HomepageLayout from './pages/homepages/homepage.layout';
import ProductsLayout from './pages/productpages/products.layout';
import DetailproductLayout from './pages/productpages/detailproduct.layout';
import CartLayout from './pages/cartpages/cart.layout';

const App = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customerReducer.customer);

  useEffect(() => {
    const dataCustomer = localStorage.getItem("DataCustomer")

    if (dataCustomer) {
      if (dataCustomer) {
        dispatch(loginSuccess(dataCustomer));
      }
    }
  }, [dispatch]);





  return (

    <div className="app">
      <Switch>
        <Route path='/homepage'>
          <HeaderLayout />
          <HomepageLayout />
        </Route>
        <Route path='/detailproduct'>
          <HeaderLayout />
          <DetailproductLayout />
        </Route>
        <Route path='/productpage/:CategoryID'>
          <HeaderLayout />
          <ProductsLayout />
        </Route>
        <Route path='/cart'>
          <HeaderLayout />
          <CartLayout />
        </Route>
        <Route path='/admin'>
          <AdminLayout />
        </Route>

        <Redirect to='/homepage' />
      </Switch>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />

    </div >
  );
}

export default App;
