import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import styles from "../App.module.css";
import ResourceMenu from "./ResourceMenu";

function Resource() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const deleteResources = JSON.parse(localStorage.getItem("uploadedData"));
    if (deleteResources) {
      setResources(deleteResources);
    }
  }, []);

  const handleDelete = (id) => {
    const updated = resources.filter((res) => res.id !== id);
    setResources(updated);
    localStorage.setItem("uploadedData", JSON.stringify(updated));
  };

  return (
    <div className="container">
      {resources.map((item, index) => (
        <div key={index} className={`container ${styles.pdf}`}>
          <div className={`p-1 d-flex gap-3`}>
            <div className={`m-2 ${styles.pdf_icons}`}>
              <FaFilePdf />
            </div>
            <div>
              <h6>{item.name}</h6>
              <h6 className="text-secondary">PDF</h6>
            </div>
          </div>
          <ResourceMenu onDelete={() => handleDelete(item.id)} />
        </div>
      ))}
    </div>
  );
}

export default Resource;
