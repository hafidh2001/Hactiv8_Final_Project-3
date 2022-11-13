export const numberWithCommas = (money) => {
  let result = money
    .toString()
    .split("-")[0]
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return result;
};
