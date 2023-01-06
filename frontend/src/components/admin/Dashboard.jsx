import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";

export default function Dashboard() {
  return (
    <nav className="w-48 min-h-screen bg-secondary border-r border-gray-300">
      <ul className="pl-5">
        <li>
          <Link to="/">
            <img src="./logo.png" alt="logo" className="h-14 p-2" />
          </Link>
        </li>
        <li>
          <NavItem to="/">
            <AiOutlineHome />
            <span>Home</span>
          </NavItem>
        </li>
        <li>
          <NavItem to="/movies">
            <BiMoviePlay />
            <span>Movies</span>
          </NavItem>
        </li>
        <li>
          <NavItem to="/actors">
            <FaUserNinja />
            <span>Actors</span>
          </NavItem>
        </li>
      </ul>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? "text-white" : "text-gray-400") + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};
