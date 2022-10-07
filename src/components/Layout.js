import React from 'react'
import { useRouter } from 'next/router';
import Header from './myHeader';

const Layout = ({ Component, pageProps }) => {
    const { asPath } = useRouter();
  
    return (
      <div>
        {asPath !== "/" ? <Header /> : null}
        <Component {...pageProps} />
      </div>
    );
  };

export default Layout