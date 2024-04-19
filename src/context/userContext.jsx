import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes

// Crear el contexto de usuario
export const UserContext = createContext();

// Crear el proveedor de usuario
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        // Cargar la información del usuario desde localStorage al cargar el componente
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginUser = (newUser) => {
        // Verifica si el nuevo usuario es diferente del actual antes de actualizar
        if (JSON.stringify(newUser) !== JSON.stringify(user)) {
            // Guardar la información del usuario en localStorage cuando inicia sesión
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
        }
    };

    const logoutUser = () => {
        // Borrar la información del usuario de localStorage cuando cierra sesión
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Añadir PropTypes para validar `children`
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserProvider;
