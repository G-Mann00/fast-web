import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import ProcesoTable from "./ProcesoTable";
import OrdenesTable from "./OrdenesTable";

export function OrdenesTabs() {
  const data = [
    {
      label: "Ordenes Entrantes",
      value: "entrantes",
      component: <OrdenesTable />,
    },
    {
      label: "Ordenes en Proceso",
      value: "proceso",
      component: (
        <ProcesoTable
          actualState={2}
          newState={3}
          acciones={["Finalizada", "Cancelar"]}
          last={"Acciones"}
        />
      ),
    },
    {
      label: "Ordenes Finalizadas",
      value: "finalizadas",
      component: (
        <ProcesoTable
          actualState={3}
          newState={4}
          acciones={["Entregada", "Cancelar"]}
          last={"Acciones"}
        />
      ),
    },
    {
      label: "Ordenes Entregadas",
      value: "entregadas",
      component: (
        <ProcesoTable
          actualState={4}
          newState={0}
          acciones={["Aceptar", "Eliminar"]}
          last={"Fecha de entrega"}
        />
      ),
    },
  ];

  return (
    <Tabs id="custom-animation" value="entrantes">
      <TabsHeader >
        {data.map(({ label, value}) => (
          <Tab key={value} value={value} >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, component }) => (
            <TabPanel key={value} value={value}>
              {component}
            </TabPanel>
          ))}
      </TabsBody>
    </Tabs>
  );
}