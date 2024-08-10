import { 
    createContext, 
    useState, 
    useEffect 
} from 'react';
import PropTypes from 'prop-types'; 

export const CategoriaContext = createContext();

// Crear el proveedor de usuario
export const CategoriaProvider = ({ children }) => {
    const [categoria, setCategoria] = useState();

    useEffect(() => {
        const storedCategoria = localStorage.getItem('categoria');
        if (storedCategoria) {
            setCategoria(JSON.parse(storedCategoria));
        }
    }, []);

    return (
        <CategoriaContext.Provider value={{ categoria, setCategoria }}>
            {children}
        </CategoriaContext.Provider>
    );
};

// Añadir PropTypes para validar `children`
CategoriaProvider.propTypes = {
    children: PropTypes.node,
};

export default CategoriaProvider;
