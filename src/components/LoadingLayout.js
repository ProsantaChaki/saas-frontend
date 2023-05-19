import React from 'react';
import Loading from './Loading';


const LoadingLayout = ({ isLoading, children }) => {
 return (
   <>
     {isLoading ? (
       <Loading />
     ) : (
       <div style={{ minHeight: '100vh' }}>{children}</div>
     )}
   </>
 );
};


export default LoadingLayout;
