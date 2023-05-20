import {  useEffect, useState } from "react";
import Head from "next/head";
import { Box,  Container, Stack, Grid, Typography ,TextField,Card} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import getGlobalState from '../../stateManagement/global/globalSelector';
import { setUserProfileToReducer } from '../../stateManagement/auth/AuthActionCreators';
import { connect } from 'react-redux';
import getAuthState from '../../stateManagement/auth/AuthSelector';
import { featureCreateApiCall } from '../../common/apiCall/api';
import Alert from "../../components/Alert";
import { useRouter } from 'next/router';
import { SUBMIT, ADD_FEATURE } from '../../common/constantData/language';
import { ADMIN } from '../../common/constantData/screenUrl';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
});


const Page = (props) => {

  const router = useRouter();



  const initialValues = {
    name: "",
    details: "",
  };

  const handleSubmit=(data)=>{
    featureCreateApiCall({...data, token: props.userProfile?.token})
      .then((res)=>{
        setResponseMessage(ADD_FEATURE.ADD_SUCCESS_MESSAGE);
        setOpenAlert(true);
        router.push(ADMIN.FEATURE_PLAN_LIST);
      }).catch((err)=>{
      console.log(err)
    })
  }

  const validationSchema = Yup.object().shape({

      name: Yup.string().required(ADD_FEATURE.TITLE),
      details: Yup.string().required(ADD_FEATURE.DETAILS),
  });


  
  const [openAlert, setOpenAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

 

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert(false);
  };
  return (
    <>
      <Head>
        <title>{ADD_FEATURE.TITLE}</title>
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
                <Typography variant="h4">{ADD_FEATURE.TITLE}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Card sx={{marginTop:"3rem"}}>
          <Box sx={{ flexGrow: 1 ,width:"80%",margin:"0 auto",marginTop:"2rem"}}>

            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form encType="multipart/form-data">
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12}>
                        <div>
                        {touched.name && errors.name && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>
                          )}
                          <Field
                            size="small"
                            sx={{ mb: 3 ,}}
                            name="name"
                            as={TextField}
                            label={ADD_FEATURE.MAME}
                            type="text"
                            fullWidth
                          />

                        </div>

                      </Grid>
                      <Grid item xs={12}>

                      
                        <div>
                        {touched.storage_limit && errors.storage_limit && (
                            <div  style={{ color: 'red', fontSize: '12px' }}>{errors.storage_limit}</div>
                          )}
                          <Field
                            size="small"
                            sx={{ mb: 3 }}
                            name="details"
                            as={TextField}
                            label={ADD_FEATURE.DETAILS}
                            multiline
                            rows={4}
                            type="text"
                            fullWidth
                          />

                        </div>
                      </Grid>
                    </Grid>
                    <div style={{width:"50%",margin:"0 auto"}}>
                    <LoadingButton
                      fullWidth
                      type="submit"
                      color="primary"
                      // loading={loading}
                      variant="contained"
                      sx={{
                        background: "#00467a",
                        color: "white",
                        mb: 2, mt: 5
                      }}
                    >
                      {SUBMIT}
                    </LoadingButton>
                    <Alert open={openAlert} onClose={handleAlertClose} message={responseMessage} />
                    </div>

                  </Form>
                )}
              </Formik>
              </Grid>

            </Grid>

          </Box>
          </Card>
        </Container>
      </Box>

    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
