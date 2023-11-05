/* eslint-disable @next/next/no-img-element */
import { Box, Button, styled } from "@mui/material";
import { ISlider, ISliderItem } from "@/definitions/slider.def";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useEffect, useState } from "react";

const Indicator = ({ className, position, length, onIndicatorClick }: any) => (
  <IndicatorContainer className={className}>
    {Array.from({ length }, (value, index) => (
      <IndicatorDot
        key={index}
        isActive={position === index}
        onClick={() => onIndicatorClick(index)}
      />
    ))}
  </IndicatorContainer>
);

const IndicatorContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  z-index: 4;
`;

const IndicatorDot = styled("div")<{ isActive: boolean }>`
  height: 16px;
  width: 16px;
  background-color: ${({ isActive }) => (isActive ? "#08979C;" : "#E6E6E6")};
  transition: background 450ms ease;
  border-radius: 50%;
  margin-right: 15px;
  cursor: pointer;
  z-index: 4;
`;

interface IProps {
  slider: ISlider | null;
}

const Carosel = ({ slider }: IProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    if (!data) return;
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  const slideWidth = 100; // Assuming 100% of the container
  const slideTransition = 0.5; // Transition time in seconds

  if (error) {
    toast.error(error);
  }
  const slideCount = data?.length || 0;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"80%"}
      minHeight={"50vh"}
      p={6}
      bgcolor={"white"}
      position={"relative"}
    >
      <CarouselContainer>
        <CarouselImg position={activeIndex}>
          {data?.map((child: any) => (
            <CarouselItem key={child.key}>
              <Box position={"relative"}>
                <img
                  src={child.bgImage?.url}
                  alt={child.bgImage?.metaData.alt || "Slide image"}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    p: 4, // padding inside the box
                    backgroundColor: "rgba(0, 0, 0, 0.3)", // semi-transparent overlay for readability
                  }}
                >
                  <Title>{child.title}</Title>
                  <Description>{child.description}</Description>

                  <StyledButton variant="contained">
                    {child.buttonText}
                  </StyledButton>
                </Box>
              </Box>
            </CarouselItem>
          ))}
        </CarouselImg>
      </CarouselContainer>

      <Indicator
        length={data?.length}
        position={activeIndex}
        onIndicatorClick={(index: number) => setActiveIndex(index)}
      />
    </Box>
  );
};

const Title = styled("span")`
  color: #202020;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const Description = styled("span")`
  color: #202020;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledButton = styled(Button)`
  display: flex;
  width: 200px;
  height: 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 12px;
  background: #202020;
`;

const CarouselContainer = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: hidden;
`;

const CarouselImg = styled("div")<{ position: number }>`
  display: flex;
  transition: transform 0.45s ease;
  transform: ${(props) => `translateX(${props.position * -100}%)`};
`;

const CarouselItem = styled("div")`
  display: flex;
  flex: 1 0 100%;
  height: 100%;
`;

const ArrowButton = styled("button")`
  background-color: transparent;
  border: none;
  position: absolute;
  cursor: pointer;
  top: calc(50% - 0.5 * 3rem);
  padding: 0;
  display: flex;
  justify-content: center;
  z-index: 3;
`;

const PreviousButton = styled(ArrowButton)`
  position: fixed;
  top: 50vh;
`;

export default Carosel;
