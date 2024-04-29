import { obtenerCategoriasCompletas } from "../services/database/index";
import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
import { useEffect, useState } from 'react';

const CategoriaSelector = ({ control, name, onDataLoaded }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const categoriasFromDB = await obtenerCategoriasCompletas();
      setCategorias(categoriasFromDB);
      onDataLoaded();
    };

    fetchCategorias();
  }, [onDataLoaded]);

  return (
    <div className="pb-[26px] pt-[22px]">
      <h2 className="text-left font-bold text-FAST-Text">Categoria</h2>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select {...field} className="text-FAST-Text block w-full h-10 text-base bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-FAST-DarkBlue focus:border-FAST-DarkBlue sm:text-sm" placeholder="Categorias">
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombreCategoria}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  )
}

CategoriaSelector.propTypes = {
  control: PropTypes.object.isRequired, // Prop validation for control
  name: PropTypes.string.isRequired, // Prop validation for name
  onDataLoaded: PropTypes.func, // Prop validation for onDataLoadeds
};

export default CategoriaSelector;