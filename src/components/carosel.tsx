import { Box, Button, ButtonGroup, Skeleton, Typography } from "@mui/material";
import { ISlider, ISliderImage, ISliderItem } from "@/definitions/slider.def";
import { toast } from "react-toastify";
import UploadFileButton from "./uiComponents/uploadFileButton";
import useSWR from "swr";

interface IProps {
  slider: ISlider | null;
}

const Carosel = ({ slider }: IProps) => {
  const { data, isLoading, error } = useSWR<ISliderItem[]>(
    `/api/slider/${slider?.id}/slide`,
    async (url) => {
      const resp = await fetch(url);
      if (resp.ok) {
        const respJson = await resp.json();
        return respJson.data;
      }
      return [];
    },
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    }
  );
  if (error) {
    toast.error(error);
  }
  console.log(data);
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
          {data?.map((slide) => (
            <Box key={slide.id} width={"100%"} height={"100%"}>
              {slide.component}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Carosel;
