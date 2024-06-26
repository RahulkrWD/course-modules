import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { FaLink } from "react-icons/fa";
import LinkMenu from "../links/LinkMenu";
import styles from "../App.module.css";

const Link = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem("links"));
    if (storedLinks) {
      setLinks(storedLinks);
    }
  }, []);

  const handleDelete = (linkId) => {
    const updatedLinks = links.filter((link) => link.id !== linkId);
    setLinks(updatedLinks);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
  };

  const handleRename = (linkId, newName) => {
    const updatedLinks = links.map((link) =>
      link.id === linkId ? { ...link, name: newName } : link
    );
    setLinks(updatedLinks);
    localStorage.setItem("links", JSON.stringify(updatedLinks));
  };

  return (
    <div className="container">
      {links.map((link) => (
        <DraggableLink
          key={link.id}
          link={link}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const DraggableLink = ({ link, onRename, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LINK",
    item: { ...link, type: "LINK" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`container ${styles.links}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={`p-1 d-flex gap-3`}>
        <div className={`m-2 ${styles.link_icons}`}>
          <FaLink />
        </div>
        <div>
          <h6>{link.name}</h6>
          <h6 className="text-secondary">Link</h6>
        </div>
      </div>
      <LinkMenu
        links={link}
        onRename={onRename}
        onDelete={() => onDelete(link.id)}
      />
    </div>
  );
};

export default Link;
