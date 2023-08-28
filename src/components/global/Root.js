import { useAuth } from "@/hooks/use-auth";
import ThemeProvider from "@/styles/theme/ThemeProvider";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Loading } from "../UI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//===========================================================
const RootLayout = ({ children }) => {
  const { sessionLoading, cartLoading, wishlistLoading } = useAuth();

  if (sessionLoading || cartLoading || wishlistLoading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <ThemeProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default RootLayout;
