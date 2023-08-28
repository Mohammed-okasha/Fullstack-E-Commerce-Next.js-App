import { useState } from "react";
import { Centring, Loading } from "@/components/UI";
import LoginForm from "./LoginForm";
import { userLogin } from "@/utils/auth";
import { getData } from "@/utils/helpers";
import { sendData } from "@/api/http-util";
import { userNotification } from "@/utils/notifications";
//=============================================================
const LoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const userLoginHandler = async (userData) => {
    const userCart = getData("cart");
    const userWishlist = getData("wishlist");
    setIsLoading(true);

    try {
      await userLogin(userData);
      userNotification("success", "you are successfully logged in");

      // Store the user's cart And userWishlist in the database when it login
      if (userCart) {
        await sendData("/api/cart/user", userCart);
      }

      if (userWishlist) {
        await sendData("/api/wishlist/user", userWishlist);
      }
    } catch (error) {
      userNotification("error", error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Centring title="log in">
        <LoginForm onUserLogin={userLoginHandler} />
      </Centring>
    </>
  );
};

export default LoginUser;
