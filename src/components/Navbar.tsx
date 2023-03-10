import { FC } from "react";
import { Link } from "react-router-dom";
import { IElementsNavbar } from "../utils/elementsNavbar";

interface IPropsNavbar {
  elements: IElementsNavbar[];
}

const Navbar: FC<IPropsNavbar> = ({ elements }) => {
  return (
    <div className="nav-bar">
      <img
        className="logo"
        src="src/resources/carrito de compras.png"
        alt="Logo"
      />

      <ul className="navbar-links">
        {elements.map((item, index) => {
          return (
            <li key={index} className="nav-item active">
              <Link
                className="nav-item"
                style={{ marginLeft: "20px" }}
                to={item.url}
              >
                <span>{item.titulo}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
