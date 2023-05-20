import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, Grid, Typography ,TextField,Autocomplete,Card} from "@mui/material";
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
import { subscriptionCreateApiCall } from '../../common/apiCall/api';
import Alert from "../../components/Alert";
import { useRouter } from 'next/router';

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
  console.log('add subscription', props.userProfile)

  const  dummySubscriptionData = {
    "name" : "dummySubscriptionData",
    "duration": "30",
    "user_limit": "1",
    "storage_limit": "500",
    "price" :"0",
    "status":"1",
    "details": "Access anytime and anywhere Manage personal health records Upload documents and images Search Doctors"
  }
  const featuresData = [
    {
      id: "1",
      name: "EN",
    },
    {
      id: "2",
      name: "BN",
    },
  ];


  const initialValues = {
    name: "",
    user_limit: "",
    price: "",
    status:"1",
    // features: "",
    duration: "",
    storage_limit: "",
    details: "",
  };

  const storeSubscription=(data)=>{
    console.log('storeSubscription', data)
    subscriptionCreateApiCall({...data, token: props.userProfile?.token})
      .then((res)=>{
      console.log(res)
      }).catch((err)=>{
      console.log(err)
    })
  }

  // storeSubscription(dummySubscriptionData)

  // form field validation schema
  const validationSchema = Yup.object().shape({

      name: Yup.string().required("Name is required!"),
      user_limit: Yup.string().required("User limit is required!"),
      price: Yup.string().required("Price is required!"),
      //  features: Yup.string().required("features is required!"),
      duration: Yup.string().required("Duration is required!"),
      storage_limit: Yup.string().required("Storage limit is required!"),
      details: Yup.string().required("Details is required!"),
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setOptions(featuresData);
    };
    fetchData();
  }, []);



  const handleSubmit = async (values) => {

    storeSubscription(values);
    setResponseMessage("The request was successful");
    setOpenAlert(true);
    // Navigate to the "/coupon" page
  router.push('/subscription');
  };

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert(false);
  };
  return (
    <>
      <Head>
        <title>Add Subscription</title>
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
                <Typography variant="h4">Add New Subscription</Typography>
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
                      <Grid item xs={6}>
                        <div>
                        {touched.name && errors.name && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>
                          )}
                          <Field
                            size="small"
                            sx={{ mb: 3 ,}}
                            name="name"
                            as={TextField}
                            label="Name"
                            type="text"
                            fullWidth
                          />

                        </div>

                        <div>
                        {touched.user_limit && errors.user_limit && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{errors.user_limit}</div>
                          )}
                        <Field
                          size="small"
                          sx={{ mb: 3 }}
                          name="user_limit"
                          as={TextField}
                          label="User limit"
                          type="number"
                          fullWidth
                        />
                        </div>

                        <div>
                        {touched.price && errors.price && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{errors.price}</div>
                          )}
                        <Field
                          size="small"
                          sx={{ mb: 3 }}
                          name="price"
                          as={TextField}
                          label="Price"
                          type="number"
                          fullWidth
                        />
                        </div>




                          {/* <Field name="features">
                              {({ field, form }) => (
                                <Autocomplete
                                  {...field}
                                  value={selectedOption}
                                  onChange={(event, newValue) => {
                                    setSelectedOption(newValue);
                                    form.setFieldValue(
                                      "features",
                                      newValue ? newValue.name : ""
                                    );
                                    form.setFieldValue(
                                      "features",
                                      newValue ? newValue.id : ""
                                    );
                                  }}
                                  options={options}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select features"
                                      error={form.errors.userType && form.touched.userType}
                                      helperText={
                                        form.errors.userType &&
                                        form.touched.userType &&
                                        form.errors.userType
                                      }
                                      sx={{
                                        width: "100%",
                                        marginBottom: "20px",
                                      }}
                                    />
                                  )}
                                />
                              )}
                            </Field>  */}

                        {/* {error && <div>{error}</div>} */}

                      </Grid>
                      <Grid item xs={6}>

                      <div>
                        {touched.duration && errors.duration && (
                            <div style={{ color: 'red', fontSize: '12px' }}>{errors.duration}</div>
                          )}
                        <Field
                          size="small"
                          sx={{ mb: 3 }}
                          name="duration"
                          as={TextField}
                          type="text"
                          fullWidth
                        />
                        </div>

                        <div>
                        {touched.storage_limit && errors.storage_limit && (
                            <div  style={{ color: 'red', fontSize: '12px' }}>{errors.storage_limit}</div>
                          )}
                          <Field
                            size="small"
                            sx={{ mb: 3 }}
                            name="storage_limit"
                            as={TextField}
                            label="Storage limit"
                            type="text"
                            fullWidth
                          />

                        </div>
                        <div>
                        {touched.storage_limit && errors.storage_limit && (
                            <div  style={{ color: 'red', fontSize: '12px' }}>{errors.storage_limit}</div>
                          )}
                          <Field
                            size="small"
                            sx={{ mb: 3 }}
                            name="details"
                            as={TextField}
                            label="Details"

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
                      Submit
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

// export default Page;
export default connect(mapStateToProps, mapDispatchToProps)(Page);
