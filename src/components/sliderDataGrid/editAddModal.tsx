import React, { useState } from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { ISliderItem } from "@/definitions/slider.def";

interface IProps {
  slideData?: ISliderItem;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const EmptySliderItem: ISliderItem = {
  id: "",
  title: "",
  description: "",
  buttonText: "",
  component: "",
  bgImage: undefined,
};

const EditAddModal = ({ slideData, open, setOpen }: IProps) => {
  const [formData, setFormData] = useState<ISliderItem>(
    slideData || EmptySliderItem
  );
  const handleValueChange = (key: keyof ISliderItem) => (e: any) => {
    setFormData((prevData) => ({ ...prevData, [key]: e.target.value }));
  };

  const renderEditableFields = () => {
    const keys = Object.keys(formData) as (keyof ISliderItem)[];
    const fields = keys.map((key) => {
      switch (key) {
        case "id":
          return (
            <TextField key={key} label={key} value={formData[key]} disabled />
          );
        case "title":
        case "description":
        case "buttonText":
        case "component":
          return (
            <TextField
              key={key}
              label={key}
              value={formData[key]}
              onChange={handleValueChange(key)}
            />
          );
        case "bgImage":
          return (
            <TextField
              key={key}
              label={key}
              value={formData[key]}
              onChange={handleValueChange(key)}
            />
          );
        default:
          return null;
      }
    });
    return (
      <Box>
        <Typography variant={"h6"}>Edit slide</Typography>
        <Box>{fields}</Box>
      </Box>
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
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
      >
        {renderEditableFields()}
      </Box>
    </Modal>
  );
};

export default EditAddModal;
