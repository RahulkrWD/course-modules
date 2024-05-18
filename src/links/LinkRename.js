import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import styles from "../App.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 330,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export default function LinkRename({ onRename, links }) {
  const [open, setOpen] = useState(false);
  const [url, seturl] = useState(links.url);
  const [newName, setNewName] = useState(links.name);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRename = () => {
    onRename(links.id, newName);
    handleClose();
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={handleOpen}>
        <MdDriveFileRenameOutline /> Edit
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h6 style={{ fontWeight: "bolder" }}>Edit link</h6>
            <div className={`btn ${styles.close_btn}`}>
              <RxCross1 onClick={handleClose} />
            </div>
          </div>

          <div style={{ marginTop: "25px" }}>
            <h6 style={{ marginTop: "30px" }}>URL</h6>
            <input
              value={url}
              type="text"
              onChange={(e) => seturl(e.target.value)}
              className="w-100 p-1"
              placeholder="Enter your URL"
            />
            <h6 style={{ marginTop: "30px" }}>Display name</h6>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              className="w-100 p-1"
              placeholder="Enter your module Name"
            />
            <div className={styles.module_btn}>
              <button onClick={handleClose} className="btn m-2">
                Cancel
              </button>
              <button
                onClick={handleRename}
                className="btn text-bg-primary m-2"
              >
                Save changes
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}