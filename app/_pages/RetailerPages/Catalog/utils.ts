export const getSelectedItems = (values: Partial<Record<string, boolean>>) =>
  Object.entries(values || {})
    .filter(([_, value]) => value)
    .map(([key, _]) => key);
