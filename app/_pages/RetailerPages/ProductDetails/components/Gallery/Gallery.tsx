import { Carousel, CarouselProps } from "@mantine/carousel";
import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Skeleton,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import {
  IconChevronCompactLeft,
  IconChevronLeft,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";

import { useFullscreen } from "@mantine/hooks";
import useSearch from "@/hooks/useSearch";
import Image from "@/components/Image";

type Props = {
  images?: string[];
  carouselProps?: CarouselProps;
  onMaximize?: VoidFunction;
  onMinimize?: VoidFunction;
  onScrollTo?: (index: number) => void;
  currentSlide?: number;
  isLoading: boolean;
  showSmallImages?: boolean;
};

const Gallery = ({
  images = [],
  carouselProps,
  onScrollTo,
  isLoading,
  showSmallImages = false,
  currentSlide = 0,
}: Props) => {
  const { ref, toggle, fullscreen } = useFullscreen();

  return (
    <Stack ref={ref}>
      <Paper
        withBorder
        bg={fullscreen ? "black" : "gray.1"}
        radius="md"
        pos="relative"
      >
        <ActionIcon
          variant="light"
          color="white"
          pos="absolute"
          top={8}
          left={8}
          style={{ zIndex: 5 }}
          size="md"
          radius="md"
          onClick={toggle}
        >
          {fullscreen ? <IconMinimize size={16} /> : <IconMaximize size={16} />}
        </ActionIcon>
        <Skeleton visible={isLoading}>
          <Carousel
            withKeyboardEvents
            withControls
            withIndicators
            align="start"
            containScroll="trimSnaps"
            loop
            previousControlProps={{
              color: "blue",
            }}
            styles={{
              control: {
                backgroundColor: "var(--mantine-color-white)",
              },
              indicator: {
                backgroundColor: "var(--mantine-color-gray-5)",
              },
            }}
            {...carouselProps}
          >
            {images?.map((image, index) => (
              <Carousel.Slide key={index} w="100%">
                <Paper radius="md">
                  <Image radius="md" src={image} fit="contain" mah="90vh" />
                </Paper>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Skeleton>
      </Paper>
      {showSmallImages && (
        <Group
          gap="xs"
          align="center"
          justify={fullscreen ? "center" : "normal"}
        >
          {images?.map((img, index) => (
            <Paper
              radius="md"
              key={index}
              withBorder={index === currentSlide}
              style={{
                overflow: "hidden",
                cursor: "pointer",
                borderWidth: 2,
                borderColor:
                  index === currentSlide
                    ? "var(--mantine-color-blue-5"
                    : undefined,
              }}
            >
              <Skeleton visible={isLoading}>
                <Image
                  fit="contain"
                  src={img}
                  radius="sm"
                  w={48}
                  onClick={() => onScrollTo?.(index)}
                />
              </Skeleton>
            </Paper>
          ))}
        </Group>
      )}
    </Stack>
  );
};

export default Gallery;
