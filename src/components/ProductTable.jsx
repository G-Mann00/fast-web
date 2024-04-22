import { Card, CardBody, CardHeader, Typography, Input, Button } from "@material-tailwind/react";
import PropTypes from 'prop-types'; // Import PropTypes
import foodIcon from '../assets/img/fast-default-food-icon.png';

const ProductTable = ({ tableRows }) => { // Destructure tableRows properly here

  const TABLE_HEAD = ["Producto", "Descripción", "Precio", "Categoria", ""];

  return (
    <Card className="h-[500px] w-full overflow-y-auto rounded-lg">
      {/* Encabezado del componente */}
      <CardHeader className="bg-[#FFFFFF] p-4">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5">
              Tu Catalogo
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Estos son los productos que tu kiosko ofrece
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                placeholder="Buscar Producto"
                className="rounded-lg"
              />
            </div>
            <Button className="flex items-center gap-3 bg-FAST-Orange text-[#FFFFFF] hover:bg-[#ed6d1f]" size="sm">Agregar Producto</Button>
          </div>
        </div>
      </CardHeader>

      {/* Cuerpo del componente */}
      <CardBody className="h-[500px] w-full overflow-y-auto rounded-lg">
        {/* Aqui es donde empieza la tabla */}
        <table className="w-full min-w-max table-auto text-left">
          {/* Encabezado de la tabla */}
          <thead className="bg-FAST-Orange">
            <tr>
              {/*Obteniendo las cabeceras de la tabla */}
              {TABLE_HEAD.map((head) => (
                // Creando las cabeceras de la tabla con sus respectivos estilos
                <th key={head} className="border-b border-[#CCCCCC] p-4">
                  <Typography
                    variant="small"
                    className="font-medium leading-none text-[#FFFFFF]"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody>
            {/* Obteniendo las filas de la tabla */}
            {tableRows.map(producto => (
              // Creando las filas de la tabla con sus respectivos estilos
              <tr key={producto.id} className="odd:bg-[#FFFFFF] even:bg-[f5f7f8]">
                {/* Producto */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={producto.imagen ? producto.imagen : foodIcon} alt="Icono de comida" className="w-[48px] h-[48px] rounded-full" />
                    <Typography variant="small" className="text-FAST-Text" >
                      {producto.nombre}
                    </Typography>
                  </div>
                </td>

                {/* Descripcion */}
                <td className="p-4">
                  <Typography variant="small" className="text-FAST-Text">
                    {producto.descripcion}
                  </Typography>
                </td>

                {/* Precio */}
                <td className="p-4">
                  <Typography variant="small" className="text-FAST-Text">
                    C${producto.precio}
                  </Typography>
                </td>

                {/* Categoria */}
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {producto.categoria}
                  </Typography>
                </td>

                {/* Botones de accion */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button className="bg-FAST-DarkBlue text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#2B3045]">Editar</button>
                    <button className="bg-[#ef4444] text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#FF6B6B]">Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};
// Add PropTypes validation
ProductTable.propTypes = {
  tableRows: PropTypes.array.isRequired, // Validate tableRows prop as an array and ensure it's required
};
export default ProductTable;
