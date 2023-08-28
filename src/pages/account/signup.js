import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { NewUser } from "@/components/auth";
import { Loading } from "@/components/UI";

const SignUpPage = () => {
  const { replace } = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <Loading />;
  }

  if (session) {
    replace("/");
    return;
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta
          name="description"
          content="create an account in our DE-Store Website"
        />
      </Head>
      <NewUser />
    </>
  );
};

export default SignUpPage;
