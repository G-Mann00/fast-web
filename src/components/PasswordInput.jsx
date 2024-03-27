import closedEye from '../assets/img/eye-closed.svg';
import openEye from '../assets/img/eye-open.svg';
import { useState } from "react";

const PasswordInput = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    return (
      <div className="relative flex h-[40px] justify-items-end rounded-lg bg-[#A0A5BA]/20">
        <input 
          className="absolute size-full rounded-lg bg-[#A0A5BA]/[0] p-3"
          type={passwordVisible ? 'text' : 'password'}
          placeholder="* * * * * * * *"
        />
        <button type="button" onClick={togglePasswordVisibility} className="absolute right-4 top-[11px]"> 
          <img 
            className="w-fit max-w-[24px] h-fit max-h-[24px] pt-0.5" 
            src={passwordVisible ? openEye : closedEye} 
            alt={passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
          />
        </button>
      </div>
    );
  };

export default PasswordInput;