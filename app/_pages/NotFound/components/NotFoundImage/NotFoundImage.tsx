import { Title, Text, Group, Code } from "@mantine/core";
import classes from "./styles.module.css";
import Image from "@/components/Image";
import LinkButton from "@/components/LinkButton";
import { ReactNode } from "react";
import Container from "@/components/Container";
import { useLocation } from "react-router-dom";

interface Props {
  image: string;
  title: ReactNode;
  description: ReactNode;
  buttonTitle: ReactNode;
}
const NotFoundImage = ({ title, description, buttonTitle, image }: Props) => {
  const { pathname } = useLocation();
  return (
    <Container className={classes.inner}>
      <Group justify="center">
        <Image src={image} maw={420} className={classes.desktopImage} />
      </Group>

      <Title className={classes.title}>{title}</Title>

      <Text
        c="dimmed"
        size="lg"
        ta="center"
        className={classes.description}
        maw={420}
      >
        {description}
      </Text>
      <Group justify="center">
        <Code>{pathname}</Code>
      </Group>
      <Group justify="center">
        <LinkButton
          variant="subtle"
          size="md"
          mt="xl"
          className={classes.control}
          title={buttonTitle}
          to="/"
        />
      </Group>
    </Container>
  );
};

export default NotFoundImage;
