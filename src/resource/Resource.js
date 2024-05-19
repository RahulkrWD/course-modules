import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
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

  const handleDownload = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.pdf`;
    link.click();
  };

  return (
    <div className="container">
      {resources.map((item, index) => (
        <DraggableResource
          key={index}
          resource={item}
          onRename={handleRename}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      ))}
    </div>
  );
}

const DraggableResource = ({ resource, onRename, onDelete, onDownload }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "RESOURCE",
    item: { ...resource, type: "RESOURCE" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`container ${styles.pdf}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={`p-1 d-flex gap-3`}>
        <div className={`m-2 ${styles.pdf_icons}`}>
          <FaFilePdf />
        </div>
        <div>
          <h6>{resource.name}</h6>
          <h6 className="text-secondary">PDF</h6>
        </div>
      </div>
      <ResourceMenu
        resource={resource}
        onRename={onRename}
        onDelete={() => onDelete(resource.id)}
        onDownload={() => onDownload(resource.fileData, resource.name)}
      />
    </div>
  );
};

export default Resource;
