import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../Redux/Customers/Cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartItem = ({ item,showButton }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleRemoveItemFromCart = () => {
    const data = { cartItemId: item?.id, jwt };
    dispatch(removeCartItem(data));
    window.location.reload(false);
  };
  const handleUpdateCartItem=(num)=>{
    const data={data:{quantity:item.quantity+num}, cartItemId:item?.id, jwt}
    dispatch(updateCartItem(data))
  }
  return (
    
    


    <div className="p-5 shadow-lg border rounded-md">
      <div class="row align-items-center">
    <div class="col-sm-4">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.product.imageUrl}
            alt=""
          />
    </div>
    <div class="col-sm-8">
    <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>
          <p className="opacity-70">Color: {item?.product?.color}</p>
          <p className="opacity-70 mt-2">Material: {item?.product?.material}</p>
          <div className="flex space-x-2 items-center pt-3">
            <p className="opacity-50 line-through">₹{item?.product.price}</p>
            <p className="font-semibold text-lg">
              ₹{item?.product.discountedPrice}
            </p>
            <p className="text-green-600 font-semibold">
              {item?.product.discountPersent}% off
            </p>
          </div>
        </div>
    </div>
  </div>
      
     {showButton&& <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2 ">
          <IconButton onClick={()=>handleUpdateCartItem(-1)} disabled={item?.quantity<=1} color="primary" aria-label="add an alarm">
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>
          <IconButton onClick={()=>handleUpdateCartItem(1)} color="primary" aria-label="add an alarm">
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
          
          <Button onClick={handleRemoveItemFromCart} variant="text">
            Remove Item{" "}
          </Button>
          
        </div>
      </div>}
    </div>
  );
};

export default CartItem;
