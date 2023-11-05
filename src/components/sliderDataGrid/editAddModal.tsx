import React from "react";
import { Box, Modal } from "@mui/material";

interface IProps {
  sliderId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditAddModal = ({ sliderId, open, setOpen }: IProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          p: 4,
        }}
      ></Box>
    </Modal>
  );
};

export default EditAddModal;
