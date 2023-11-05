import SliderDataGrid from "@/components/sliderDataGrid";
import { SpacingVertical } from "@/components/uiComponents/spacer";
import UploadFileButton from "@/components/uiComponents/uploadFileButton";
import { ISlider, ISliderImage, ISliderItem } from "@/definitions/slider.def";
import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function SliderManagement() {
  const [selectedSlider, setSelectedSlider] = useState<ISlider | null>(null);

  const [rows, setRows] = useState<ISlider[]>([]);
  const [images, setImages] = useState<ISliderImage[]>([]);
  const fetchData = async () => {
    const resp = await fetch("/api/slider");
    if (resp) {
      const respJson = await resp.json();
      setRows(respJson.data);
    }
    const resp2 = await fetch("/api/images");
    if (resp2) {
      const respJson = await resp2.json();
      setImages(respJson.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns: GridColDef<ISlider>[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "slidesCount",
      headerName: "SlidesCount",
      width: 130,
      renderCell: (params: any) => (
        <Stack direction={"row"} spacing={2}>
          <Typography>{params.row.slides.length}</Typography>
        </Stack>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params: any) => (
        <Stack direction={"row"} spacing={2}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              deleteSlider(params.row.id);
            }}
          >
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const addSlider = async () => {
    const resp = await fetch("/api/slider", {
      method: "POST",
      body: "{}",
    });
    if (resp.ok) {
      const respJson = await resp.json();
      const newSlide = respJson.data;
      setRows([
        ...rows,
        {
          ...newSlide,
          slides: [],
        },
      ]);
    } else {
      toast.error("Failed to add slider");
    }
  };

  const deleteSlider = async (sid: string) => {
    const resp = await fetch(`/api/slider`, {
      method: "DELETE",
      body: JSON.stringify({ id: sid }),
    });
    if (resp.ok) {
      const newSliders = rows.filter((sd) => sd.id !== sid);
      setRows(newSliders);
      if (selectedSlider?.id === sid) {
        setSelectedSlider(newSliders[0] || null);
      }
    } else {
      toast.error("Failed to delete slider");
    }
  };
  const handleFileChange = async (file: File) => {
    const formData = new FormData();
    if (!file) {
      return;
    }
    formData.append("file", file);
    try {
      const resp = await fetch(`/api/images`, {
        method: "POST",
        body: formData,
      });
      const json = await resp.json();
      if (!resp.ok) {
        toast.error(json.message);
        return;
      }
      toast.success("Uploaded image");
    } catch (e) {
      toast.error("Failed to upload image");
    }
  };

  return (
    <Stack width={"100%"} justifyContent={"center"} p={2}>
      <Typography variant="h4" textAlign={"center"}>
        Slider Management
      </Typography>
      <SpacingVertical space={"24px"} />
      <DataGrid
        sx={{ height: "80vh" }}
        rows={rows}
        slots={{
          toolbar: () => (
            <GridToolbarContainer>
              <Button variant="contained" onClick={addSlider}>
                New Slider
              </Button>
              <GridToolbar />
            </GridToolbarContainer>
          ),
        }}
        columns={columns}
        onRowClick={(params) => setSelectedSlider(params.row)}
      />
      {selectedSlider?.id}
      <SliderDataGrid sliderId={selectedSlider?.id} />
      {`Total images: ${images.length}`}

      <UploadFileButton
        accept=".png, .jpg, .gif"
        text="upload image"
        onUpload={handleFileChange}
      />
      {images.map((image) => (
        <Box key={image.id}>
          <img src={image.url} width={200} height={200} />
        </Box>
      ))}
    </Stack>
  );
}

export default SliderManagement;
