export const handleImageFileChange = (file, setImageUrl, setFile) => {
  setImageUrl(URL.createObjectURL(file)); 
  setFile(file); 
  return file;
};
