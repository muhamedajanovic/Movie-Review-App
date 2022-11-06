import React from "react";

export default function Submit({ value }) {
  return (
    <input
      type="submit"
      className="w-full rounded bg-white hover:bg-opacity-90 transition font-semibold text-lg text-secondary cursor-pointer"
      value={value}
    ></input>
  );
}
