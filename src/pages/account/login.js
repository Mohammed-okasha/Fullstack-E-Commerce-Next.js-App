import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { LoginUser } from "@/components/auth";
// import { Loading } from "@/components/UI";
import { selectAuthState } from "@/store/slices/auth-slice";

const LoginPage = () => {
  const { session } = useSelector(selectAuthState);
  const { replace } = useRouter();

  if (session) {
    replace("/");
    return;
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="log in to your account by your email, you can change your password if you forgot it"
        />
      </Head>
      <LoginUser />
    </>
  );
};

export default LoginPage;
