export const randomState = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

export const randomDateTime = () => {
  const start = new Date(2020, 0, 1).getTime();
  const end = Date.now();
  const d = new Date(start + Math.random() * (end - start));
  return d.toISOString().replace("T", " ").split(".")[0];
};
