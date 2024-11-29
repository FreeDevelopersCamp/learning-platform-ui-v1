import {
  ActionIcon,
  ComboboxData,
  Divider,
  Group,
  NumberInput,
  NumberInputProps,
  Paper,
  Select,
  SelectProps,
} from "@mantine/core";
import { IconMinus } from "@tabler/icons-react";
import { ProductQuantity } from "../../types";

interface Props {
  quantityProps: {
    size: SelectProps;
    color: SelectProps;
    quantity: NumberInputProps;
  };
  productSizeOptions: ComboboxData;
  productColorOptions: ComboboxData;
}

const CartProductQuantity = ({
  productSizeOptions,
  productColorOptions,
  quantityProps,
}: Props) => {
  return (
    <Group align="center">
      <Paper withBorder radius="sm">
        <Group gap={0}>
          <Select
            ml="xs"
            w={72}
            data={productSizeOptions}
            size="xs"
            variant="unstyled"
            placeholder="Size"
            {...quantityProps.size}
          />
          <Divider orientation="vertical" />
          <Select
            ml="xs"
            w={72}
            data={productColorOptions}
            size="xs"
            variant="unstyled"
            placeholder="Color"
            {...quantityProps.color}
          />
          <Divider orientation="vertical" />

          <Group gap={2}>
            <NumberInput
              ml="xs"
              w={72}
              ta="center"
              allowNegative={false}
              allowDecimal={false}
              decimalSeparator=","
              min={1}
              variant="unstyled"
              hideControls={false}
              placeholder="Qty"
              size="xs"
              {...quantityProps.quantity}
            />
          </Group>
        </Group>
      </Paper>
      <ActionIcon c="gray" size="xs" variant="default" radius="xl">
        <IconMinus size={12} />
      </ActionIcon>
    </Group>
  );
};

export default CartProductQuantity;
