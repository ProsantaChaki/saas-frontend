import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const Loading = () => {
 return (
   <div
     style={{
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '100vh',
     }}
   >
   <CircularProgress size={60} />
   </div>
 );
};


export default Loading;
