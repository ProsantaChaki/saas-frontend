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
import { subscriptionCreateApiCall } from '../../common/apiCall/api';
import Alert from "../../components/Alert";
import { useRouter } from 'next/router';
import { SUBMIT, SUBSCRIPTION } from '../../common/constantData/language';
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

  const handleSubmit=(data)=>{
    subscriptionCreateApiCall({...data, token: props.userProfile?.token})
      .then((res)=>{
        setResponseMessage(SUBSCRIPTION.ADD_SUCCESS_MESSAGE);
        setOpenAlert(true);
        router.push(ADMIN.SUBSCRIPTION_PLAN_LIST);
      }).catch((err)=>{
      console.log(err)
    })
  }

  const validationSchema = Yup.object().shape({

      name: Yup.string().required(SUBSCRIPTION.REQUIRED.TITLE),
      user_limit: Yup.string().required(SUBSCRIPTION.REQUIRED.USER_LIMIT),
      price: Yup.string().required(SUBSCRIPTION.REQUIRED.PRICE),
      //  features: Yup.string().required("features is required!"),
      duration: Yup.string().required(SUBSCRIPTION.REQUIRED.DURATION),
      storage_limit: Yup.string().required(SUBSCRIPTION.REQUIRED.STORAGE),
      details: Yup.string().required(SUBSCRIPTION.REQUIRED.DETAILS),
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

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert(false);
  };
  return (
    <>
      <Head>
        <title>{SUBSCRIPTION.ADD_SUBSCRIPTION}</title>
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
                <Typography variant="h4">{SUBSCRIPTION.ADD_NEW_SUBSCRIPTION_PLAN}</Typography>
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
                            label={SUBSCRIPTION.TITLE}
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
                          label={SUBSCRIPTION.USER_LIMIT}
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
                          label={SUBSCRIPTION.PRICE}
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
                          label={SUBSCRIPTION.VALIDITY_IN_DAYS}
                          as={TextField}
                          type="number"
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
                            label={SUBSCRIPTION.STORAGE_LIMIT}
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
                            label={SUBSCRIPTION.DETAILS}
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
