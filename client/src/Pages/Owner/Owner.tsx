import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { setComplex } from '../../App/complexSlice';
import store from '../../App/Store';
import Layout from '../../Components/layout/Layout';
import { OwnerMenu } from '../../Components/OwnerMenu';
import { GetComplexQuery } from '../../Functions/ComplexQuery';

import OwnerRegister from './OwnerRegister';
import Loader from '../../Components/Loader/Loader';

const Owner = () => {
  const isOwner = useSelector<any>((state) => state.user?.user?.owner);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    GetComplexQuery()
      .then((value) => {
        if (value) {
          store.dispatch(setComplex(value));
          setLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  return (
    <>
      {loader ? (
        <Loader />
      ) : isOwner ? (
        <>
          <Layout title="Popietarios" bg="bg-tenis-desktop bg-cover bg-[30%]">
            <OwnerMenu />
          </Layout>
        </>
      ) : (
        <OwnerRegister />
      )}
    </>
  );
};

export default Owner;
