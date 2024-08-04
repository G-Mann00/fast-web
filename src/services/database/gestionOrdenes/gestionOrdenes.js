import pb from '../pocketbase';

export async function obtenerOrdenes(tiendaId) {
    try {
        const records = await pb.collection('VwFactura').getFullList({
            filter: `idTienda = "${tiendaId}" && Estado = 1`,
        });

        return records || [];
    } catch (error) {
        console.error('Error al buscar el registro del cajero:', error);
        
        throw error;
    }
}

export async function obtenerOrdenesProceso(tiendaId) {
    try {
        const records = await pb.collection('VwFactura').getFullList({
            filter: `idTienda = "${tiendaId}" && Estado = 2`,
        });

        return records || [];
    } catch (error) {
        console.error('Error al buscar el registro del cajero:', error);
        
        throw error;
    }
}

export async function updateStateOrder(orderId, state) {
    try {
        console.log('orderId:', orderId);
        await pb.collection('factura').update(orderId, {
            Estado: state,
        });
    } catch (error) {
        console.error('Error al actualizar el estado de la orden:', error);
        
        throw error;
    }
}

export async function obtenerOrdenesRealTime(obtenerOrdenes) {
    pb.collection('factura').subscribe('*', function (event) {
      console.log("Real time Event");
      console.log(event.action);
      console.log(event.record);
      if (event.action === 'update' || event.action === 'create' || event.action === 'delete') {
        obtenerOrdenes();
      }
    });   
  }