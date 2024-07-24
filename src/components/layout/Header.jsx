import ProfileIcon from "../ProfileIcon"
import { useUser } from '../../hooks/user';
import { useState, useEffect } from 'react';
import { generarUrlImagen } from '../../utils/index';



const Header = () => {
  const { user } = useUser();
  const [imagenUrl, setImagenUrl] = useState(null);
  const [usuarioName, setUsuarioName] = useState(null);

  useEffect(() => {
    if (user) {
      const imagenUrl = generarUrlImagen(user, 'avatar');
      setImagenUrl(imagenUrl);
      setUsuarioName(user.name);
    }
  }
    , [user]);
  return (
    <div className="bg-[#FFFFFF] h-16 px-4 flex items-center border-b border-[#ebedef] justify-between">

      <div className="flex flex-col relative">
        <p className="text-FAST-Orange font-medium text-xl">Hola {usuarioName ? usuarioName : "Usuario"}</p>
        <p className="text-[#676767] font-medium">Te damos la bienvenida a FAST</p>
      </div>

      <div className="flex items-center gap-2 mr-2">
        <ProfileIcon profilePic={imagenUrl} />
      </div>

    </div>
  )
}

export default Header