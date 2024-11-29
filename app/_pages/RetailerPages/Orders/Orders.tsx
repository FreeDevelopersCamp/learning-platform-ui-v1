import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";

interface Props {}
const Orders = ({ children, ...rest }: PropsWithChildren<Props>) => {
  return <Box>{children}</Box>;
};

export default Orders;
