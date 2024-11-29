import { ColorDto } from "@/apis/supplyChain/Product/types";
import {
  ActionIcon,
  ColorSwatch,
  ComboboxData,
  ComboboxItem,
  Divider,
  Group,
  NumberInput,
  NumberInputProps,
  Paper,
  Select,
  SelectProps,
  Text,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface Props {
  quantityProps: {
    size: SelectProps;
    color: SelectProps;
    quantity: NumberInputProps;
  };
  productSizeOptions: ComboboxData;
  productColorOptions: Array<ColorDto & ComboboxItem>;
  inNewMode?: boolean;
}

const ProductQuantity = ({
  quantityProps,
  productSizeOptions,
  productColorOptions,
  inNewMode = false,
}: Props) => {
  const selectedColor = productColorOptions?.find(
    (c) => c?.primaryColor === quantityProps?.color?.value
  );

  return (
    <Group>
      <Paper withBorder radius="md" flex={1}>
        <Group gap={0}>
          {productSizeOptions.length && (
            <>
              <Select
                flex={1}
                ml="xs"
                data={productSizeOptions}
                size="md"
                variant="unstyled"
                placeholder="Size"
                renderOption={(item) => {
                  return (
                    <Group>
                      <Text size="xs" tt="uppercase">
                        {item.option.label.toUpperCase()}
                      </Text>
                    </Group>
                  );
                }}
                {...quantityProps.size}
              />
              <Divider orientation="vertical" />
            </>
          )}
          <Select
            leftSection={
              <ColorSwatch size={16} color={selectedColor?.primaryHexColor!} />
            }
            flex={1}
            data={productColorOptions}
            size="md"
            variant="unstyled"
            placeholder="Color"
            renderOption={(item) => {
              const color = item.option as unknown as ColorDto;
              return (
                <Group>
                  <ColorSwatch size={16} color={color?.primaryHexColor!} />
                  <Text size="xs">{item.option.label}</Text>
                </Group>
              );
            }}
            {...quantityProps.color}
          />
          <Divider orientation="vertical" />

          <NumberInput
            flex={1}
            allowNegative={false}
            allowDecimal={false}
            decimalSeparator=","
            min={1}
            variant="unstyled"
            hideControls={false}
            placeholder="Qty"
            size="md"
            ml="xs"
            {...quantityProps.quantity}
          />
        </Group>
      </Paper>
      {!inNewMode && (
        <Group flex={0}>
          <ActionIcon variant="default" size="md" radius="xl">
            {inNewMode ? <IconPlus size={16} /> : <IconMinus size={16} />}
          </ActionIcon>
        </Group>
      )}
    </Group>
  );
};

export default ProductQuantity;
