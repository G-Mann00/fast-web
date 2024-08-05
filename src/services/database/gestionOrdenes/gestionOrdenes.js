import pb from '../pocketbase';

export async function obtenerOrdenes(tiendaId, estado) {
    async function exponentialBackoff(attempt, delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delay * Math.pow(2, attempt));
      });
    }
  
    async function fetchRecords(attempt = 0) {
      try {
        const records = await pb.collection('VwFactura').getFullList({
          filter: `idTienda = "${tiendaId}" && Estado = ${estado}`,
        });
    
          records.sort((a, b) => new Date(a.updated) - new Date(b.updated));

        return records || [];
        
      } catch (error) {
        if (error.status === 429 && attempt < 5) {
          await exponentialBackoff(attempt, 1000);
          return await fetchRecords(attempt + 1);
        } else {
          console.error('Error al buscar las ordenes 1:', error);
          throw error;
        }
      }
    }
  
    return fetchRecords();
  }
  

  export async function obtenerDetalleFactura(facturaId) {
    const maxRetries = 5;
    let retries = 0;
    const backoff = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (retries < maxRetries) {
        try {
            const records = await pb.collection('VwDetalleFactura').getFullList({
                filter: `idFactura = "${facturaId}"`,
            });
            return records || [];
        } catch (error) {
            if (error.status === 429 && attempt < 5 || error.status === null && attempt < 5) {
                // Rate-limited, retry with exponential backoff
                retries += 1;
                console.warn(`Rate limit hit, retrying... (${retries}/${maxRetries})`);
                await backoff(2 ** retries * 1000); // Exponential backoff
            } else {
                console.error('Error fetching record:', error);
                throw error;
            }
        }
    }
    throw new Error('Max retries reached. Please try again later.');
}
export async function obtenerOrdenesProceso(tiendaId, estado) {
    async function exponentialBackoff(attempt, delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delay * Math.pow(2, attempt));
      });
    }
  
    async function fetchRecords(attempt = 0) {
      try {
        const records = await pb.collection('VwFactura').getFullList({
          filter: `idTienda = "${tiendaId}" && Estado = ${estado}`,
        });
  
        records.sort((a, b) => new Date(a.created) - new Date(b.created));
  
        return records || [];
      } catch (error) {
        if (error.status === 429 && attempt < 5 || error.status === null && attempt < 5) {
          await exponentialBackoff(attempt, 1000);
          return await fetchRecords(attempt + 1);
        } else {
          console.error('Error al buscar las ordenes 2', error);
          throw error;
        }
      }
    }
  
    return fetchRecords();
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
        setTimeout(() => {
          obtenerOrdenes();
        }, 1000); // Delay in milliseconds (1000ms = 1 second)
      }
    });   
  }

  export async function obtenerOrdenesRealTimeUpdate(obtenerOrdenes) {
    pb.collection('factura').subscribe('*', function (event) {
      //console.log("Real time Event");
      //console.log(event.action);
      //console.log(event.record);
      if (event.action === "update" || event.action === "delete") {
        setTimeout(() => {
          obtenerOrdenes();
        }, 1000); // Delay in milliseconds (1000ms = 1 second)
      }
    });   
  }