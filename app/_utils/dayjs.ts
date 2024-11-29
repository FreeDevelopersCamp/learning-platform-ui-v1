import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export default dayjs;

export const dayjsFormats = {
  // Date formats
  DATE_MM_DD_YYYY: "MM/DD/YYYY", // Example: '08/15/2024'
  DATE_DD_MM_YYYY: "DD/MM/YYYY", // Example: '15/08/2024'
  DATE_YYYY_MM_DD: "YYYY/MM/DD", // Example: '2024/08/15'
  DATE_YYYY_MM_DASH: "YYYY-MM-DD", // Example: '2024-08-15'
  DATE_MMM_D_YYYY: "MMM D, YYYY", // Example: 'Aug 15, 2024'
  DATE_MMMM_D_YYYY: "MMMM D, YYYY", // Example: 'August 15, 2024'
  DATE_D_MMMM_YYYY: "D MMMM, YYYY", // Example: '15 August, 2024'
  DATE_D_MMM_YYYY: "D-MMM-YYYY", // Example: '15-Aug-2024'

  // Time formats
  TIME_H_MM_A: "h:mm A", // Example: '3:25 PM'
  TIME_HH_MM_A: "hh:mm A", // Example: '03:25 PM'
  TIME_H_MM: "H:mm", // Example: '15:25' (24-hour format, no leading zero)
  TIME_HH_MM: "HH:mm", // Example: '15:25' (24-hour format, with leading zero)
  TIME_H_MM_SS_A: "h:mm:ss A", // Example: '3:25:45 PM'
  TIME_HH_MM_SS_A: "hh:mm:ss A", // Example: '03:25:45 PM'
  TIME_H_MM_SS: "H:mm:ss", // Example: '15:25:45' (24-hour format, no leading zero)
  TIME_HH_MM_SS: "HH:mm:ss", // Example: '15:25:45' (24-hour format, with leading zero)

  // DateTime formats
  DATETIME_MM_DD_YYYY_H_MM_A: "MM/DD/YYYY h:mm A", // Example: '08/15/2024 3:25 PM'
  DATETIME_YYYY_MM_DD_HH_MM_SS: "YYYY-MM-DD HH:mm:ss", // Example: '2024-08-15 15:25:45'
  DATETIME_YYYY_MM_DD_HH_MM: "YYYY/MM/DD HH:mm", // Example: '2024/08/15 15:25'
  DATETIME_MMMM_D_YYYY_H_MM_A: "MMMM D, YYYY h:mm A", // Example: 'August 15, 2024 3:25 PM'
  DATETIME_D_MMMM_YYYY_HH_MM_SS: "D MMMM, YYYY HH:mm:ss", // Example: '15 August, 2024 15:25:45'
  DATETIME_MMM_D_YYYY_H_MM_SS_A: "MMM D, YYYY h:mm:ss A", // Example: 'Aug 15, 2024 3:25:45 PM'
  DATETIME_DD_MM_YYYY_HH_MM_SS: "DD/MM/YYYY HH:mm:ss", // Example: '15/08/2024 15:25:45'
  DATETIME_ISO: "YYYY-MM-DDTHH:mm:ssZ", // Example: '2024-08-15T15:25:45Z' (ISO 8601 format)
};
