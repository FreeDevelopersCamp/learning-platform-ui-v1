export function camelToPascalWithSpaces(camelCaseStr: string = "") {
  return camelCaseStr
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

export function formatPhoneNumber(countryCode?: string, phone?: string) {
  const phoneNumber = `${countryCode}${phone}`;
  const regex = /^(\+\d{3})(\d{3})(\d{4})(\d{3})$/;
  const formattedNumber = phoneNumber.replace(regex, "$1 $2 $3 $4");

  return formattedNumber;
}

export const formatPrice = (price: number = 0, sign: string = "$") => {
  return `${price.toFixed(2)}${sign}`;
};
