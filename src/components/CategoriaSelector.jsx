import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
import { useCategoria } from "../hooks/categoria";

const CategoriaSelector = ({ control, name }) => {
  const { categoria } = useCategoria();

  return (
    <div className="pb-[26px] pt-[22px]">
      <h2 className="text-left font-bold text-FAST-Text">Categoria</h2>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select {...field} className="text-FAST-Text block w-full h-10 pl-2 text-base bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-FAST-DarkBlue focus:border-FAST-DarkBlue sm:text-sm" placeholder="Categorias">
            <option value="" className="p-10">Selecciona una categoría</option>
            {categoria.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombreCategoria}
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
};

export default CategoriaSelector;