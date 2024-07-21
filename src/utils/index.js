import { generarUrlImagen } from './generador';
import { handleImageFileChange } from './imagenUtils'
import { checkIfNumber } from './utilsValidaciones/isNumber'
import { isBigger } from './utilsValidaciones/IsBigger'
import { numberFormat } from './numberFormat'
import { compareObjetcs } from './utilsValidaciones/compareObjects';
import { copyObjects } from './copyObjects';
import { capitalizeFirstLetter } from './capitalizeWords';
import { allFieldsFilled } from './utilsValidaciones/allFieldsFill';

export {
    generarUrlImagen,
    handleImageFileChange,
    checkIfNumber,
    isBigger,
    numberFormat,
    compareObjetcs,
    copyObjects,
    capitalizeFirstLetter,
    allFieldsFilled
};

