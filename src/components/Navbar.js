import React from "react";
import Menu from "./Menu";

function Navbar() {
  return (
    <div className="container navbar">
      <h5 style={{ cursor: "pointer" }}>Course builder</h5>
      <Menu />
    </div>
  );
}

export default Navbar;
