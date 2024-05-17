import React from "react";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaFilePdf } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import LinkMenu from "./links/LinkMenu";

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
          {modules.map((item, index) => (
            <div key={index} className="container p-3">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div>
                    <h6>
                      <strong>{item.name}</strong>
                    </h6>
                    <h6 className="text-secondary">Add items to this module</h6>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <h4>Drag and drop</h4>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}

          {links.map((item, index) => (
            <div key={index} className={`container ${styles.links}`}>
              <div className={` p-1 d-flex gap-3`}>
                <div className={`m-2 ${styles.link_icons}`}>
                  <FaLink />
                </div>
                <div>
                  <h6>{item.name}</h6>
                  <h6 className="text-secondary">Link</h6>
                </div>
              </div>
              <div className={styles.link_menu}>
                <LinkMenu />
              </div>
            </div>
          ))}

          {resources.map((item, index) => (
            <div key={index} className={` container ${styles.pdf}`}>
              <div className={` p-1 d-flex gap-3 `}>
                <div className={`m-2 ${styles.pdf_icons}`}>
                  <FaFilePdf />
                </div>
                <div>
                  <h6>{item.name}</h6>
                  <h6 className="text-secondary">PDF</h6>
                </div>
              </div>
              <LinkMenu />
            </div>
          ))}
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
