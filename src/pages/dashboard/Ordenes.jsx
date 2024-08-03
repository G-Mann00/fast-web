import DocumentTitle from "../../components/DocumentTitle";
import { OrdenesTabs } from "../../components/ordenes/OrdenesTabs";

const Ordenes = () => {
  DocumentTitle("FAST - Ordenes");
  return (
    <div>
       <h2 className="text-2xl pb-3 text-FAST-Text font-bold">Gestión de ordenes</h2>
      {/* Tabs de ordenes */}
      <OrdenesTabs />
    </div>
  )
}

export default Ordenes
