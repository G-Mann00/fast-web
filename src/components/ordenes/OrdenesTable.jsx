import { 
    Card, 
    CardHeader, 
    Typography, 
    CardBody, 
    Input, 
  } from "../../components/index";

import { OrdenesModal } from "../../components/modals/ordenesModales/DetallesOrdenes";

import { useEffect, useState } from "react";
import { useKiosk } from '../../hooks/kiosko';
import { obtenerOrdenes, updateOrder, marcarRealTime } from "../../services/database";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";


let titulos = ["Gestión de Órdenes", "Gestiona los pedidos que llegan a tu Kiosco", "Buscar orden", "Nueva orden"];
let TABLE_HEAD = ["Nº de orden", "Usuario","Detalles Orden","Total","Acciones"];	

const OrdenesTable = () => { 
    const { kiosko } = useKiosk();
    const [ordenes, setOrdenes] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filteredRegistros, setFilteredRegistros] = useState([]);

    const getOrdenes = async () => {
      try {
        let ordenes_resultados = await obtenerOrdenes(kiosko.id);
        setOrdenes(ordenes_resultados);
      } catch (error) {
        console.error('Error fetching ordenes:', error);
      }
    };

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
     };

     useEffect(() => {
      let registrosFiltrados;
      registrosFiltrados = ordenes.filter((registro) => {
        return registro.name.toLowerCase().includes(searchTerm.toLowerCase());
      }); 
      setFilteredRegistros(registrosFiltrados);
      }, [searchTerm]);
  
    useEffect(() => {
      getOrdenes();
      marcarRealTime(getOrdenes);
     }, []);

     useEffect(() => { 
      setFilteredRegistros(ordenes);
      console.log('ordenes:', filteredRegistros);
     }, [ordenes]);

    return (
      <div>
        {/* Tabla de ordens */}
        <Card className="h-[500px] w-full overflow-y-auto rounded-lg">
          {/* Encabezado del componente */}
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-6 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full mt-2 md:w-72">
                  <Input
                    icon={<HiOutlineMagnifyingGlass size={20} />}
                    label={titulos[2]}
                    className="rounded-lg"
                    onChange={handleSearchChange}
                  />
                </div>
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
                {filteredRegistros.map((orden) => ( 
                  <tr key={orden.id} className="even:bg-blue-gray-50/50">
                    {/* orden */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Typography 
                        variant="small" 
                        className="text-FAST-Text font-normal" >
                          {orden.id}
                        </Typography>
                      </div>
                    </td>
                    {/* Usuario */}
                    <td className="p-4">
                      <Typography 
                      variant="small" 
                      className="text-FAST-Text font-normal">
                        {orden.name}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography 
                      variant="small" 
                      className="text-FAST-Text font-normal">
                      <OrdenesModal idFactura={orden.id}/>
                      </Typography>
                    </td>
                    {/*Precio */}
                    <td className="p-4">
                      <Typography 
                      variant="small" 
                      color="blue-gray" className="font-normal">
                        {orden.montoTotal}
                      </Typography>
                    </td>
  
                    {/* Botones de accion */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
  
                        <button 
                        onClick={() => updateOrder(orden.id, 2)} 
                        className="bg-[#008000] text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer  hover:bg-[#74c365]">
                          Aceptar
                        </button>
  
                        <button onClick={() => updateOrder(orden.id, 5)} 
                          className="bg-[#ef4444] text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#FF6B6B]">
                          Cancelar
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

  export default OrdenesTable;