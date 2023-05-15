import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Stack, Card, Typography,Paper ,Grid  } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { padding } from "@mui/system";



const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Subscription </title>
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
          <Typography variant="h6" sx={{marginLeft:"4.8rem",padding:"1rem"}}> Details</Typography>
          <Box sx={{ flexGrow: 1 ,width:"80%",margin:"0 auto",marginTop:"2rem"}}>
          
                
             
          <Grid container spacing={2} sx={{color:"#545353"}}>
            
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
         Name
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        Carson Darrin
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Email
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        carson@gmail.com
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Subscription Plan Id
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        001
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Mobile No
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        01755828281
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Country 
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
          India
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        status
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        Active
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Message 
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        ghasd haghgda ahgahgda hagd
        </Grid>

      </Grid>

      <Link href="">
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
                        Approve
                      </Button>
                      </Link>

                      <Link href="">
                      <Button
                        variant="contained"
                        sx={{
                          background: "red",
                          color: "white",
                          border: "",
                          marginTop:"1rem",
                          float:"right",
                          marginBottom:"1rem",
                          margin:"1rem"
                        }}
                      >
                        Cancel
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
