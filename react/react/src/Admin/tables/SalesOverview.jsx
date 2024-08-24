// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'



// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import QrCodeIcon from '@mui/icons-material/QrCode';


import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductsByUser } from '../../Redux/Customers/Product/Action';
import { getOrders } from '../../Redux/Admin/Orders/Action'



const SalesOverview = () => {
  const navigate=useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { customersProduct } = useSelector((store) => store);
    const { adminsOrder } = useSelector((store) => store);

    useEffect(() => {
      dispatch(getOrders({ jwt }));
    }, [jwt,adminsOrder.delivered, adminsOrder.shipped, adminsOrder.confirmed]);
    console.log("Order status ",adminsOrder?.orders);
    useEffect(() => {
      const data = {
        category: "",
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 100000,
        minDiscount: 0,
        sort: "price_low",
        pageNumber:0,
        pageSize: 10,
        stock: "",
      };
      dispatch(findProductsByUser(data));
    }, []);
    console.log(customersProduct?.productListByUser?.content?.length);
  return (
    <Card>
      <CardHeader
        title='Sales Overview'
        
        
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
        
    <Grid item xs={12} sm={3}>
      <Box  sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `primary.main`
          }}
        >
          <RoomServiceIcon sx={{ fontSize: '1.75rem' }} />
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption' sx={{ fontSize: '1rem' }}>Total Orders</Typography>
          <Typography variant='h6'>{adminsOrder?.orders?.length}</Typography>
        </Box>
      </Box>
    </Grid>
    
    <Grid item xs={12} sm={3}>
      <Box  sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `info.main`
          }}
        >
          <WhereToVoteIcon sx={{ fontSize: '1.75rem' }} />
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption' sx={{ fontSize: '1rem' }}>Placed Orders</Typography>
          <Typography variant='h6'>{adminsOrder?.orders?.filter(order => order.orderStatus === 'PENDING').length}</Typography>
        </Box>
      </Box>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Box  sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `warning.main`
          }}
        >
          <QrCodeIcon sx={{ fontSize: '1.75rem' }} />
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption' sx={{ fontSize: '1rem' }} >Shipped Orders</Typography>
          <Typography variant='h6'>{adminsOrder?.orders?.filter(order => order.orderStatus === 'SHIPPED').length}</Typography>
        </Box>
      </Box>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Box  sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `success.main`
          }}
        >
          <LocalShippingIcon sx={{ fontSize: '1.75rem' }} />
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption' sx={{ fontSize: '1rem' }}>Delivered Orders</Typography>
          <Typography variant='h6'>{adminsOrder?.orders?.filter(order => order.orderStatus === 'DELIVERED').length}</Typography>
        </Box>
      </Box>
    </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SalesOverview;
