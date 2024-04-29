import DocumentTitle from "./DocumentTitle";
import ImageUpload from "./ImageUpload";
import InputSection from "./InputSection";
import NameInput from "./NameInput";
import PasswordInput from "./PasswordInput";
import ProductTable from "./ProductTable";

//Landing Components 
import Footer from "./landing/Footer";
import Hero from "./landing/Hero";
import Navbar from "./landing/Navbar";
import Services from "./landing/Services";
import Partners from "./landing/Partners";
import CategoriaSelector from "./CategoriaSelector";

//Layout Components
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";

//Modals Components
import CreateProduct from "./modals/CreateProduct";
import DeleteProduct from "./modals/DeleteProduct";
import ProductoExitoso from '../components/modals/ProductoExitoso';
import EditProduct from "./modals/EditProduct";

//Loader
import SpinnerFAST from "./deco/SpinnerFAST";

//Material Tailwind Components
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Input,
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter
} from "@material-tailwind/react";


export {
    DocumentTitle,
    ImageUpload,
    PasswordInput,
    InputSection,
    NameInput,
    Footer,
    Hero,
    Navbar,
    Services,
    Sidebar,
    Header,
    Partners,
    CategoriaSelector
}

export {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Input,
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter
}

//Export Modals

export {
    CreateProduct,
    DeleteProduct,
    ProductoExitoso,
    EditProduct
}

//Loader
export {
    SpinnerFAST
}

export {
    ProductTable
}
