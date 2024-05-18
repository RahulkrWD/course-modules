import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { MdCreateNewFolder } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import styles from "../App.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 230,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "7px",
};

export default function TransitionsModal() {
  const [open, setOpen] = useState(false);
  const [module, setModule] = useState("");
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setModule("");
  };

  const handleCreateModule = () => {
    if (module.trim() !== "") {
      const newModule = { id: Date.now(), name: module };
      const existingModules = JSON.parse(localStorage.getItem("modules")) || [];
      const updatedModules = [...existingModules, newModule];
      localStorage.setItem("modules", JSON.stringify(updatedModules));
      handleClose();
    } else {
      alert("Please enter a module name.");
    }
  };

  return (
    <div>
      <h6 style={{ cursor: "pointer" }} onClick={handleOpen}>
        <MdCreateNewFolder /> Create module
      </h6>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <h6 style={{ fontWeight: "bolder" }}>Create new module</h6>
              <button
                onClick={handleClose}
                className={`btn ${styles.close_btn}`}
              >
                <RxCross1 />
              </button>
            </div>

            <form onSubmit={handleCreateModule} style={{ marginTop: "15px" }}>
              <p>Module name</p>
              <input
                onChange={(e) => setModule(e.target.value)}
                value={module}
                className="w-100 p-1"
                type="text"
                placeholder="Enter Module name"
              />
              <div className={styles.module_btn}>
                <button onClick={handleClose} className="btn m-2">
                  Cancel
                </button>
                <button type="submit" className="btn text-bg-primary m-2">
                  Create
                </button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
