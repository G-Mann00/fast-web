import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageUpload = ({ defaultImageUrl, onChange }) => {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  useEffect(() => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
        onChange(imageUrl);
      }
    };

    const inputFile = document.getElementById('fileInput');
    if (inputFile) {
      inputFile.addEventListener('change', handleFileChange);
    }

    return () => {
      if (inputFile) {
        inputFile.removeEventListener('change', handleFileChange);
      }
    };
  }, [onChange]);

  return (
    <div className="mt-5">
      <img className='w-fit max-w-[220px] h-[220px] rounded-full mb-6' src={imageUrl || defaultImageUrl} alt="Uploaded" />
      <label htmlFor="fileInput" className="inline-block w-full h-10 bg-FAST-Orange text-FAST-WhiteCream cursor-pointer hover:bg-[#ed6d1f] font-bold uppercase rounded-lg relative">
        <span className="absolute left-0 right-0 top-0 bottom-0 z-10 flex items-center justify-center">Upload Image</span>
        <input id="fileInput" className="absolute opacity-0" type="file" accept="image/jpeg, image/png, image/jpg" />
      </label>
    </div>
  );
};

ImageUpload.propTypes = {
  defaultImageUrl: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ImageUpload;
