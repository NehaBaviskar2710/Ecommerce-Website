// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUser } from '../../Redux/Auth/Action'
import { CardHeader } from '@mui/material'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})
const salesData = [
    {
      stats: '245k',
      title: 'Sales',
      color: 'primary',
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: '12.5k',
      title: 'Customers',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: '1.54k',
      color: 'warning',
      title: 'Products',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: '$88k',
      color: 'info',
      title: 'Revenue',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    }
  ]
const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

const SellerOverview = () => {
  // ** Hook
  const theme = useTheme()

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'


  const navigate = useNavigate();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  var today = new Date();
var time = today.getHours();
var greet;


if (time > 0 && time <= 12) {
  greet = 'Good Morning!';
} else if (time > 12 && time <= 18) {
  greet = 'Good Afternoon!';
} else if (time > 18 && time <= 24) {
  greet = 'Good evening!';
} else {
  greet = '';
}


  useEffect(()=>{
    if(jwt){
      dispatch(getUser(jwt))
    }
  
  },[jwt])

  console.log("Profile :",auth.user);

  return (
  
       <Card sx={{ position: 'relative' }}>

      <CardContent>
        
      <Typography variant='h6' sx={{ letterSpacing: '0.25px' }}>
          Hello, {greet}
        </Typography>
        
        <Typography variant='h5' sx={{ my: 3.1, color: 'primary.main' }}>
        {auth?.user?.firstName} {auth?.user?.lastName}
        </Typography>
        <Typography variant='body2' >Email : {auth?.user?.email}</Typography>
        {/* <Button size='small' variant='contained'>
          View Sales
        </Button> */}
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/userLogo.png'  />
      </CardContent>
    </Card>
   
   
  )
}

export default SellerOverview;
