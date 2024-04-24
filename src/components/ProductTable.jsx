import { 
  Card, 
  CardBody, 
  CardHeader, 
  Typography, 
  Input, 
  Button, 
  Dialog, 
  DialogBody, 
  DialogHeader, 
  DialogFooter
 } from "@material-tailwind/react";
import PropTypes from 'prop-types'; // Import PropTypes
import foodIcon from '../assets/img/fast-default-food-icon.png';
import warningIcon from '../assets/img/triangulo-alerta.png';
import { useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import {InputSection, ImageUpload} from "../components";
import CategoriaSelector from "./CategoriaSelector";

const ProductTable = ({ tableRows }) => { // Destructure tableRows properly here

  const TABLE_HEAD = ["Producto", "Descripción", "Precio", "Categoria", ""];

  // Handler para modal de creacion de producto
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(!createOpen);

  // Handler para modal de edicion de producto
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(!editOpen);

  // Handler para modal de confirmacion de eliminacion de producto
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);

  return (
    <>

    {/* Modal de creacion de producto */}
    <Dialog open={createOpen} handler={handleCreateOpen} size="lg">

      {/* Encabezado del modal */}
      <DialogHeader>Nuevo Producto</DialogHeader>

      {/* Cuerpo del modal */}
      <DialogBody>
        <form className="pl-[75px] grid grid-cols-2 gap-[70px] justify-center">

          {/* Campos del producto */}
          <div>

            {/* Nombre */}
            <InputSection tipo="text" frase="Nombre" etiqueta="Nombre del Producto" name="nombreProducto" />
            
            {/* Descripcion */}
            <InputSection tipo="text" frase="Descripcion" etiqueta="Descripción del Producto" name="descripcionProducto" />

            {/* Precio */}
            <InputSection tipo="text" frase="Precio (C$)" etiqueta="Precio del Producto" name="precio" />

            {/* Categoria */}
            <CategoriaSelector />

          </div>

          {/* Imagen del producto */}
          <div>
          <ImageUpload defaultImageUrl={foodIcon} name="foto" />
          </div>
        </form>

      </DialogBody>

      {/* Pie del modal */}
      <DialogFooter>
        <div className="space-x-8">
          <Button className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" onClick={handleCreateOpen}>Cancelar</Button>
          <Button className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" onClick={handleCreateOpen}>Agregar</Button>
        </div>
      </DialogFooter>

    </Dialog>


    {/* Modal de edicion de producto */}
        {/* Modal de creacion de producto */}
    <Dialog open={editOpen} handler={handleEditOpen} size="lg">

      {/* Encabezado del modal */}
      <DialogHeader>Editar Producto</DialogHeader>

      {/* Cuerpo del modal */}
      <DialogBody>
        <form className="pl-[75px] grid grid-cols-2 gap-[70px] justify-center">

          {/* Campos del producto */}
          <div>

            {/* Nombre */}
            <InputSection tipo="text" frase="Nombre" etiqueta="Nombre del Producto" name="nombreProducto" />
            
            {/* Descripcion */}
            <InputSection tipo="text" frase="Descripcion" etiqueta="Descripcion del producto" name="descripcionProducto" />

            {/* Precio */}
            <InputSection tipo="text" frase="Precio (C$)" etiqueta="Precio del producto" name="precio" />

            {/* Categoria */}
            <CategoriaSelector />

          </div>

          {/* Imagen del producto */}
          <div>
          <ImageUpload defaultImageUrl={foodIcon} name="foto" />
          </div>
        </form>

      </DialogBody>

      {/* Pie del modal */}
      <DialogFooter>
        <div className="space-x-8">
          <Button className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" onClick={handleEditOpen}>Cancelar</Button>
          <Button className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" onClick={handleEditOpen}>Guardar Cambios</Button>
        </div>
      </DialogFooter>

    </Dialog>

    {/* Modal de confirmacion de eliminacion de producto */}
    <Dialog open={deleteOpen} handler={handleDeleteOpen} size="md">

      {/* Encabezado del modal */}
      <DialogHeader>Eliminar Producto</DialogHeader>

      {/* Cuerpo del modal */}
      <DialogBody>
        <div className="flex justify-center items-center gap-3">

          <img  className="w-[100px] h-[100px]" src={warningIcon}/>
          <p className="text-left text-lg text-FAST-Text">¿Está seguro que desea eliminar *PLACEHOLDER*?</p>

        </div>
      </DialogBody>

      {/* Pie del modal */}
      <DialogFooter>
        <div className="space-x-8">
          <Button className="bg-[#ef4444] text-[#FFFFFF] hover:bg-[#FF6B6B]" onClick={handleDeleteOpen}>Cancelar</Button>
          <Button className="bg-FAST-DarkBlue text-[#FFFFFF] hover:bg-[#2B3045]" onClick={handleDeleteOpen}>Confirmar</Button>
        </div>
      </DialogFooter>

    </Dialog>


    {/* Tabla de productos */}
    <Card className="h-[500px] w-full overflow-y-auto rounded-lg">
      {/* Encabezado del componente */}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-6 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" className="text-FAST-Text">
              Tu Catalogo
            </Typography>
            <Typography className="mt-1 font-normal text-FAST-Text">
              Estos son los productos que tu kiosko ofrece
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                icon={<HiOutlineMagnifyingGlass size={20} />}
                label="Buscar Producto"
                className="rounded-lg"
              />
            </div>
            <Button className="flex items-center gap-3 bg-FAST-Orange text-[#FFFFFF] hover:bg-[#ed6d1f]" 
            size="sm"
            onClick={handleCreateOpen}
            >
              <MdOutlineLibraryAdd size={20} />
              Agregar Producto</Button>
          </div>
        </div>
      </CardHeader>

      {/* Cuerpo del componente */}
      <CardBody className="h-[500px] w-full overflow-y-auto p-0">
        {/* Aqui es donde empieza la tabla */}
        <table className="w-full min-w-max table-auto text-left">
          {/* Encabezado de la tabla */}
          <thead className="bg-FAST-Orange sticky top-0">
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
              <tr key={producto.id} className="even:bg-blue-gray-50/50">
                {/* Producto */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={producto.imagen ? producto.imagen : foodIcon} alt="Icono de comida" className="w-[48px] h-[48px] rounded-lg" />
                    <Typography variant="small" className="text-FAST-Text font-normal" >
                      {producto.nombre}
                    </Typography>
                  </div>
                </td>

                {/* Descripcion */}
                <td className="p-4">
                  <Typography variant="small" className="text-FAST-Text font-normal">
                    {producto.descripcion}
                  </Typography>
                </td>

                {/* Precio */}
                <td className="p-4">
                  <Typography variant="small" className="text-FAST-Text font-normal">
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

                    <button onClick={handleEditOpen} className="bg-FAST-DarkBlue text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#2B3045]">
                      <FiEdit size={20} />
                    </button>

                    <button onClick={handleDeleteOpen} className="bg-[#ef4444] text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#FF6B6B]">
                      <FaRegTrashCan size={20} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
    </>
  );
};
// Add PropTypes validation
ProductTable.propTypes = {
  tableRows: PropTypes.array.isRequired, // Validate tableRows prop as an array and ensure it's required
};
export default ProductTable;
