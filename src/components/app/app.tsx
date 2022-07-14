import React from 'react';
import {Route, Routes} from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';
import {AppRoute} from '../../const';
import '../../styles/style.css';
import ProductScreen from '../product-screen/product-screen';
import NotFound from '../not-found/not-found';
import CartScreen from '../cart-screen/cart-screen';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<CatalogScreen />} />

      <Route path={AppRoute.CatalogPage} element={<CatalogScreen />} />

      <Route path={AppRoute.ProductPage} element={<ProductScreen />} />

      <Route path={AppRoute.CartPage} element={<CartScreen />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
