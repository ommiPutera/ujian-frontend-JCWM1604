export const formatDate = (input) => {
  let date = new Date(input);
  return date.toLocaleString();
};