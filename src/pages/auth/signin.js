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
import { connect } from "react-redux";
import getGlobalState from "../../stateManagement/global/globalSelector";

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  test: getGlobalState(state)?.test,
  isOtpRequired: getAuthState(state)?.isOtpRequired,
});

const mapDispatchToProps = (dispatch) => ({
  /* authLoginApiCallProp: (data) => dispatch(authLoginApiCall(data)),
  authOtpRequireToggleProp: (data) => dispatch(authOtpRequireToggle(data)),*/
});

const Page = ({ isAuthenticated, test }) => {
  console.log(".........................", isAuthenticated, test);
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("email");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
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
          <Image src="/assets/logos/logo.svg" alt="logo" width={250} height={60} />
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
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                      console.log(values);
                      actions.setSubmitting(false);
                    }}
                  >
                    {({ errors, touched, values }) => (
                      <Form>
                        <div style={{ marginTop: "1rem" }}>
                          <label>Email address or username</label>
                          <TextField fullWidth id="fullWidth" />
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                          <label htmlFor="password">Password</label>
                          <TextField fullWidth type="password" id="fullWidth" />
                          {errors.password && touched.password && <div>{errors.password}</div>}
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
                      </Form>
                    )}
                  </Formik>
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
