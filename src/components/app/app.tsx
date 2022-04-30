import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';
import {AppRoute} from '../../const';
import '../../styles/style.css';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<CatalogScreen />} />

        <Route path={AppRoute.CatalogPage} element={<CatalogScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
