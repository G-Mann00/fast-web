import { obtenerOrdenesRealTime, updateStateOrder, obtenerOrdenesRealTimeUpdate } from './gestionOrdenes';

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