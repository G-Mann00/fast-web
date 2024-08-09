import pb from './pocketbase';
import { generateId } from '../../utils/randomId';
import { 
    capitalizeFirstLetter, 
    createPassword } from '../../utils/index';

// globally disable auto cancellation
pb.autoCancellation(false);

//funciones de registro
async function createKioskoDetails(userId, data, file) {
    let nombreKiosko = capitalizeFirstLetter(data.nomKiosko);
    try {

        const kioskoDetails = {
            nombre : nombreKiosko,
            telefono : data.numeroTelefono,
            imagen: file,
            userAdmin: userId,
            state: 0,
        }

        await pb.collection('tienda').create(kioskoDetails);
    } catch (error) {
        console.error('Error creating kiosko details:', error);
        throw error;
    }
}


export async function createUser(data, file) {
    let createdUser = null;
    let nombreCompleto = capitalizeFirstLetter(data.nombreCompleto.trim());
    let password = createPassword();
    try {
        const uniqueId = generateId();
        const userDetails = {
            id: uniqueId,
            email: data.email,
            name: nombreCompleto,
            avatar: data.foto,
            password: password,
            passwordConfirm: password,
        };

        createdUser = await pb.collection('usersAdmin').create(userDetails);

        if (createdUser) {
            const userId = createdUser.id;
            try {
                await createKioskoDetails(userId, data, file);
                return createdUser;
            }
            catch (error) {
                await pb.collection('usersAdmin').delete(createdUser.id);
                console.log('User deleted due to kiosko creation error');
            }
        }

    } catch (error) {
        console.error('Error creando el usuario:', error);
        return false;
    }
}

export async function isKioskonameAvailable(nombre, type) {
    const kioskoName = capitalizeFirstLetter(nombre);
    try {
        // Realiza una consulta en la colección 'usersAdmin' para buscar el nombre de usuario
        const results = await pb.collection('tienda').getList(1, 1, {
            filter: `nombre="${kioskoName}"` // Filtra por nombre de Kiosko
        });

        // Si no hay registros encontrados, el nombre de usuario está disponible
        if (results.totalItems === 0 && type === "create") {
            return true;
        } else if (results.totalItems === 1 && type === "edit") {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Error verificando la disponibilidad del nombre del kiosko:', error);
        return false; // En caso de error, asume que el nombre de usuario no está disponible
    }
}

//Función para verificar si el email ya está relacionado con otro usuario
export async function isEmailAvailable(email) {
    try {
        const results = await pb.collection("usersAdmin").getFullList({}, {
            filter: `email = "${email}" `,
        });
        console.log(results);
        console.log('Resultados: ', results.length);
        const emailAvailable = results.totalItems === 0;
        console.log('emailAvailable:', emailAvailable);

        return emailAvailable;

    } catch (error) {
        console.error('Error verificando la disponibilidad del email:', error);
        return false;
    }
}
//funciones de login

export async function authenticateUser(email, password) {
    try {
        // Authenticate the user with email and password
        const user = await pb.collection('usersAdmin').authWithPassword(email, password);

        // If authentication is successful, you can access the authenticated user
        //console.log('User authenticated:', user.record);
        const newUser = user.record;

        // Return the authenticated user
        return newUser;
    } catch (error) {
        // Handle authentication error
        console.error('Authentication error:', error);
        return null;
    }
}

//Función para verificar si un usuario tiene registros de tienda
export async function hasTiendaRecords(userId) {
    try {
        // Realiza una consulta en la colección 'tienda' para buscar registros relacionados con el usuario especificado
        const results = await pb.collection('tienda').getList(1, 1, {
            filter: `userAdmin="${userId}"` // Filtra por userAdmin (ID del usuario)
        });

        // Si se encuentra al menos un registro, devuelve true; de lo contrario, devuelve false
        return results.totalItems > 0;

    } catch (error) {
        console.error('Error verificando si el usuario tiene un kiosko:', error);
        // En caso de error, asume que hay registros relacionados con el usuario 
        return false;
    }
}

export async function obtenerDatosActualizadosUsuario(userId) {
    try {
        // Realiza una consulta a la base de datos para obtener los datos actualizados del usuario
        const user = await pb.collection('usersAdmin').getOne(userId);
        // Devuelve los datos actualizados del usuario
        return user;
    } catch (error) {
        console.error('Error al obtener los datos actualizados del usuario:', error);
        // Devuelve null si hay algún error
        return null;
    }
}

export async function editarUsuario(userId, user, file ) {
    try {
        let userDetails = {};
        const nombreCompleto = capitalizeFirstLetter(user.nameUser);
        if (file != null ){
             userDetails = {
                name: nombreCompleto,
                avatar: file,
            };
        } else {
            userDetails = {
                name: nombreCompleto,
            };
        }
        
        const res = await pb.collection('usersAdmin').update(userId, userDetails);
        console.log('Usuario actualizado:', res);
        return res;


    } catch (error) { 
        if (error.response && error.response.data) {
            console.log(error.response.data);
            return false;
         }
        return null;
    }

}

