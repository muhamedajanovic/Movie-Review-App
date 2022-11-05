import React from "react";

export default function Navbar() {
  return (
    <div className="bg-secondary">
      <div className="text-white max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center"></div>
        <img src="./logo.png" alt="" className="h-10" />
        <ul>
          <li>Login</li>
        </ul>
      </div>
    </div>
  );
}
