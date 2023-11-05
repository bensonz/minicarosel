import SliderDataGrid from "@/components/sliderDataGrid";
import { SpacingVertical } from "@/components/uiComponents/spacer";
import { ISlider, ISliderItem } from "@/definitions/slider.def";
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
  const fetchRows = async () => {
    const resp = await fetch("/api/slider");
    if (resp) {
      const respJson = await resp.json();
      setRows(respJson.data);
    }
  };
  useEffect(() => {
    fetchRows();
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
    </Stack>
  );
}

export default SliderManagement;
