import React, { useState } from "react";
import ModuleMenu from "./ModuleMenu";
import styles from "../App.module.css";

export default function Module() {
  const [modules, setModules] = useState(
    JSON.parse(localStorage.getItem("modules")) || []
  );

  const handleDelete = (moduleName) => {
    const updatedModules = modules.filter((module) => module.id !== moduleName);
    setModules(updatedModules);
    localStorage.setItem("modules", JSON.stringify(updatedModules));
  };
  const handleRename = (id, newName) => {
    const updatedModules = modules.map((res) =>
      res.id === id ? { ...res, name: newName } : res
    );
    setModules(updatedModules);
    localStorage.setItem("uploadedData", JSON.stringify(updatedModules));
  };

  return (
    <div className="container">
      {modules.map((item, index) => (
        <div key={index} className={`container ${styles.module_content}`}>
          <div>
            <h6>
              <strong>{item.name}</strong>
            </h6>

            <h6 className="text-secondary">Add items to this module</h6>
          </div>

          <ModuleMenu
            module={item}
            onRename={handleRename}
            moduleName={item.name}
            onDelete={() => handleDelete(item.id)}
          />
        </div>
      ))}
    </div>
  );
}
