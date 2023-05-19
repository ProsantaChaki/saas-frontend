import { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
import Stack from "@mui/material/Stack";
import getGlobalState from "../../stateManagement/global/globalSelector";
import {
  testDataUpdate,
  setIsAuthenticated,
} from "../../stateManagement/global/GlobalActionCreators";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  Box,
  Button,
  Link,
  TextField,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import getAuthState from "../../stateManagement/auth/AuthSelector";
import { loginApiCall } from '../../common/apiCall/api';
import { setUserProfileToReducer } from '../../stateManagement/auth/AuthActionCreators';

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  testData: getGlobalState(state)?.testData,
});

const mapDispatchToProps = (dispatch) => ({
  testDataUpdateProp: (data) => dispatch(testDataUpdate(data)),
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
  setIsAuthenticatedProp: (data) => dispatch(setIsAuthenticated(data)),
});

const Page = (props) => {
  console.log("................", props.testData, props.isAuthenticated);
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("email");

  const validationSchema = Yup.object().shape({
    // email: Yup.string().email("Invalid email address").required("Required"),
    // password: Yup.string().required("Required"),
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    auth.skip();
    router.push("/");
  }, [auth, router]);

  return (
    <>
      <div
        className="loginPaseLogo"
        style={{ textAlign: "center", marginTop: "4rem", marginBottom: "3rem" }}
      >
        <div>
          <Image src="/assets/logos/logo.jpeg" alt="logo" width={250} height={150} />
        </div>
      </div>

      <div className="loginPageCardSection">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <Grid container columns={12} spacing={1} sx={{ width: "75%" }} className="temImage">
            <Grid item xs={12} md={6} sm={12} sx={{ marginRight: "15px" }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center", fontWeight: "bold", letterSpacing: ".01em" }}
                  >
                    Log in to Saas
                  </Typography>
                  <Typography
                    sx={{ fontSize: 16, textAlign: "center", padding: "5px" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Don't have an account?
                    <a href="#" style={{ textDecoration: "none", color: "#3498db" }}>
                      Start a free trial
                    </a>
                  </Typography>

                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "Required";
                      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = "Invalid email address";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {

                      loginApiCall(values).then(response => {
                        console.log(response)
                        props.setUserProfileToReducerProp(response?.data);
                        props.setIsAuthenticatedProp({status: true});
                        auth.signIn(response?.data)
                            .then(r => {
                              router.push('/')
                            }).catch((err)=>{
                              console.log(err)
                            })

                      }).catch((err) => {
                        console.log(err)

                      })

                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: "1rem" }}>
                          <label>Email address or username</label>
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            style={{
                              width: "100%",
                              fontSize: "18px",
                              padding: "10px",
                              border: ".5px solid #9C9B9B",
                              marginBottom: "1rem",
                            }}
                          />
                          {errors.email && touched.email && errors.email}
                          <label>Email address or password</label>
                          <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            style={{
                              width: "100%",
                              fontSize: "18px",
                              padding: "10px",
                              border: ".5px solid #9C9B9B",
                            }}
                          />
                          {errors.password && touched.password && errors.password}
                        </div>
                        <div>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Keep me logged in" />
                          </FormGroup>
                        </div>
                        <div style={{ textAlign: "right", marginTop: "-2rem" }}>
                          <Link href="" sx={{ textDecoration: "none" }}>
                            Forgot password?
                          </Link>
                        </div>

                        <div>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            fullWidth
                            sx={{
                              background: "#0fb860",
                              borderRadius: "4px",
                              marginTop: "2rem",
                              fontWeight: "bold",
                              fontSize: "18px",
                            }}
                          >
                            Log in
                          </Button>
                        </div>
                        <Divider component="li" sx={{ marginTop: "10px" }}>
                          or
                        </Divider>
                      </form>
                    )}
                  </Formik>
                  <Stack direction="row" spacing={2} sx={{ marginTop: "1rem" }}>
                    <Button
                      variant="outlined"
                      startIcon={<GoogleIcon />}
                      fullWidth
                      sx={{ color: "#121212", border: "1px solid #a3a7a8" }}
                    >
                      Log in with Google
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ color: "#121212", border: "1px solid #a3a7a8" }}
                    >
                      Log in with SAML
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={5} sm={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <div>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ letterSpacing: ".01em", marginTop: "-1.5rem" }}
                    >
                      What's New
                    </Typography>
                  </div>
                  <div>
                    <CardMedia
                      sx={{ height: 240, marginTop: "10px" }}
                      image="/assets/aaa.jpeg"
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0" }}
                      >
                        Detect and Address Maintenance Trends quickly with these Widgets
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>

                    <Divider />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
