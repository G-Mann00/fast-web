// Conexion a la base de datos en nuestra instancia de PocketBase, hosteada en PocketHost
import PocketBase from "pocketbase";

const url = 'https://fast.pockethost.io';

const pb = new PocketBase(url);

export default pb;