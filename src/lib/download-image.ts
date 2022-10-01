export const downloadImage = (filename: string, data: string) => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = data;
  link.click();
};
