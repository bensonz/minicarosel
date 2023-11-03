import { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";

const Carosel = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const loadImages = async () => {};

  useEffect(() => {
    loadImages();
  }, []);

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
      {loading ? (
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          variant="rectangular"
          width={"100%"}
          height={"100%"}
        >
          <Typography>Carosel</Typography>
        </Skeleton>
      ) : (
        <Typography>Carosel</Typography>
      )}
    </Box>
  );
};

export default Carosel;
