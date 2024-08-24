// ** MUI Imports
import Grid from "@mui/material/Grid";
import AdminPannel from "../../Styles/AdminPannelWrapper";
import Achivement from "../tables/Achivement";
import { ThemeProvider, createTheme } from "@mui/material";
import { customTheme, darkTheme } from "../them/customeThem";
import "./Admin.css";
import RecentlyAddeddProducts from "../tables/RecentlyAddeddProducts";
import RecentOrders from "../tables/RecentOrders";
import {AssuredWorkloadIcon }from '@mui/icons-material';
import { BriefcaseVariantOutline, CurrencyUsd, HelpCircleOutline, Poll } from "mdi-material-ui";
import SellerOverview from "../tables/SellerOverview";
import SalesOverview from "../tables/SalesOverview";

const darkTheme1 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#312d4b',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

// bg-[#28243d]
const Dashboard = () => {
  return (
    <div className="adminContainer ">
      <ThemeProvider theme={customTheme}>
        <AdminPannel>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Achivement />
            </Grid>
            <Grid item xs={12} md={6}>
              <SellerOverview />
            </Grid>
            <Grid item xs={12} md={12}>
              <SalesOverview />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <RecentOrders />
            </Grid>
             <Grid item xs={12} md={12} lg={12}>
              <RecentlyAddeddProducts />
            </Grid>
          </Grid>
        </AdminPannel>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
