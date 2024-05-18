import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { FaLink } from "react-icons/fa";
import styles from "../App.module.css";
import { RxCross1 } from "react-icons/rx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "7px",
};

export default function TransitionsModal() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUrl("");
    setName("");
  };

  const handleAddLink = () => {
    if (url.trim() !== "" && name.trim() !== "") {
      const newLink = { id: Date.now(), url, name };
      const existingLinks = JSON.parse(localStorage.getItem("links")) || [];
      const updatedLinks = [...existingLinks, newLink];
      localStorage.setItem("links", JSON.stringify(updatedLinks));
      handleClose();
    } else {
      alert("Please enter URL and Display Name.");
    }
  };

  return (
    <div>
      <h6 style={{ cursor: "pointer" }} onClick={handleOpen}>
        <FaLink /> Add a Link
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
              <h6 style={{ fontWeight: "bolder" }}>Add new Link</h6>
              <button
                onClick={handleClose}
                className={`btn ${styles.close_btn}`}
              >
                <RxCross1 />
              </button>
            </div>
            <div style={{ marginTop: "15px" }}>
              <form>
                <p>URL</p>
                <input
                  className="w-100 p-1 mt-1"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter URL"
                />
                <br />
                <p className="mt-3">Display name</p>
                <input
                  className="w-100 p-1"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Display name"
                />
                <div className={styles.module_btn}>
                  <button onClick={handleClose} className="btn m-2">
                    Cancel
                  </button>
                  <button
                    onClick={handleAddLink}
                    className="btn text-bg-primary m-2"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
