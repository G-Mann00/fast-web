import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";

import ProcesoTable from "./ProcesoTable";
   
  export function OrdenesTabs() {
    const data = [
      {
        label: "Ordenes Entrantes",
        value: "entrantes",
        component: 
        <ProcesoTable  
          actualState={1} 
          newState={2} 
          acciones={["Aceptar", "Rechazar"]} 
          last={"Acctiones"} 
         />,
      },
      {
        label: "Ordenes en Proceso",
        value: "proceso",
        component: 
         <ProcesoTable  
          actualState={2} 
          newState={3} 
          acciones={["Finalizada", "Cancelar"]} 
          last={"Acctiones"} 
         />,
      },
      {
        label: "Ordenes Finalizadas",
        value: "finalizadas",
        component: 
         <ProcesoTable  
          actualState={3} 
          newState={4} 
          acciones={["Entregada", "Cancelar"]} 
          last={"Acctiones"} 
         />,
      },
   
      {
        label: "Ordenes Entregadas",
        value: "entregadas",
        component: 
         <ProcesoTable  
          actualState={4} 
          newState={0} 
          acciones={["Aceptar", "Eliminar"]} 
          last={"Fecha de entrega"} 
         />,
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