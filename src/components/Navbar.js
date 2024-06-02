import React from "react";
import Menu from "./Menu";

function Navbar() {
  return (
    <div className="container navbar">
      <h5 style={{ cursor: "pointer" }}>Course build</h5>
      <Menu />
    </div>
  );
}

export default Navbar;
