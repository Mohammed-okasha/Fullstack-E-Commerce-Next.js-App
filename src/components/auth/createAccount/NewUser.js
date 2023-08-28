import { useState } from "react";
import { useRouter } from "next/router";
import { Centring, Loading } from "@/components/UI";
import SignupForm from "./SignupForm";
import { createAccount } from "@/utils/auth";
import { userNotification } from "@/utils/notifications";
import { redirectRoute } from "@/utils/helpers";

const NewUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();

  const createUserAccountHandler = async (userData) => {
    setIsLoading(true);

    try {
      const result = await createAccount(userData);
      userNotification("success", result.message);
      redirectRoute(replace, "/account/login");
    } catch (error) {
      userNotification("error", error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Centring title="create an account">
        <SignupForm onCreateUserAccount={createUserAccountHandler} />
      </Centring>
    </>
  );
};

export default NewUser;
