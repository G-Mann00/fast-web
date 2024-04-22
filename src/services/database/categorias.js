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