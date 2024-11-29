import { useState, useRef } from "react";
import { Autocomplete, AutocompleteProps, Loader, rem } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

interface Props extends AutocompleteProps {}
const EmailAutocomplete = ({ ...rest }: Props) => {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 1000);
    }
  };
  return (
    <Autocomplete
      value={value}
      data={data}
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
      label="Email"
      placeholder="Your email"
      size="md"
      labelProps={{ fz: "sm", mb: 3, c: "dark" }}
      descriptionProps={{ fz: 12 }}
      errorProps={{ fz: "xs" }}
      {...rest}
    />
  );
};

export default EmailAutocomplete;
