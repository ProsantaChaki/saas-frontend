// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Layout as DashboardLayout } from '../../layouts/dashboard/layout';
import Head from 'next/head';
import { Container, Stack, Typography } from '@mui/material';
import TabList from '@mui/lab/TabList';

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <DashboardLayout>

      <Head>
        <title>
          Settings | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
            <Typography variant="h4">
              Settings
            </Typography>

            <Card>
              <TabContext value={value}>
                <TabList
                  onChange={handleChange}
                  aria-label='account-settings tabs'
                  sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                  <Tab
                    value='account'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccountOutline />
                        <TabName>Account</TabName>
                      </Box>
                    }
                  />
                  <Tab
                    value='security'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LockOpenOutline />
                        <TabName>Security</TabName>
                      </Box>
                    }
                  />
                  <Tab
                    value='info'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <InformationOutline />
                        <TabName>Info</TabName>
                      </Box>
                    }
                  />
                </TabList>

                <TabPanel sx={{ p: 0 }} value='account'>
                  <TabAccount />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='security'>
                  <TabSecurity />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='info'>
                  <TabInfo />
                </TabPanel>
              </TabContext>
            </Card>
        </Container>
      </Box>
    </DashboardLayout>
  )
}

export default AccountSettings
