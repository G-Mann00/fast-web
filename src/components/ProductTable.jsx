import PropTypes from 'prop-types';
import foodIcon from '../assets/img/fast-default-food-icon.png';
import userIcon from '../assets/img/fast-default-user-icon.png'
import { useState, useEffect } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { 
  Button, 
  Card, 
  CardHeader, 
  Typography, 
  CardBody, 
  Input, 
  CreateProduct, 
  DeleteProduct, 
  ProductoExitoso,
  DeleteCajeros,
  CreateCajero,
  NoMasCajeros
} from "../components/index";
import useSuccessState from '../hooks/modal';
import EditProduct from "../components/modals/EditProduct";

const ProductTable = ({ tableRows, handleModalOpen, modalStates, TABLE_HEAD, titulos, tipo}) => { // Destructure tableRows properly here

  const [producto, setProducto] = useState({});
  const [mensajeModal, setMensajeModal] = useState(""); //estado para definir el mensaje del modal
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [showModalCajero, setShowModalCajero] = useState(false);
  const [sujetoState, setSujetoState] = useState("");
  const [succesOpen, handleSuccesOpen, handleSuccesClose] = useSuccessState(false, 'fue eliminado exitosamente', setMensajeModal);
  const [succesOpenAdd, handleSuccesOpenAgregar, handleSuccesCloseAdd] = useSuccessState(false, 'fue agregado exitosamente', setMensajeModal);
  const [succesOpenEdit, handleSuccesOpenEdit, handleSuccesCloseEdit] = useSuccessState(false, 'fue editado exitosamente', setMensajeModal);
  const [succesOpenProhibido, handleSuccessOpenProhibido ,handleSuccesCloseProhibido] = useSuccessState(false,'No tienes permitido agregar más cajeros',setMensajeModal);
  
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); //estado para definir el termino de busqueda

  //Variable global para saber la cantidad de elementos en un arreglo
  
  const modalOpen = (type, producto, modal) => { //Función para abrir el modal de edición o eliminación de producto
    setProducto(producto);
    handleModalOpen(type);
    setSujetoState("producto");
    setShowModalProduct(modal);
  }

  const modalOpenAdd = (type, modal) => { //Función para abrir el modal de creación de un producto
    handleModalOpen(type);
    setSujetoState("producto");
    setShowModalProduct(modal);
  }

  const modalOpenAddCajero = (type, modal) => { //Función para abrir el modal de creación de un cajero
    if (tableRows.length >= 1) {
      handleSuccessOpenProhibido();
    } else {
      handleModalOpen(type);
      setSujetoState("cajero");
      setShowModalCajero(modal);
    }

  }

  const modalOpenCajeros = (type, producto, modal) => { //Función para abrir el modal de edición o eliminación de cajero
    setProducto(producto);
    setSujetoState("cajero");
    handleModalOpen(type);
    setShowModalCajero(modal);
  }
  
  const handleSearchChange = (event) => {
   setSearchTerm(event.target.value);
  };

  useEffect(() => { //use effect para el primer re-render de la tabla
    setFilteredRegistros(tableRows);
  }, [tableRows]); 

  useEffect(() => {
  // Filtrar los registros de la tabla
  let registrosFiltrados;
  registrosFiltrados = tableRows.filter((registro) => {
    return registro[1].toLowerCase().includes(searchTerm.toLowerCase());
  }); 
  setFilteredRegistros(registrosFiltrados);
  }, [searchTerm]);

  return (
    <div>
      {/* Modales de creacion y eliminacion de productos al igual que los modales de operacion exitosa */}
      {showModalProduct === "Create" && 
      (<><CreateProduct 
      stateOpen={modalStates.createOpen} 
      handleModalOpen={handleModalOpen}
      handleSuccessOpen={handleSuccesOpenAgregar} 
      setNombreProd={setProducto} />
      </>)}

      {showModalCajero === "Create" && 
      (<><CreateCajero 
      stateOpen={modalStates.createOpen} 
      handleModalOpen={handleModalOpen} 
      handleSuccessOpen={handleSuccesOpenAgregar} 
      setNombreProd={setProducto} />
      </>)}

      {showModalProduct === "Edit" && 
      (<><EditProduct 
      editOpen={modalStates.editOpen} 
      handleModalOpen={handleModalOpen} 
      producto={producto} 
      handleSuccesOpenEdit={handleSuccesOpenEdit} 
      tipo={"producto"}/>
      </>)}

      {showModalProduct === "Delete" && 
      (<><DeleteProduct 
      deleteOpen={modalStates.deleteOpen} 
      handleModalOpen={handleModalOpen} 
      producto={producto} 
      handleSuccessOpen={handleSuccesOpen} />
      </>)}

      {showModalCajero === "Delete" && 
      (<><DeleteCajeros 
      deleteOpen={modalStates.deleteOpen} 
      handleModalOpen={handleModalOpen} 
      cajero={producto}  
      handleSuccessOpen={handleSuccesOpen}
      />
      </>)}

      <><ProductoExitoso 
      sujeto={sujetoState} 
      exitosoOpen={succesOpen} 
      mensaje={mensajeModal} 
      handleExitosoClose={handleSuccesClose} 
      productName={producto[1]} />
      </>

      <><ProductoExitoso 
      sujeto={sujetoState} 
      exitosoOpen={succesOpenEdit} 
      mensaje={mensajeModal} 
      handleExitosoClose={handleSuccesCloseEdit} 
      productName={producto[1]} />
      </>

      <><ProductoExitoso 
      sujeto={sujetoState} 
      exitosoOpen={succesOpenAdd} 
      mensaje={mensajeModal} 
      handleExitosoClose={handleSuccesCloseAdd} 
      productName={producto} />
      </>

      <NoMasCajeros 
      exitosoOpen={succesOpenProhibido}
      handleExitosoClose={handleSuccesCloseProhibido}>
      </NoMasCajeros>
      {/* Tabla de productos */}
      <Card className="h-[500px] w-full overflow-y-auto rounded-lg">
        {/* Encabezado del componente */}
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-6 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>

              <Typography variant="h5" className="text-FAST-Text">
              {titulos[0]}
              </Typography>
              <Typography className="mt-1 font-normal text-FAST-Text">
                {titulos[1]}
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  icon={<HiOutlineMagnifyingGlass size={20} />}
                  label={titulos[2]}
                  className="rounded-lg"
                  onChange={handleSearchChange}
                />
              </div>
              <Button className="flex items-center gap-3 bg-FAST-Orange text-[#FFFFFF] hover:bg-[#ed6d1f]"
                size="sm"
                onClick={tipo == "productos" ? () => modalOpenAdd('openCreate', 'Create') : () => modalOpenAddCajero('openCreate','Create')}
              >
                <MdOutlineLibraryAdd size={20} />
                {titulos[3]}
              </Button>
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
              {filteredRegistros.map(producto => (
                // Creando las filas de la tabla con sus respectivos estilos
                <tr key={producto[0]} className="even:bg-blue-gray-50/50">
                  {/* Producto */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {tipo == "productos" &&  
                      (<img 
                      src={producto[5] ? producto[5] : foodIcon}
                       alt="Icono de comida" 
                       className="w-[48px] h-[48px] rounded-lg" />)}
                      {tipo == "cajeros" &&  
                      (<img src={userIcon} 
                      alt="Icono de cajero" 
                      className="w-[48px] h-[48px] rounded-lg" />)}
                      <Typography 
                      variant="small" 
                      className="text-FAST-Text font-normal" >
                        {producto[1]}
                      </Typography>
                    </div>
                  </td>
                  {/* Descripcion */}
                  <td className="p-4">
                    <Typography 
                    variant="small" 
                    className="text-FAST-Text font-normal">
                      {producto[7]}
                    </Typography>
                  </td>

                  {/* Precio */}
                  <td className="p-4">
                    <Typography 
                    variant="small" 
                    className="text-FAST-Text font-normal">
                      {producto[8]}
                    </Typography>
                  </td>

                  {/* Categoria */}
                  <td className="p-4">
                    <Typography 
                    variant="small" 
                    color="blue-gray" className="font-normal">
                      {producto[3]}
                    </Typography>
                  </td>

                  {/* Botones de accion */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">

                      <button 
                      onClick={() => modalOpen("openEdit", producto, "Edit")} 
                      className="bg-FAST-DarkBlue text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#2B3045]">
                        <FiEdit size={20} />
                      </button>

                      <button onClick={
                        tipo == "productos" ? () => modalOpen('openDelete', producto, "Delete") 
                        : () => modalOpenCajeros('openDelete', producto, "Delete")
                        } 
                        className="bg-[#ef4444] text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#FF6B6B]">
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
    </div>
  );
};
// Add PropTypes validation
ProductTable.propTypes = {
  tipo: PropTypes.string.isRequired, // Validate tipo prop as a string and ensure it's required
  tableRows: PropTypes.array.isRequired, // Validate tableRows prop as an array and ensure it's required
  TABLE_HEAD: PropTypes.array.isRequired, // Validate TABLE_HEAD prop as an array and ensure it's required
  titulos: PropTypes.array.isRequired, // Validate titulos prop as an array and ensure it's required
  modalStates: PropTypes.shape({
    createOpen: PropTypes.bool.isRequired,
    deleteOpen: PropTypes.bool.isRequired,
    editOpen: PropTypes.bool.isRequired,
  }).isRequired, // Validate modalStates prop as an object with specific shape and ensure it's required
  handleModalOpen: PropTypes.func.isRequired, // Validate handleModalOpen prop as a function and ensure it's required
};
export default ProductTable;
