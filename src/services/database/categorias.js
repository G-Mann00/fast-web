import pb from './pocketbase';

export async function obtenerCategorias(categoriaId) {
    try {
        const results = await pb.collection('categoria').getFullList({}, {
            filter: `id = "${categoriaId}"`,
        });
        return results[0].nombreCategoria;

    } catch (error) {
        console.error('Error cargando las categorias:', error);
        return [];
    }
}

export async function obtenerCategoriasCompletas() {
    try {
        const results = await pb.collection('categoria').getFullList();
        return results.map(result => ({ id: result.id, nombreCategoria: result.nombreCategoria }));

    } catch (error) {
        console.error('Error cargando las categorias:', error);
        return [];
    }
}