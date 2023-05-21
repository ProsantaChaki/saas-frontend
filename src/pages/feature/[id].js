import { useCallback, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Stack, Card, Typography,Paper ,Grid  } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FEATURE_DETAILS } from '../../common/constantData/language';
import { fetchFeatureDetailsAPIGet } from '../../common/apiCall/api';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeatureDetailsAPIGet(id);
        setDetails(data?.data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
 
  return (
    <>
      <Head>
        <title>{FEATURE_DETAILS.TITLE} </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          
          <Card sx={{marginTop:"3rem"}}>
          <Typography variant="h6" sx={{marginLeft:"4.8rem",padding:"1rem"}}> {FEATURE_DETAILS.TITLE}</Typography>
          <Box sx={{ flexGrow: 1 ,width:"80%",margin:"0 auto",marginTop:"2rem"}}>
          
                
             
          <Grid container spacing={2} sx={{color:"#545353"}}>
            
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
         {FEATURE_DETAILS.MAME}
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        {details.name}
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        {FEATURE_DETAILS.DETAILS} 
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
          {details.details} 
        </Grid>
        

      </Grid>

      <Link href="add-feature">
                      <Button
                        variant="contained"
                        sx={{
                          background: "#00467a",
                          color: "white",
                          border: "",
                          marginTop:"1rem",
                          float:"right",
                          marginBottom:"1rem"
                        }}
                      >
                        {FEATURE_DETAILS.FEATURE_DETAILS_Button}
                      </Button>
                      </Link>

          </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
