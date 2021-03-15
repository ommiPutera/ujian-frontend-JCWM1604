export const currencyFormatter = (numb) => {
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  numb = numb;
  return formatter.format(numb);
};