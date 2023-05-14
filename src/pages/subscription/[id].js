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
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Subscription Details</Typography>
              </Stack>
             
            </Stack>
          </Stack>
          <Card sx={{marginTop:"3rem"}}>
          <Box sx={{ flexGrow: 1 ,width:"80%",margin:"0 auto",marginTop:"2rem"}}>
          <Grid container spacing={2}>
        <Grid  xs={4}>
          Name :
        </Grid>
        <Grid  xs={8}>
          
        </Grid>
        <Grid  xs={4}>
        DURATION :
        </Grid>
        <Grid  xs={8}>
          
        </Grid>
        <Grid  xs={4}>
        USER LIMIT :
        </Grid>
        <Grid  xs={8}>
          
        </Grid>
        <Grid  xs={4}>
        STORAGE LIMIT :
        </Grid>
        <Grid  xs={8}>
          
        </Grid>
        <Grid  xs={4}>
        PRICE :
        </Grid>
        <Grid  xs={8}>
          
        </Grid>
        <Grid  xs={4}>
        DETAILS :
        </Grid>
        <Grid  xs={8}>
          
        </Grid>
        <Grid  xs={4}>
        FEATURES :
        </Grid>
        <Grid  xs={8}>
          
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

          </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
