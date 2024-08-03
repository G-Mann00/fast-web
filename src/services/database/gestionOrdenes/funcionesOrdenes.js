import { obtenerOrdenesRealTime, updateStateOrder } from './gestionOrdenes';

export const marcarRealTime = async (getOrdenes) => { 
    try {
      await obtenerOrdenesRealTime(getOrdenes);
    } catch (error) {
      console.error('Error fetching ordenes:', error);
    } 
  };
  
export const updateOrder = async (id, state) => {
    console.log("id", id);
    try {
      await updateStateOrder(id, state);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };