import React, { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import LinkMenu from "../links/LinkMenu";
import styles from "../App.module.css";

function Link() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const deleteLinks = JSON.parse(localStorage.getItem("links"));
    if (deleteLinks) {
      setLinks(deleteLinks);
    }
  }, []);

  const handleDelete = (linkId) => {
    const updatedLinks = links.filter((link) => link.id !== linkId);
    setLinks(updatedLinks);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
  };

  const handleRename = (id, newName) => {
    const updatedResources = links.map((res) =>
      res.id === id ? { ...res, name: newName } : res
    );
    setLinks(updatedResources);
    localStorage.setItem("uploadedData", JSON.stringify(updatedResources));
  };

  return (
    <div className="container">
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
          <LinkMenu
            links={item}
            onRename={handleRename}
            onDelete={() => handleDelete(item.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default Link;
