import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ISliderImage, ISliderItem } from "@/definitions/slider.def";
import { SpacingVertical } from "../uiComponents/spacer";
import { toast } from "react-toastify";

interface IProps {
  sliderId?: string;
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
  mcImageId: "",
};

const EditAddModal = ({ sliderId, slideData, open, setOpen }: IProps) => {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<ISliderImage[]>([]);
  const fetchImages = async () => {
    const resp = await fetch("/api/images");
    if (resp.ok) {
      const respJson = await resp.json();
      setImages(respJson.data);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

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
        case "mcImageId":
          return (
            <Select onChange={handleValueChange(key)} value={formData[key]}>
              <MenuItem value={undefined}>None</MenuItem>
              {images.map((image, idx) => (
                <MenuItem key={idx} value={image.id}>
                  {image.id}
                  <img
                    src={image.url}
                    alt={image.id}
                    style={{ height: 100, width: 100 }}
                  />
                </MenuItem>
              ))}
            </Select>
          );
        default:
          return null;
      }
    });
    return (
      <Box>
        <Typography variant={"h6"}>Edit slide</Typography>
        <Stack gap={1}>{fields}</Stack>
      </Box>
    );
  };
  const handleClick = async () => {
    setLoading(true);
    const resp = await fetch(`/api/slider/${sliderId}/slide`, {
      method: slideData?.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setLoading(false);
    if (resp.ok) {
      toast.success("Saved");
      setOpen(false);
    } else {
      toast.error("Failed to save");
    }
  };
  const onClose = () => {
    setOpen(false);
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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="warning" />
        </Backdrop>
        {renderEditableFields()}
        <SpacingVertical space={"24px"} />
        <Stack direction={"row"} justifyContent={"flex-end"} gap={2}>
          <Button variant="outlined" onClick={handleClick}>
            save
          </Button>
          <Button variant="outlined" color="error" onClick={onClose}>
            cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditAddModal;
