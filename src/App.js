import React from "react";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";
import Link from "./links/Link";
import Resource from "./resource/Resource";
import Module from "./module/Module";

function App() {
  const modules = JSON.parse(localStorage.getItem("modules")) || [];
  const links = JSON.parse(localStorage.getItem("links")) || [];
  const resources = JSON.parse(localStorage.getItem("uploadedData")) || [];

  const hasContent =
    modules.length > 0 || links.length > 0 || resources.length > 0;

  return (
    <div>
      <Navbar />
      {hasContent ? (
        <>
          <Module />
          <Link />
          <Resource />
        </>
      ) : (
        <center className={styles.header_container}>
          <div>
            <img className={styles.empty_image} src="/image/empty.jpg" alt="" />
          </div>
          <h3>Nothing added here yet</h3>
          <p>Click on the [+] Add button to add items to this course</p>
        </center>
      )}
    </div>
  );
}

export default App;
