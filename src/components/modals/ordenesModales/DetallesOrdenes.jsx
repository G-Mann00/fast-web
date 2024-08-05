import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ProductoCard } from "../../index";
import { obtenerDetalleFactura } from "../../../services/database";

export function OrdenesModal({idFactura}) {
  const [open, setOpen] = React.useState(false);
  const [productosDetalle, setProductosDetalle] = React.useState([]);

  const catchDetalleFactura = async (idFactura) => { 
    const respuesta = await obtenerDetalleFactura(idFactura);
    setProductosDetalle(respuesta);

  };

  React.useEffect(() => { 
    catchDetalleFactura(idFactura);
    console.log(productosDetalle);

  }, open);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <button 
          onClick={handleOpen}
          className="bg-FAST-DarkBlue text-FAST-WhiteCream font-bold py-2 px-8 rounded-lg cursor-pointer hover:bg-[#2B3045]">
          Ver
      </button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-FAST-Orange">Detalles de la orden</DialogHeader>
        <DialogBody className="h-[500px] overflow-scroll">
          {productosDetalle.map((producto) => (
            <ProductoCard producto={producto.nombre} cantidad={producto.cantidad} notas={producto.notasProductos} precio={producto.precio}  />
          ))}


        </DialogBody>
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