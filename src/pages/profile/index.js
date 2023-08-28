import { useState, useCallback } from "react";
import { useHttp } from "@/hooks/use-http";
import { getServerSession } from "next-auth";
import Head from "next/head";
import UserProfile from "@/components/profile/UserProfile";
import ChangePasswordModal from "@/components/modals/ChangePassword";
import { authOptions } from "../api/auth/[...nextauth]";
import { userNotification } from "@/utils/notifications";

const ProfilePage = ({ session }) => {
  const [openChangePass, setOpenChangePass] = useState(false);
  const { loading, sendRequest: changeUserPassword } = useHttp();

  const openChangePassModal = useCallback(() => setOpenChangePass(true), []);
  const closeChangePassModal = () => setOpenChangePass(false);

  const changePasswordHandler = async (passwordData) => {
    try {
      const result = await changeUserPassword({
        url: "/api/user/change-password",
        method: "PUT",
        body: passwordData,
        headers: { "Content-Type": "application/json" },
      });

      userNotification("success", result.message);
      closeChangePassModal();
    } catch (error) {
      userNotification("error", error.message);
    }
  };

  return (
    <>
      <Head>
        <title>{session.user.name}</title>
        <meta
          name="description"
          content="Welcome in Your Profile Page, here you can manage and update your data"
        />
      </Head>

      {openChangePass && (
        <ChangePasswordModal
          onCloseChangePassModal={closeChangePassModal}
          onChangePassword={changePasswordHandler}
          isLoading={loading}
        />
      )}
      <UserProfile
        session={session}
        onOpenChangePassModal={openChangePassModal}
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default ProfilePage;
