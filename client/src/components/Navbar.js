import React, { useEffect, useState } from "react";
import "./footNav.css";
import Logo from "../assets/logo-nav.png";
import { IoSearchSharp, IoMenu, IoCloseCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [showSide, setshowSide] = useState(false);
  const [categories, setcategories] = useState([]);
  console.log(window.location.pathname);

  useEffect(async () => {
    const datacategory = await axios
      .get("/api/category/all")
      .then((res) => setcategories(res.data.Categorys));
  }, []);

  return (
    <div>
      {categories ? (
        <div className="navbar">
          <IoMenu
            color="white"
            size="26"
            className="menu"
            onClick={() => setshowSide(!showSide)}
          />
          {showSide ? (
            <div className="sidebar">
              <IoCloseCircleOutline
                color="rgba(255, 255, 255, 0.5)"
                className="close"
                size="28"
                onClick={() => setshowSide(!showSide)}
              />
              <ul>
                <NavLink to="/" activeClassName="active-menu">
                  <li>Home</li>
                </NavLink>
                {categories.map((el) => (
                  <NavLink to={`/category/${el.key}`}>
                    <li>{el.title} </li>
                  </NavLink>
                ))}

                <NavLink to="/about">
                  <li>Contact</li>
                </NavLink>
              </ul>
            </div>
          ) : null}
          <NavLink to="/">
            <img src={Logo} alt="logo" />
          </NavLink>

          <ul className="main-ul">
            <NavLink to="/" activeClassName="active-menu">
              <li>Home</li>
            </NavLink>
            {categories.map((el) => (
              <NavLink to={`/category/${el.key}`} activeClassName="active-menu">
                <li>{el.title} </li>
              </NavLink>
            ))}
            <NavLink to="/about" activeClassName="active-menu">
              <li>Contact</li>
            </NavLink>
          </ul>

          <div className="search">
            <input type="text" placeholder="search..." />
            <IoSearchSharp color="#ECCB16" />
          </div>
        </div>
      ) : (
        <h>loading</h>
      )}
    </div>
  );
};

export default Navbar;
