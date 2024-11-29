import { Box, Paper, Transition, rem } from "@mantine/core";
import { PropsWithChildren, useEffect, useState } from "react";
import LoginBox from "./components/LoginBox";
import Container from "@/components/Container";
import classes from "./styles.module.css";
import Image from "@/components/Image";
import Illustrations from "@/assets/Illustrations";

interface Props {}

const Login = ({}: PropsWithChildren<Props>) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setOpened(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box pos="relative" style={{ height: "100vh" }}>
      <Image src={Illustrations.waves} pos="absolute" />

      <Container size={rem(480)} className={classes.loginContainer}>
        <Transition
          mounted={opened}
          transition="slide-down"
          duration={200}
          timingFunction="ease-out"
          keepMounted
        >
          {(transitionStyle) => (
            <Paper
              p="xl"
              style={{ ...transitionStyle, zIndex: 10 }}
              className={classes.loginPaper}
              shadow="xl"
            >
              <LoginBox />
            </Paper>
          )}
        </Transition>
      </Container>
    </Box>
  );
};

export default Login;
