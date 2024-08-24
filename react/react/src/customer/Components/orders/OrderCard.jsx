import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();

  const showOrderStatus = (orderStatus) => {
    switch (orderStatus) {
      case "DELIVERED":
        return (
          <>
            <FiberManualRecordIcon
              sx={{ width: "15px", height: "15px" }}
              className="text-green-600 p-0 mr-2 text-sm"
            />
            <span>DELIVERED</span>
          </>
        );
      case "PENDING" || "CONFIRMED":
        return (
          <>
            <AdjustIcon
              sx={{ width: "15px", height: "15px" }}
              className="text-green-600 p-0 mr-2 text-sm"
            />
            <span>ORDER PLACED</span>
          </>
        );
      case "SHIPPED":
        return (
          <>
            <LocalShippingIcon
              sx={{ width: "15px", height: "15px" }}
              className="text-green-600 p-0 mr-2 text-sm"
            />
            <span>OUT FOR DELIVERY</span>
          </>
        );
      case "CANCELLED":
        return (
          <>
            <FiberManualRecordIcon
              sx={{ width: "15px", height: "15px" }}
              className="text-red-600 p-0 mr-2 text-sm"
            />
            <span>ORDER CANCELLED</span>
          </>
        );
    }
  };
  console.log("items ", item, order, item.orderStatus);
  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border ">
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div
            onClick={() => navigate(`/account/order/${order?.id}`)}
            className="flex cursor-pointer"
          >
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.product.imageUrl}
              alt=""
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product.title}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>Material: {item?.product?.material}</span>
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>₹{item?.price}</p>
        </Grid>
        <Grid item xs={4}>
          <p className="space-y-2 font-semibold">
            {/* {item?.orderStatus === "DELIVERED"? (
             <>
             <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>DELIVERED</span>

            </>
            ):  <>
               
                <AdjustIcon
                sx={{ width: "15px", height: "15px" }}
                className="text-green-600 p-0 mr-2 text-sm"
              />
              <span>ORDER PLACED</span>
              </>} */}

            {showOrderStatus(item?.orderStatus)}
          </p>
          {/* <p className="text-xs">Your Item Has Been Delivered</p> */}
          {item.orderStatus === "DELIVERED" && (
            <div
              onClick={() => navigate(`/account/rate/{id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
