import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes

// Crear el contexto de kiosko
export const KioskoContext = createContext();

// Crear el proveedor de kiosko
export const KioskoProvider = ({ children }) => {
    const [kiosko, setKiosko] = useState();

    useEffect(() => {
        // Cargar la información del kiosko desde localStorage al cargar el componente
        const storedKiosko = localStorage.getItem('kiosko');
        if (storedKiosko) {
            setKiosko(JSON.parse(storedKiosko));
        }
    }, []);

    const loginKiosko = (newKiosko) => {
        // Verifica si el nuevo kiosko es diferente del actual antes de actualizar
        if (JSON.stringify(newKiosko) !== JSON.stringify(kiosko)) {
            // Guardar la información del kiosko en localStorage cuando inicia sesión
            setKiosko(newKiosko);
            localStorage.setItem('kiosko', JSON.stringify(newKiosko));
        }
    };


    const logoutKiosko = () => {
        // Borrar la información del kiosko de localStorage cuando cierra sesión
        setKiosko(null);
        localStorage.removeItem('kiosko');
    };

    return (
        <KioskoContext.Provider value={{ kiosko, setKiosko, loginKiosko, logoutKiosko }}>
            {children}
        </KioskoContext.Provider>
    );
};

// Añadir PropTypes para validar `children`
KioskoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default KioskoProvider;
