import { ISliderItem } from "@/definitions/slider.def";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import EditAddModal from "./editAddModal";

interface IProps {
  sliderId?: string;
}

const SliderDataGrid = ({ sliderId }: IProps) => {
  /**
   * UI State
   */
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  /** Data */
  const [data, setData] = useState<ISliderItem[]>([]);
  const fetchData = async () => {
    if (!sliderId) {
      return;
    }
    setIsLoading(true);
    const resp = await fetch(`/api/slider/${sliderId}/slide`);
    setIsLoading(false);
    if (resp.ok) {
      const respJson = await resp.json();
      setData(respJson.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [sliderId]);
  const [slideData, setSlideData] = useState<ISliderItem | undefined>();
  const editSlide = (slide: ISliderItem) => {
    setSlideData(slide);
    setModalOpen(true);
  };
  const addSlide = () => {
    setSlideData(undefined);
    setModalOpen(true);
  };

  if (!sliderId) {
    return <div>Nothing selected...</div>;
  }
  const columns: GridColDef<ISliderItem>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "buttonText", headerName: "Button text" },
    { field: "component", headerName: "Component" },
    { field: "mcImageId", headerName: "Background Image" },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params: any) => (
        <Button onClick={() => editSlide(params.row)}>Edit</Button>
      ),
    },
  ];
  return (
    <>
      {modalOpen && (
        <EditAddModal
          sliderId={sliderId}
          slideData={slideData}
          open={modalOpen}
          setOpen={setModalOpen}
        />
      )}
      <DataGrid
        loading={isLoading}
        rows={data}
        columns={columns}
        slots={{
          toolbar: () => (
            <GridToolbarContainer>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={addSlide}
              >
                New Slide
              </Button>
              <GridToolbar />
            </GridToolbarContainer>
          ),
        }}
      />
    </>
  );
};

export default SliderDataGrid;
