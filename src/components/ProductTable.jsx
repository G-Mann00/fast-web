import PropTypes from 'prop-types';
import foodIcon from '../assets/img/fast-default-food-icon.png';
import { useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Button, Card, CardHeader, Typography, CardBody, Input, CreateProduct, DeleteProduct, ProductoExitoso } from "../components/index";
import EditProduct from "../components/modals/EditProduct";

const ProductTable = ({ tableRows, handleModalOpen, modalStates }) => { // Destructure tableRows properly here

  const TABLE_HEAD = ["Producto", "Descripción", "Precio", "Categoria", ""];
  const [producto, setProducto] = useState({});
  const [succesOpen, setSuccesOpen] = useState(false); //estado para mostrar mensaje de éxito en la creación del producto
  const [succesOpenAdd, setSuccesOpenAdd] = useState(false); //estado para mostrar mensaje de éxito en la creación del producto
  const [mensajeModal, setMensajeModal] = useState(false); //estado para definir el mensaje del modal
  const [succesOpenEdit, setSuccesOpenEdit] = useState(false); //estado para mostrar mensaje de éxito en la creación del producto

  const handleSuccesOpen = () => {
    setTimeout(() => {
      setSuccesOpen(!succesOpen);
      setMensajeModal('fue eliminado exitosamente');
    }, 1000);
  };

  const handleSuccesOpenAgregar = () => {
    setTimeout(() => {
      setSuccesOpenAdd(!succesOpenAdd);
      setMensajeModal('fue agregado exitosamente');
    }, 1000);
  };

  const handleSuccesOpenEdit = () => {
    setTimeout(() => {
      setSuccesOpenEdit(!succesOpenEdit);
      console.log(succesOpenEdit)
      setMensajeModal('fue editado exitosamente');
    }, 1000);
  }
  const handleSuccesClose = () => {
    setSuccesOpen(false);
  };

  const handleSuccesCloseAdd = () => {
    setSuccesOpenAdd(false);
  };
  const handleSuccesCloseEdit = () => {
    setSuccesOpenEdit(false);
  }
  const handleEliminarOpen = (producto) => { //Función para abrir el modal de eliminación de producto
    setProducto(producto);
    handleModalOpen('openDelete');
  };

  const handleEditarOpen = (producto) => { //Función para abrir el modal de edición de producto
    setProducto(producto);
    handleModalOpen('openEdit');
  }

  return (
    <>
      {/* Modales de creacion y eliminacion de productos al igual que los modales de operacion exitosa */}
      <EditProduct editOpen={modalStates.editOpen} handleModalOpen={handleModalOpen} producto={producto} handleSuccesOpenEdit={handleSuccesOpenEdit} />
      <CreateProduct stateOpen={modalStates.createOpen} handleModalOpen={handleModalOpen} handleSuccessOpen={handleSuccesOpenAgregar} setNombreProd={setProducto} />
      <ProductoExitoso exitosoOpen={succesOpenAdd} mensaje={mensajeModal} handleExitosoOpen={handleSuccesOpenAgregar} handleExitosoClose={handleSuccesCloseAdd} productName={producto} />
      <DeleteProduct deleteOpen={modalStates.deleteOpen} handleModalOpen={handleModalOpen} producto={producto} handleSuccessOpen={handleSuccesOpen} />
      <ProductoExitoso exitosoOpen={succesOpen} mensaje={mensajeModal} handleExitosoOpen={handleSuccesOpen} handleExitosoClose={handleSuccesClose} productName={producto.nombre} />
      <ProductoExitoso exitosoOpen={succesOpenEdit} mensaje={mensajeModal} handleExitosoOpen={handleSuccesOpenEdit} handleExitosoClose={handleSuccesCloseEdit} productName={producto.nombre} />
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
                onClick={() => handleModalOpen('openCreate')}
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

                      <button onClick={() => handleEditarOpen(producto)} className="bg-FAST-DarkBlue text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#2B3045]">
                        <FiEdit size={20} />
                      </button>

                      <button onClick={() => handleEliminarOpen(producto)} className="bg-[#ef4444] text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#FF6B6B]">
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
  modalStates: PropTypes.shape({
    createOpen: PropTypes.bool.isRequired,
    deleteOpen: PropTypes.bool.isRequired,
    editOpen: PropTypes.bool.isRequired,
  }).isRequired, // Validate modalStates prop as an object with specific shape and ensure it's required
  handleModalOpen: PropTypes.func.isRequired, // Validate handleModalOpen prop as a function and ensure it's required
};
export default ProductTable;
