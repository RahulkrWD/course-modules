import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ModuleMenu from "./ModuleMenu";
import styles from "../App.module.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState(false);
  const [modules, setModules] = useState(
    JSON.parse(localStorage.getItem("modules")) || []
  );

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
        <div className="p-2" key={item.name + index}>
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              aria-controls={`panel${index}d-content`}
              id={`panel${index}d-header`}
            >
              <div>
                <h6>
                  <strong>{item.name}</strong>
                </h6>

                <h6 className="text-secondary">Add items to this module</h6>
              </div>
              <div className={styles.Module_menu}>
                <ModuleMenu
                  module={item}
                  onRename={handleRename}
                  moduleName={item.name}
                  onDelete={() => handleDelete(item.id)}
                />
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
    </div>
  );
}
