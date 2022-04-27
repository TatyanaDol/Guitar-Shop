import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import CatalogScreen from '../catalog-screen/catalog-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
