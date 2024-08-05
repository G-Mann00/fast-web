
const ProductoCard = ({producto, cantidad, precio, notas}) => {
    return (
        <div className="p-5 bg-white rounded shadow-sm mb-8">
            <p className="text-FAST-DarkBlue font-bold">Producto: <span className="text-FAST-Text font-normal ml-16"> {producto} </span></p>
            <p className="text-FAST-DarkBlue font-bold mt-2">Precio unitario: <span className="text-FAST-Text font-normal ml-5"> {precio} </span></p>
            <p className="text-FAST-DarkBlue font-bold mt-2">Cantidad: <span className="text-FAST-Text font-normal ml-16"> {cantidad} </span></p>
            <p className="text-FAST-DarkBlue font-bold  mt-2">Notas:<span className="text-FAST-Text font-normal ml-[90px]"> { notas ? notas : 'Sin notas' }</span> </p>
            
        </div>
    )

}

export default ProductoCard;