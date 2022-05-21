import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getIsError404 } from '../../store/site-process/selector';
import MainLayout from '../main-layout/main-layout';
import ProductCard from '../product-card/product-card';


function ProductScreen(): JSX.Element {
  const isError404 = useAppSelector(getIsError404);
  const navigate = useNavigate();
  useEffect(() => {

    if(isError404) {
      navigate('*');
    }

  }, [isError404]);


  return (
    <MainLayout>
      <ProductCard />
    </MainLayout>
  );
}

export default ProductScreen;
