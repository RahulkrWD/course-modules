import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { GoUpload } from "react-icons/go";
import styles from "../App.module.css";
import { RxCross1 } from "react-icons/rx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "7px",
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const [displayName, setDisplayName] = React.useState("");
  const [fileData, setfileData] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataUrl = e.target.result;
        setfileData(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoreData = () => {
    if (displayName.trim() !== "" && fileData) {
      const newData = { name: displayName, fileData: fileData };
      const existingData =
        JSON.parse(localStorage.getItem("uploadedData")) || [];
      const updatedData = [...existingData, newData];
      localStorage.setItem("uploadedData", JSON.stringify(updatedData));
      handleClose();
      setDisplayName("");
      setfileData("");
    } else {
      alert("Please enter a display name and upload a PDF.");
    }
  };

  return (
    <div>
      <h6 style={{ cursor: "pointer" }} onClick={handleOpen}>
        <GoUpload /> Upload
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
            <div className={styles.resource_header}>
              <h6>Upload PDF</h6>
              <button
                onClick={handleClose}
                className={`btn ${styles.close_btn}`}
              >
                <RxCross1 />
              </button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <form>
                <input
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  onChange={handleFileUpload}
                  style={{ marginBottom: "10px" }}
                />
                <br />
                <p className="mt-3">Display name</p>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter Display Name"
                  className="w-100 p-1"
                  style={{ marginBottom: "10px" }}
                />
                <div className={styles.module_btn}>
                  <button onClick={handleClose} className="btn m-2">
                    Cancel
                  </button>
                  <button
                    onClick={handleStoreData}
                    className="btn text-bg-primary m-2"
                  >
                    Upload
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
