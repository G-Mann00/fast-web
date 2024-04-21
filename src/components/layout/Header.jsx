import ProfileIcon from "../ProfileIcon"

const Header = () => {
  return (
    <div className="bg-[#FFFFFF] h-16 px-4 flex items-center border-b border-[#ebedef] justify-between">
      
      <div className="flex flex-col relative">
        <p className="text-FAST-Orange font-medium text-xl">Hola *PLACEHOLDER*</p>
        <p className="text-[#676767] font-medium">Te damos la bienvenida a FAST</p>
      </div>

      <div className="flex items-center gap-2 mr-2">
        <ProfileIcon />
      </div>

    </div>
  )
}

export default Header