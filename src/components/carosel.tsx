import { Box, Button, ButtonGroup, Skeleton, Typography } from "@mui/material";
import { ISlider } from "@/definitions/slider.def";
import { toast } from "react-toastify";
import UploadFileButton from "./uiComponents/uploadFileButton";
import useSWR from "swr";

interface IProps {
  slider: ISlider | null;
}

const Carosel = ({ slider }: IProps) => {
  const { data, isLoading, error } = useSWR(
    `/api/slider/${slider?.id}/slide`,
    (url) => fetch(url).then((res) => res.json()),
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );

  const handleFileChange = async (file: File) => {
    const formData = new FormData();
    if (!file) {
      return;
    }
    formData.append("file", file);
    try {
      const resp = await fetch(`/api/slider/${slider?.id}/carosel`, {
        method: "POST",
        body: formData,
      });
      const json = await resp.json();
      if (!resp.ok) {
        toast.error(json.message);
        return;
      }
      toast.success("Parsed supplier successfully");
    } catch (e) {
      toast.error("Failed to upload supplier");
    } finally {
    }
  };

  const createNewSlide = async () => {};
  const deleteSlide = async () => {};
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"80%"}
      minHeight={"50vh"}
      p={6}
      bgcolor={"white"}
    >
      {isLoading ? (
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          variant="rectangular"
          width={"100%"}
          height={"100%"}
        >
          <Typography>Carosel</Typography>
        </Skeleton>
      ) : (
        <Box width={"100%"} height={"100%"}>
          <ButtonGroup orientation="vertical">
            <UploadFileButton
              accept=".png, .jpg, .gif"
              text="upload image"
              onUpload={handleFileChange}
            />
            <Button onClick={createNewSlide}>New Slide</Button>
            <Button onClick={deleteSlide}>Delete Slide</Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};

export default Carosel;
