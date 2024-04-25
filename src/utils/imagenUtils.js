export const handleImageFileChange = (file, setImageUrl, setFile) => {
  setImageUrl(URL.createObjectURL(file)); // Opcional: para mostrar la imagen subida
  setFile(file); // Guarda el archivo en el estado
};
