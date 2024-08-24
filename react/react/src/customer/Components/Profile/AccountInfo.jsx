
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { logout } from "../../../Redux/Auth/Action";
import { useDispatch } from "react-redux";

export const AccountInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="input-box">
        <div
          style={{
            display: "flex",
            marginTop: "3%",
            width: "100%",
            padding: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px"
          }}
        >
          <div className="account-box" style={{ marginTop: "10px" }} onClick={() =>{dispatch(logout());navigate('/');}}>
            <img
              style={{ width: "30px" }}
              src="https://cdn-icons-png.flaticon.com/128/2529/2529508.png"
              alt="icon"
            />
            <p> Logout </p>
          </div>
          <div className="account-box" style={{ marginTop: "10px" }} onClick={() => {navigate("/account/order")}}>
            <img
              style={{ width: "30px" }}
              src="https://cdn-icons-png.flaticon.com/128/11482/11482445.png"
              alt="icon"
            />
            <p>My Orders</p>
          </div>
          <div className="account-box" style={{ marginTop: "10px" }} onClick={() => navigate("/cart")}>
            <img
              style={{ width: "30px" }}
              src="https://cdn-icons-png.flaticon.com/128/4903/4903482.png"
              alt="icon"
            />
            <p> My Bag</p>
          </div>
        </div>
      </div>
    </>
  );
};
