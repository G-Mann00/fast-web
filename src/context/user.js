import { useContext } from 'react';
import { UserContext } from './userContext';

export const useUser = () => {
    return useContext(UserContext);
};

