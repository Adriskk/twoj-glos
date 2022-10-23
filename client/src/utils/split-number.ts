export const splitNumber = (price: number): string => {
  let str = "" + price,
    new_price = "";

  let c = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (c % 3 === 0) new_price = " " + new_price;
    new_price = str[i] + new_price;
    c++;
  }

  return new_price;
};
