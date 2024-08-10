import { useContext } from 'react';
import { CategoriaContext } from '../context/categoriasContext';

export const useCategoria = () => {
    return useContext(CategoriaContext);
}