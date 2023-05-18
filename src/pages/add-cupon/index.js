import {  useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Stack,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Card,
  InputAdornment,
  Chip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Page = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    zone_divisions_Id: "",
    zone_districts_Id: "",
    userTypeId: "",
    branch_id: "",
    payment_type: "",
    bank_number: "",
    operator_number: "",
    bank_name: "",
    account_name: "",
    routing_number: "",
  };

  // form field validation schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be 6 character length")
      .required("Password is required!"),
    email: Yup.string()
      .email("Invalid Email address")
      .email("Invalid Email address")
      .required("Email is required!"),

    firstName: Yup.string().required("FirstName is required!"),
    lastName: Yup.string().required("LastName is required!"),
    userName: Yup.string().required("Uer Name is required!"),
    phone: Yup.string().required("Phone is required!"),
    branch_id: Yup.string().required("branch is required!"),
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [options2, setOptions2] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const [options4, setOptions4] = useState([]);
  const [selectedOption5, setSelectedOption5] = useState([]);
  const [options5, setOptions5] = useState([]);

  const handleSelect = (event, values) => {
    setSelectedOption3(values);
  };

  const handleRemove = (valueToRemove) => {
    setSelectedOption3((prevSelectedValues) =>
      prevSelectedValues.filter((value) => value.label !== valueToRemove.label)
    );
  };

  const handleSelect2 = (event, values) => {
    setSelectedOption5(values);
  };

  const handleRemove2 = (valueToRemove) => {
    setSelectedOption5((prevSelectedValues) =>
      prevSelectedValues.filter((value) => value.label !== valueToRemove.label)
    );
  };

  const amount_type = [
    {
      id: "1",
      name: "Percentage",
    },
    {
      id: "2",
      name: "Flat",
    },
  ];

  const user_type = [
    {
      id: "1",
      name: "All user",
    },
    {
      id: "2",
      name: "Specific user",
    },
  ];

  const availableValues = [
    { label: "Apple" },
    { label: "Banana" },
    { label: "Cherry" },
    { label: "Durian" },
    { label: "Elderberry" },
  ];

  const subscription_plan = [
    {
      id: "1",
      name: "All subscription",
    },
    {
      id: "2",
      name: "Specific subscription",
    },
  ];

  //seve localStorage
  const storedValue = localStorage.getItem("user_type");
  const storedValue2 = localStorage.getItem("subscription_plan");
  const parsedValue = JSON.parse(storedValue);
  const parsedValue2 = JSON.parse(storedValue2);
  //show hide
  const [show1, setShow1] = useState([]);
  const [show2, setShow2] = useState([]);
  useEffect(() => {
    setShow1(parsedValue);
    setShow2(parsedValue2);
  }, [parsedValue, parsedValue2]);
  console.log(show1, "show1");

  useEffect(() => {
    const fetchData = async () => {
      setOptions(amount_type);
      setOptions2(user_type);
      setOptions4(subscription_plan);
    };
    fetchData();
  }, []);

  console.log(options, "options");

  const handleSubmit = async (values) => {
    setLoading(true);
  };
  return (
    <>
      <Head>
        <title>Add Coupon</title>
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
                <Typography variant="h4">Add New Coupon</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Card sx={{ marginTop: "3rem" }}>
            <Box sx={{ flexGrow: 1, width: "80%", margin: "0 auto", marginTop: "2rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ values, errors, touched, setFieldValue }) => (
                      <Form enctype="multipart/form-data">
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                          <Grid item xs={6}>
                            <div>
                              {touched.name && errors.name && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
                              )}
                              <Field
                                size="small"
                                sx={{ mb: 3 }}
                                name="code"
                                as={TextField}
                                label="Code"
                                type="text"
                                fullWidth
                              />
                            </div>

                            <div>
                              {touched.User_limit && errors.User_limit && (
                                <div style={{ color: "red", fontSize: "12px" }}>
                                  {errors.User_limit}
                                </div>
                              )}
                              <Field
                                size="small"
                                sx={{ mb: 3 }}
                                name="amount"
                                as={TextField}
                                label="Amount"
                                type="number"
                                fullWidth
                              />
                            </div>

                            <Field name="amount_type">
                              {({ field, form }) => (
                                <Autocomplete
                                  {...field}
                                  value={selectedOption}
                                  onChange={(event, newValue) => {
                                    setSelectedOption(newValue);
                                    form.setFieldValue(
                                      "amount_type",
                                      newValue ? newValue.name : ""
                                    );
                                    form.setFieldValue(
                                      "amount_typeID",
                                      newValue ? newValue.id : ""
                                    );
                                  }}
                                  options={options}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select amount type"
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
                            </Field>

                            {/* {error && <div>{error}</div>} */}

                            <div>
                              {touched.Price && errors.Price && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.Price}</div>
                              )}

                              <Field
                                size="small"
                                sx={{ mb: 3 }}
                                name="start_date"
                                as={TextField}
                                type="Date"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">Start Date</InputAdornment>
                                  ),
                                }}
                                fullWidth
                              />
                            </div>

                            <div>
                              {touched.Duration && errors.Duration && (
                                <div style={{ color: "red", fontSize: "12px" }}>
                                  {errors.Duration}
                                </div>
                              )}
                              <Field
                                size="small"
                                sx={{ mb: 3 }}
                                name="expire_date"
                                as={TextField}
                                type="date"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">Expire Date</InputAdornment>
                                  ),
                                }}
                                fullWidth
                              />
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <Field name="user_type">
                              {({ field, form }) => (
                                <Autocomplete
                                  {...field}
                                  value={selectedOption2}
                                  onChange={(event, newValue) => {
                                    localStorage.setItem(
                                      "user_type",
                                      JSON.stringify(newValue.name)
                                    );
                                    setSelectedOption2(newValue);
                                    form.setFieldValue("user_type", newValue ? newValue.name : "");
                                    form.setFieldValue("user_typeID", newValue ? newValue.id : "");
                                  }}
                                  options={options2}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select user type"
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
                            </Field>

                            {/* {error && <div>{error}</div>} */}

                            {show1 === "Specific user" ? (
                              <div>
                                <Autocomplete
                                  multiple
                                  options={availableValues}
                                  getOptionLabel={(option) => option.label}
                                  value={selectedOption5}
                                  onChange={handleSelect2}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select multiple users"
                                      variant="outlined"
                                      sx={{
                                        width: "100%",
                                        marginBottom: "20px",
                                      }}
                                    />
                                  )}
                                  renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                      <Chip
                                        key={index}
                                        label={option.label}
                                        onDelete={() => handleRemove2(option)}
                                        {...getTagProps({ index })}
                                      />
                                    ))
                                  }
                                />
                              </div>
                            ) : (
                              <></>
                            )}

                            <Field name="subscription_plan">
                              {({ field, form }) => (
                                <Autocomplete
                                  {...field}
                                  value={selectedOption4}
                                  onChange={(event, newValue) => {
                                    localStorage.setItem(
                                      "subscription_plan",
                                      JSON.stringify(newValue.name)
                                    );
                                    setSelectedOption4(newValue);
                                    form.setFieldValue(
                                      "subscription_plan",
                                      newValue ? newValue.name : ""
                                    );
                                    form.setFieldValue(
                                      "subscription_plan_id",
                                      newValue ? newValue.id : ""
                                    );
                                  }}
                                  options={options4}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select user type"
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
                            </Field>

                            {/* {error && <div>{error}</div>} */}

                            {show1 === "Specific user" ? (
                              <div>
                                <Autocomplete
                                  multiple
                                  options={availableValues}
                                  getOptionLabel={(option) => option.label}
                                  value={selectedOption3}
                                  onChange={handleSelect}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select multiple users"
                                      variant="outlined"
                                      sx={{
                                        width: "100%",
                                        marginBottom: "20px",
                                      }}
                                    />
                                  )}
                                  renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                      <Chip
                                        key={index}
                                        label={option.label}
                                        onDelete={() => handleRemove(option)}
                                        {...getTagProps({ index })}
                                      />
                                    ))
                                  }
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </Grid>
                        </Grid>
                        <div style={{ width: "50%", margin: "0 auto" }}>
                          <LoadingButton
                            fullWidth
                            type="submit"
                            color="primary"
                            // loading={loading}
                            variant="contained"
                            sx={{
                              background: "#00467a",
                              color: "white",
                              mb: 2,
                              mt: 5,
                            }}
                          >
                            Submit
                          </LoadingButton>
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

export default Page;
