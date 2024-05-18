import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import styles from "../App.module.css";
import ResourceMenu from "./ResourceMenu";

function Resource() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("uploadedData"));
    if (storedResources) {
      setResources(storedResources);
    }
  }, []);

  const handleDelete = (id) => {
    const updatedResources = resources.filter((res) => res.id !== id);
    setResources(updatedResources);
    localStorage.setItem("uploadedData", JSON.stringify(updatedResources));
  };

  const handleRename = (id, newName) => {
    const updatedResources = resources.map((res) =>
      res.id === id ? { ...res, name: newName } : res
    );
    setResources(updatedResources);
    localStorage.setItem("uploadedData", JSON.stringify(updatedResources));
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
          <ResourceMenu
            resource={item}
            onRename={handleRename}
            onDelete={() => handleDelete(item.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default Resource;
