export const seperateFileExtension = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf(".");
  const name = fileName.substring(0, lastDotIndex);
  const extension = fileName.substring(lastDotIndex + 1);

  return {
    name,
    extension,
  };
};
