import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ModuleMenu from "./ModuleMenu";
import styles from "../App.module.css";
import { FaLink } from "react-icons/fa";
import LinkMenu from "../links/LinkMenu";
import { FaFilePdf } from "react-icons/fa6";
import ResourceMenu from "../resource/ResourceMenu";

const Module = () => {
  const [modules, setModules] = useState(
    JSON.parse(localStorage.getItem("modules")) || []
  );

  useEffect(() => {
    localStorage.setItem("modules", JSON.stringify(modules));
  }, [modules]);

  const handleDelete = (moduleId) => {
    const updatedModules = modules.filter((module) => module.id !== moduleId);
    setModules(updatedModules);
  };

  const handleRename = (id, newName) => {
    const updatedModules = modules.map((mod) =>
      mod.id === id ? { ...mod, name: newName } : mod
    );
    setModules(updatedModules);
  };

  const handleDrop = (moduleId, item) => {
    const updatedModules = modules.map((mod) => {
      if (mod.id === moduleId) {
        const alreadyAdded = (mod.links || [])
          .concat(mod.resources || [])
          .some((entry) => entry.id === item.id);
        if (alreadyAdded) {
          return mod;
        }
        if (item.type === "LINK") {
          return {
            ...mod,
            links: [...(mod.links || []), item],
          };
        } else if (item.type === "RESOURCE") {
          return {
            ...mod,
            resources: [...(mod.resources || []), item],
          };
        }
      }
      return mod;
    });
    setModules(updatedModules);
  };

  return (
    <div className="container">
      {modules.map((module) => (
        <DroppableModule
          key={module.id}
          module={module}
          onDelete={handleDelete}
          onRename={handleRename}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

const DroppableModule = ({ module, onDelete, onRename, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["LINK", "RESOURCE"],
    drop: (item) => onDrop(module.id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      <div
        ref={drop}
        className={`container ${styles.module_content}`}
        style={{ backgroundColor: isOver ? "lightgreen" : "white" }}
      >
        <div>
          <h6>
            <strong>{module.name}</strong>
          </h6>
          <h6 className="text-secondary">Add items to this module</h6>
        </div>
        <ModuleMenu
          module={module}
          onRename={onRename}
          moduleName={module.name}
          onDelete={() => onDelete(module.id)}
        />
      </div>
      <div>
        {module.links &&
          module.links.map((link, index) => (
            <div key={index} className={`container ${styles.drag}`}>
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
          ))}
        {module.resources &&
          module.resources.map((resource, index) => (
            <div key={index} className={`container ${styles.drag}`}>
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
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Module;
