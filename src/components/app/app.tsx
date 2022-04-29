import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';
import {AppRoute} from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<CatalogScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
