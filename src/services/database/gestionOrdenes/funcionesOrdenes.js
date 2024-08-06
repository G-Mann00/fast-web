import { 
  obtenerOrdenesRealTime, 
  updateStateOrder, 
  obtenerOrdenesRealTimeUpdate 
  } from './gestionOrdenes';

  import { format } from "date-fns";
  import es from "date-fns/locale/es";

export const marcarRealTime = async (getOrdenes) => { 
    try {
      await obtenerOrdenesRealTime(getOrdenes);
    } catch (error) {
      console.error('Error fetching ordenes:', error);
    } 
  };

export const marcarRealTimeUpdate = async (getOrdenes) => { 
    try {
      await obtenerOrdenesRealTimeUpdate(getOrdenes);
    } catch (error) {
      console.error('Error fetching ordenes:', error);
    } 
  };
  
export const updateOrder = async (id, state) => {
    try {
      await updateStateOrder(id, state);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

export function changeDateFormat(dateString) {
  try{
    return format(new Date(dateString), "dd 'de' MMMM 'del' yyyy", { locale: es })
  } catch(error) {
    console.log('Error al cambiar el formato de la fecha:', error);
  }
};