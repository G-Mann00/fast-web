import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";

import OrdenesTable from "./OrdenesTable";
import ProcesoTable from "./ProcesoTable";
   
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
        component: <ProcesoTable />,
      },
      {
        label: "Ordenes Finalizadas",
        value: "finalizadas",
      },
   
      {
        label: "Ordenes Entregadas",
        value: "entregadas",
      },

    ];
   
    return (
      <Tabs id="custom-animation" value="ordenes">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
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