export function numberWithCommas(x: number, decimals = 2) {
  return x
    .toFixed(decimals)
    .replaceAll(".", ",")
    .replaceAll(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const parseEuroValues = (val: string) => {
  return parseFloat(val.replaceAll("€", "").replaceAll(".", "").replaceAll(",", "."));
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
