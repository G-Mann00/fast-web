import { useState } from 'react';

const useSuccessState = (initialState, successMessage, setMensajeModal) => {
    const [state, setState] = useState(initialState);

    const handleSuccessOpen = () => {
        setTimeout(() => {
            setState(!state);
            setMensajeModal(successMessage);
        }, 1000);
    };

    const handleSuccessClose = () => {
        setState(false);
    };

    return [state, handleSuccessOpen, handleSuccessClose];
};

export default useSuccessState;