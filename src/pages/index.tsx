import Head from "next/head";
import Carosel from "../components/carosel";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { ISlider } from "../definitions/slider.def";
import { useEffect, useState } from "react";
import { SpacingVertical } from "@/components/uiComponents/spacer";

export default function Home() {
  const [sliders, setSliders] = useState<ISlider[]>([]);
  const [selectedSlider, setSelectedSlide] = useState<ISlider | null>(null);

  const loadSliders = async () => {
    const resp = await fetch("/api/slider");
    if (resp) {
      const respJson = await resp.json();
      setSliders(respJson.data);
    }
  };

  useEffect(() => {
    loadSliders();
  }, []);

  const selectSlider = (sd: ISlider) => {
    if (sd.id === selectedSlider?.id) return;
    setSelectedSlide(sd);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          minWidth: "100%",
          minHeight: "100vh",
          backgroundColor: "black",
        }}
      >
        <Stack
          width={"100%"}
          height={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack
            bgcolor={"white"}
            p={1}
            direction={"row"}
            alignItems={"center"}
          >
            <Typography variant="h6">SliderId</Typography>
            {sliders.length === 0 && <Box>No slider</Box>}
            {sliders.map((slide, idx) => {
              const selected = selectedSlider?.id === slide.id;
              return (
                <Button
                  key={idx}
                  onClick={() => selectSlider(slide)}
                  disabled={selected}
                  variant={selected ? "contained" : "outlined"}
                  sx={{ m: 1 }}
                >
                  {slide.id}
                </Button>
              );
            })}
          </Stack>

          <SpacingVertical space="20px" />
          <Carosel slider={selectedSlider} />
        </Stack>
      </main>
    </>
  );
}
