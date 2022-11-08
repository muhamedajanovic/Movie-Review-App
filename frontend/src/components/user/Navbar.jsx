import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import Container from "../Container";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-secondary">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="./logo.png" alt="" className="h-10" />
          </Link>

          <ul className="flex items-center space-x-4">
            <li>
              <button className="bg-dark-subtle p-1 rounded">
                <BsFillSunFill className="text-secondary" size={24} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                placeholder="Search here"
              />
            </li>
            <li className="text-white font-semibold text-lg">
              <Link to="/auth/signin">Login</Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
