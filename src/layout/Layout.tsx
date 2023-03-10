import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { elementsNavbar } from "../utils/elementsNavbar";

const Layout = () => {
  return (
    <div>
      <Navbar elements={elementsNavbar} />
      <Outlet />
    </div>
  );
};

export default Layout;
