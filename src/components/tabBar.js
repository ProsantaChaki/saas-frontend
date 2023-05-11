// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

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

const TabBarComponent = (props) => {
  // ** State
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    props.setTabItem(newValue)
    setValue(newValue)
  }
  console.log(props.data)

  return (
          <TabList
            onChange={props.handleChange}
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
  )
}

export default TabBarComponent
