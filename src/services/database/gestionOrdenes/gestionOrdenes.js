import pb from '../pocketbase';

export async function obtenerOrdenes(tiendaId, estado) {
    try {
        const records = await pb.collection('VwFactura').getFullList({
            filter: `idTienda = "${tiendaId}" && Estado = ${estado}`,
        });
        if (estado === 1) {
            records.sort((a, b) => new Date(a.created) - new Date(b.created));
            return records || [];
        } else { 
            records.sort((a, b) => new Date(a.updated) - new Date(b.updated));
            return records || [];
        }

        
    } catch (error) {
        console.error('Error al buscar el registro del cajero:', error);
        
        throw error;
    }
}

export async function obtenerDetalleFactura(facturaId) { 
    try {
        const records = await pb.collection('VwDetalleFactura').getFullList({
            filter: `idFactura = "${facturaId}"`,
        });



        return records || [];
    } catch (error) {
        console.error('Error al buscar el registro del cajero:', error);
        
        throw error;
    }
}

export async function obtenerOrdenesProceso(tiendaId, estado) {
    try {
        const records = await pb.collection('VwFactura').getFullList({
            filter: `idTienda = "${tiendaId}" && Estado = ${estado}`,
        });

        records.sort((a, b) => new Date(a.created) - new Date(b.created));

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
      //console.log("Real time Event");
      //console.log(event.action);
      //console.log(event.record);
      if (event.action === "create" || event.action === "update" || event.action === "delete") {
        obtenerOrdenes();
      }
    });   
  }