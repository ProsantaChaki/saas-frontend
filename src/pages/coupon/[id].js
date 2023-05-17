import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Stack, Card, Typography,Paper ,Grid  } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";



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
        code
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        Ad001sd
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Amount 
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        1580
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Amount Type 
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        percentage
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Start Date
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        12-04-2023
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Expire Date 
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        12-04-2023
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        User Type 
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
        All
        </Grid>
        <Grid  xs={4} sx={{marginBottom:"20px"}}>
        Subscription Plan Type
        </Grid>
        <Grid  xs={8} sx={{marginBottom:"20px"}}>
          All
        </Grid>

      </Grid>

      <Link href="/add-subscription">
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
                        Edit
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
                        DELETE
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
