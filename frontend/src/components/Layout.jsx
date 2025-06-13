import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-20 pb-16 container mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
