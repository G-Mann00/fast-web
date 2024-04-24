import { Select, Option } from "@material-tailwind/react";

const CategoriaSelector = () => {
  return (

    <div className="pb-[26px] pt-[22px]">
              
        <h2 className="text-left font-bold text-FAST-Text">Categoria</h2>

        <Select name="categoria" className="text-FAST-Text">
            <Option value="comida">Comida</Option>
            <Option value="bebida">Bebida</Option>
            <Option value="postre">Postre</Option>
            <Option value="snack">Snack</Option>
            <Option value="otro">Otro</Option>
        </Select>

    </div>
  )
}

export default CategoriaSelector