import { useContext } from 'react';
import { KioskoContext } from '../context/kioskoContext';

export const useKiosk = () => {
    return useContext(KioskoContext);
};
