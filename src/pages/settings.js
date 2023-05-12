import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import getAuthState from '../stateManagement/auth/AuthSelector';
import { connect } from 'react-redux';
import { authLoginApiCall } from '../stateManagement/auth/AuthActionCreators';
import getGlobalState from '../stateManagement/global/globalSelector';


const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  testData: getGlobalState(state)?.testData,
  isOtpRequired: getAuthState(state)?.isOtpRequired,
});

const mapDispatchToProps = (dispatch) => ({
  authLoginApiCallProp: (data) => dispatch(authLoginApiCall(data)),
  /* authOtpRequireToggleProp: (data) => dispatch(authOtpRequireToggle(data)),*/
});


const Page = ({testData}) => {
  console.log('................', testData)
  return (
    <>
    <Head>
      <title>
        Settings | Devias Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Settings
          </Typography>
          <SettingsNotifications />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
)
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default connect(mapStateToProps, mapDispatchToProps)(Page);
