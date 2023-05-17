import React, { useState ,useEffect } from "react";
import { Card, Button } from "@mui/material";
import Alert from "../components/Alert";
// import LoadingLayout from "./LoadingLayout";
import Loading from '../components/Loading';


export const Modal = () => {
 const [show, SetShow] = useState(false);
 const [openAlert, setOpenAlert] = useState(false);
 const [isLoading, setIsLoading] = useState(false);


 useEffect(() => {
   const timer = setTimeout(() => {
     setIsLoading(false);
   }, 2000);


   return () => {
     clearTimeout(timer);
   };
 }, []);


 const handleButtonClick = () => {
   setOpenAlert(true);
   SetShow(true);
 };


 const handleAlertClose = () => {
   setOpenAlert(false);
 };
  console.log("show", show);
 return (
  
   <div>
     <Card>
       <h1 style={{ textAlign: "center" }}>common modal </h1>
       <div style={{ margin: "0 auto", padding: "1rem", width: "23%" }}>
         <Button onClick={handleButtonClick} variant="contained" sx={{ marginRight: "1rem" }}>
           Show
         </Button>
         <Alert open={openAlert} onClose={handleAlertClose} message="Button is Show!" />
         {show === true ? <Button variant="contained">Hied</Button> : <></>}
       </div>
     </Card>
   </div>
  
 );
};
