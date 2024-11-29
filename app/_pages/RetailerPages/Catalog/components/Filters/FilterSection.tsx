import Title from "@/components/Title";
import {
  Accordion,
  AccordionItemProps,
  Checkbox,
  Divider,
  Stack,
} from "@mantine/core";
import React, { ReactNode } from "react";

interface Props extends Omit<AccordionItemProps, "title"> {
  isOpened: boolean;
  children?: ReactNode;
  title?: ReactNode;
}
const FilterSection = ({ isOpened, title, children, ...itemProps }: Props) => {
  return (
    <Accordion.Item {...itemProps}>
      <Accordion.Control>
        <Title order={6}>{title}</Title>
      </Accordion.Control>
      {isOpened && <Divider />}
      <Accordion.Panel pt="sm">{children}</Accordion.Panel>
    </Accordion.Item>
  );
};

export default FilterSection;
