import { 
    Card, 
    CardHeader, 
    Typography, 
    CardBody, 
    Input, 
  } from "../../components/index";

import { useEffect, useState } from "react";
import { useKiosk } from '../../hooks/kiosko';
import { obtenerOrdenesProceso } from "../../services/database";
import { marcarRealTime, updateOrder } from "../../services/database";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

let titulos = ["Gestión de Órdenes", "Gestiona los pedidos que llegan a tu Kiosco", "Buscar orden", "Nueva orden"];
let TABLE_HEAD = ["Nº de orden", "Usuario","Detalles Orden","Precio","Acciones"];	

const ProcesoTable = () => { 
    const { kiosko } = useKiosk();
    const [ordenes, setOrdenes] = useState([]);

    const getOrdenes = async () => {
      try {
        let ordenes_resultados = await obtenerOrdenesProceso(kiosko.id);
        setOrdenes(ordenes_resultados);
      } catch (error) {
        console.error('Error fetching ordenes:', error);
      }
    };
  
    useEffect(() => {
        getOrdenes();
        marcarRealTime(getOrdenes);

      }, []);

    return (
      <div>
        {/* Tabla de ordens */}
        <Card className="h-[500px] w-full overflow-y-auto rounded-lg">
          {/* Encabezado del componente */}
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-6 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input
                    icon={<HiOutlineMagnifyingGlass size={20} />}
                    label={titulos[2]}
                    className="rounded-lg"
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
                {ordenes.map((orden) => ( 
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
                        <button 
                           onClick={getOrdenes}
                           className="bg-FAST-DarkBlue text-FAST-WhiteCream font-bold py-2 px-8 rounded-lg cursor-pointer hover:bg-[#2B3045]">
                           Ver
                        </button>
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
                        onClick={() => updateOrder(orden.id, 3)} 
                        className="bg-[#008000] text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#74c365]">
                          Finalizada
                        </button>
  
                        <button onClick={() => updateOrder(orden.id, 1)} 
                          className="bg-[#ef4444] text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-[#FF6B6B]">
                          Rechazar
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

  export default ProcesoTable;