import { Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react"
import userIcon from '../assets/img/fast-default-user-icon.png'
import PropTypes from 'prop-types'; // Import PropTypes

const ProfileIcon = (profilePic) => {
    return (
        <Menu>

            {/* El componente que manejara la interaccion con el menu, en este caso el icono del perfil */}
            <MenuHandler>
                <img
                    src={profilePic.profilePic ? profilePic.profilePic : userIcon}
                    alt="Icono de usuario"
                    className="w-[48px] h-[48px] rounded-full cursor-pointer"
                />
            </MenuHandler>
            {/* El menu que se desplegara al hacer click en el icono del perfil */}
            <MenuList>
                {/* Ajustes */}
                <MenuItem>
                    <Typography className="font-bold text-[#32343E]">Ajustes</Typography>
                </MenuItem>

                <hr className="my-2 border-blue-gray-50"></hr>

                {/* Cerrar Sesion */}
                <MenuItem>
                    <Typography className="font-bold text-[#32343E]">Cerrar Sesion</Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

ProfileIcon.protoTypes = {
    profilePic: PropTypes.string.isRequired
};

export default ProfileIcon
