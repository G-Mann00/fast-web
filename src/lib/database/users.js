import pb from './pocketbase';

// globally disable auto cancellation
pb.autoCancellation(false);

function generateId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 15; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}

//// eslint-disable-next-line no-unused-vars
async function createKioskoDetails(userId, data, file) {
    try {
        // Crea un FormData para almacenar los datos de la tienda
        const formData = new FormData();
        formData.append('nombre', data.nomKiosko);
        formData.append('imagen', file);  // Pasa el archivo de imagen
        formData.append('userAdmin', userId);

        // Crea un nuevo registro en la colección 'tienda'
        await pb.collection('tienda').create(formData);
        alert('Kiosko details created successfully');
    } catch (error) {
        console.error('Error creating kiosko details:', error);
        throw error;
    }
}


export async function createUser(data, file) {
    let createdUser = null;

    try {
        console.log('Creating user:', data);
        const uniqueId = generateId();

        const userDetails = {
            id: uniqueId,
            username: data.nomUsuario,
            email: data.email,
            name: data.nombreCompleto,
            avatar: data.foto,
            password: data.password,
            passwordConfirm: data.confirmarPassword,
        };

        createdUser = await pb.collection('usersAdmin').create(userDetails);
        alert('User created successfully');
        
        const userId = createdUser.id; // Obtener el id del usuario creado
        await createKioskoDetails(userId, data, file);
    } catch (error) {
        console.error('Error creating user or kiosko:', error);
        //eliminar el usuario si el kiosko no se crea correctamente
        try {
            console.log(`Deleting user ${createdUser.id} due to kiosko creation error`);
            await pb.collection('usersAdmin').delete(createdUser.id);
            console.log('User deleted due to kiosko creation error');
        } catch (deleteError) {
            console.error('Error deleting user:', deleteError);
        }
        
        return { success: false, message: 'Fallo para crear el usuario o el kiosko', error };
    }
}

export async function isUsernameAvailable(username) {
    try {
        // Realiza una consulta en la colección 'usersAdmin' para buscar el nombre de usuario
        const results = await pb.collection('usersAdmin').getList(1, 1, {
            filter: `username="${username}"` // Filtra por nombre de usuario
        });

        // Si no hay registros encontrados, el nombre de usuario está disponible
        return results.totalItems === 0;

    } catch (error) {
        console.error('Error checking username availability:', error);
        return false; // En caso de error, asume que el nombre de usuario no está disponible
    }
}

export async function isKioskonameAvailable(nombre) {
    try {
        // Realiza una consulta en la colección 'usersAdmin' para buscar el nombre de usuario
        const results = await pb.collection('tienda').getList(1, 1, {
            filter: `nombre="${nombre}"` // Filtra por nombre de usuario
        });

        // Si no hay registros encontrados, el nombre de usuario está disponible
        return results.totalItems === 0;

    } catch (error) {
        console.error('Error checking username availability:', error);
        return false; // En caso de error, asume que el nombre de usuario no está disponible
    }
}
