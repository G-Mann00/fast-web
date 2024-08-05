import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { 
  ProductoCard,
  SpinnerFAST
} from "../../index";
import { obtenerDetalleFactura } from "../../../services/database";

export function OrdenesModal({idFactura, open, handleOpen}) {
  const [productosDetalle, setProductosDetalle] = React.useState([]);
  const [loadingS, setLoadingS] = React.useState(true);


  const catchDetalleFactura = async (idFactura) => {
    setLoadingS(true); 
    const respuesta = await obtenerDetalleFactura(idFactura);
    setProductosDetalle(respuesta);
    setLoadingS(false);
  };

  React.useEffect(() => { 
    catchDetalleFactura(idFactura);
  }, [open]);
 
  return (
    <>
      <Dialog 
       open={open} 
       handler={handleOpen}
       >
        <DialogHeader className="text-FAST-Orange">Detalles de la orden</DialogHeader>
        {
          loadingS ? (
            <div className="flex justify-center items-center h-[500px]">
              <SpinnerFAST />
            </div>
          ) : ( 
          <DialogBody className="h-[500px] overflow-scroll">
            {productosDetalle.map((producto) => (
              <ProductoCard 
               producto={producto.nombre} 
               cantidad={producto.cantidad} 
               notas={producto.notasProductos} 
               precio={producto.precio}  
              />
            ))}
          </DialogBody>)
        }
        <DialogFooter className="space-x-2">
        <button 
          onClick={handleOpen} 
          className="bg-[#008000] text-FAST-WhiteCream font-bold py-2 px-4 rounded-lg cursor-pointer  hover:bg-[#74c365]">
          Aceptar
        </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}