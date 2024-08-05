import { obtenerOrdenesRealTime, updateStateOrder } from './gestionOrdenes';

export const marcarRealTime = async (getOrdenes) => { 
    try {
      await obtenerOrdenesRealTime(getOrdenes);
      console.log('marcarRealTime:');
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