// src/pages/Inicio.js
import DocumentTitle from "../../components/DocumentTitle";
import { useEffect, useState, useCallback } from "react";
import pb from "../../services/database/pocketbase";
import { SpinnerFAST } from "../../components";

// Importaciones de Recharts
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

// --- Helpers Globales (Sin cambios) ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "NIO",
  }).format(amount);
};

const getStartDate = (periodo) => {
  const now = new Date();
  switch (periodo) {
    case "hoy":
      now.setHours(0, 0, 0, 0);
      return now;
    case "semana":
      const firstDayOfWeek =
        now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1);
      now.setDate(firstDayOfWeek);
      now.setHours(0, 0, 0, 0);
      return now;
    case "mes":
      now.setDate(1);
      now.setHours(0, 0, 0, 0);
      return now;
    case "total":
    default:
      return null;
  }
};

// --- Componentes Internos del Dashboard ---

/**
 * FiltroPeriodo (Sin cambios)
 */
const FiltroPeriodo = ({ periodo, setPeriodo }) => {
  const periodos = [
    { key: "hoy", label: "Hoy" },
    { key: "semana", label: "Esta Semana" },
    { key: "mes", label: "Este Mes" },
    { key: "total", label: "Total" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {periodos.map((p) => (
        <button
          key={p.key}
          onClick={() => setPeriodo(p.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            periodo === p.key
              ? "bg-[#ff7622] text-white"
              : "bg-gray-200 text-FAST-Text hover:bg-gray-300"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};

/**
 * StatCard (Sin cambios)
 */
const StatCard = ({ titulo, valor }) => (
  <div className="p-4 bg-white rounded shadow">
    <p className="text-sm text-gray-500">{titulo}</p>
    <p className="text-2xl font-bold">{valor}</p>
  </div>
);

/**
 * --- GraficoVentas (REFACTORIZADO) ---
 * Ya no busca datos. Recibe 'facturas' y 'periodo' como props.
 */
const GraficoVentas = ({ facturas, periodo }) => {
  const [data, setData] = useState([]);
  const [tituloGrafico, setTituloGrafico] = useState("");

  // Formateadores (Sin cambios)
  const formatXAxis = (value) => {
    switch (periodo) {
      case "hoy": return value;
      case "semana": return new Date(value).toLocaleDateString("es-NI", { weekday: "short" });
      case "mes": return new Date(value).toLocaleDateString("es-NI", { day: "numeric" });
      case "total": return new Date(value + '-02').toLocaleDateString("es-NI", { month: "short", year: "2-digit" });
      default: return value;
    }
  };
  const formatTooltipLabel = (label) => {
    switch (periodo) {
      case "hoy": return `Hoy, ${label}`;
      case "semana": return new Date(label).toLocaleDateString("es-NI", { weekday: 'long', month: 'short', day: 'numeric' });
      case "mes": return new Date(label).toLocaleDateString("es-NI", { dateStyle: 'medium' });
      case "total": return new Date(label + '-02').toLocaleDateString("es-NI", { month: 'long', year: 'numeric' });
      default: return label;
    }
  };

  // --- Lógica de PROCESAMIENTO (antes en useEffect) ---
  // Se ejecuta cada vez que las 'facturas' o el 'periodo' cambian.
  useEffect(() => {
    // El 'try/catch' se elimina, ya que no hay 'await'
    const startDate = getStartDate(periodo); // Necesario para 'semana' y 'mes'
    let dataMap = new Map();
    let newTitle = "";

    if (periodo === "hoy") {
      newTitle = "Ventas de Hoy (por hora)";
      for (let i = 0; i < 24; i++) { dataMap.set(i, { fecha: `${i}h`, totalVentas: 0 }); }
      facturas.forEach(f => {
        const hora = new Date(f.created).getHours();
        if (dataMap.has(hora)) { dataMap.get(hora).totalVentas += (Number(f.montoTotal) || 0); }
      });
      setData(Array.from(dataMap.values()).slice(6, 23));
    } else if (periodo === "semana") {
      newTitle = "Ventas de esta Semana";
      for (let i = 0; i < 7; i++) {
        const dia = new Date(startDate); dia.setDate(dia.getDate() + i);
        dataMap.set(dia.toISOString().split('T')[0], { fecha: dia.toISOString(), totalVentas: 0 });
      }
      facturas.forEach(f => {
        const fechaFactura = f.created.split(' ')[0];
        if (dataMap.has(fechaFactura)) { dataMap.get(fechaFactura).totalVentas += (Number(f.montoTotal) || 0); }
      });
      setData(Array.from(dataMap.values()));
    } else if (periodo === "mes") {
      newTitle = `Ventas de ${new Date().toLocaleDateString('es-NI', { month: 'long' })}`;
      const diasEnMes = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
      for (let i = 1; i <= diasEnMes; i++) {
        const dia = new Date(startDate); dia.setDate(i);
        dataMap.set(dia.toISOString().split('T')[0], { fecha: dia.toISOString(), totalVentas: 0 });
      }
      facturas.forEach(f => {
        const fechaFactura = f.created.split(' ')[0];
        if (dataMap.has(fechaFactura)) { dataMap.get(fechaFactura).totalVentas += (Number(f.montoTotal) || 0); }
      });
      setData(Array.from(dataMap.values()));
    } else if (periodo === "total") {
      newTitle = "Ventas Totales (por mes)";
      facturas.forEach(f => {
        const fecha = new Date(f.created);
        const mesKey = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
        if (!dataMap.has(mesKey)) { dataMap.set(mesKey, { fecha: mesKey, totalVentas: 0 }); }
        dataMap.get(mesKey).totalVentas += (Number(f.montoTotal) || 0);
      });
      setData(Array.from(dataMap.values()));
    }
    setTituloGrafico(newTitle);
    
  }, [facturas, periodo]); // Se re-procesa si las 'facturas' o 'periodo' cambian

  // --- Renderizado del Gráfico (Sin 'loading') ---
  const isBarChart = periodo === 'total' || periodo === 'hoy';
  const ChartComponent = isBarChart ? BarChart : LineChart;
  const ChartSeries = isBarChart ? Bar : Line;

  return (
    <div>
      <h3 className="text-lg font-bold text-FAST-Text mb-4">{tituloGrafico}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ChartComponent data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" tickFormatter={formatXAxis} padding={{ left: 20, right: 20 }} />
            <YAxis tickFormatter={(value) => `C$${value / 1000}k`} />
            <Tooltip
              formatter={(value) => [formatCurrency(value), "Ventas"]}
              labelFormatter={formatTooltipLabel}
            />
            <ChartSeries
              dataKey="totalVentas"
              stroke="#ff7622"
              fill="#ff7622" 
              strokeWidth={2}
              {...(isBarChart ? {} : { type: "monotone", dot: { r: 4 }, activeDot: { r: 8 } })}
            />
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/**
 * --- ProductosMasVendidos (REFACTORIZADO) ---
 * Ya no busca datos. Recibe 'detalles' como props.
 */
const ProductosMasVendidos = ({ detalles }) => {
  const [data, setData] = useState([]);

  // --- Lógica de PROCESAMIENTO (antes en useEffect) ---
  useEffect(() => {
    const productSales = new Map();
    detalles.forEach(item => {
      const producto = item.expand?.idProducto;
      if (!producto) return; 

      const totalItem = (Number(item.cantidad) || 0) * (Number(item.precio) || 0); 
      const currentData = productSales.get(producto.id) || {
        nombre: producto.nombre, 
        totalVentas: 0,
        cantidad: 0,
      };

      currentData.totalVentas += totalItem;
      currentData.cantidad += (Number(item.cantidad) || 0); 
      productSales.set(producto.id, currentData);
    });

    const sortedProducts = Array.from(productSales.values())
      .sort((a, b) => b.totalVentas - a.totalVentas)
      .slice(0, 5);

    setData(sortedProducts);
  }, [detalles]); // Se re-procesa si los 'detalles' cambian

  return (
    <div className="p-4 bg-white rounded shadow h-full">
      <h3 className="text-lg font-bold text-FAST-Text mb-4">Productos Más Vendidos</h3>
      {data.length === 0 ? (
        <p className="text-gray-500">No hay datos de productos para este período.</p>
      ) : (
        <ol className="list-decimal list-inside space-y-2">
          {data.map((prod, index) => (
            <li key={index} className="text-sm">
              <span className="font-semibold text-FAST-Text">{prod.nombre}</span>
              <div className="text-xs text-gray-600 pl-4">
                {formatCurrency(prod.totalVentas)} ({prod.cantidad} unid.)
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};


/**
 * --- CategoriasMasVendidas (REFACTORIZADO) ---
 * Ya no busca datos. Recibe 'detalles' como props.
 */
const CategoriasMasVendidas = ({ detalles }) => {
  const [data, setData] = useState([]);

  // --- Lógica de PROCESAMIENTO (antes en useEffect) ---
  useEffect(() => {
    const categorySales = new Map();
    detalles.forEach(item => {
      const categoria = item.expand?.idProducto?.expand?.categoria;

      let key = 'sin-categoria';
      let nombre = 'Sin Categoría'; 

      if (categoria) {
        key = categoria.id;
        nombre = categoria.nombreCategoria; 
      }

      const totalItem = (Number(item.cantidad) || 0) * (Number(item.precio) || 0);
      
      const currentData = categorySales.get(key) || {
        nombre: nombre, 
        totalVentas: 0,
      };

      currentData.totalVentas += totalItem;
      categorySales.set(key, currentData); 
    });

    const sortedCategories = Array.from(categorySales.values())
      .sort((a, b) => b.totalVentas - a.totalVentas)
      .slice(0, 5);

    setData(sortedCategories);
  }, [detalles]); // Se re-procesa si los 'detalles' cambian

  return (
    <div className="p-4 bg-white rounded shadow h-full">
      <h3 className="text-lg font-bold text-FAST-Text mb-4">Categorías Más Vendidas</h3>
      {data.length === 0 ? (
        <p className="text-gray-500">No hay datos de categorías para este período.</p>
      ) : (
        <ol className="list-decimal list-inside space-y-2">
          {data.map((cat, index) => (
            <li key={index} className="text-sm">
              <span className="font-semibold text-FAST-Text">{cat.nombre}</span>
              <div className="text-xs text-gray-600 pl-4">
                {formatCurrency(cat.totalVentas)}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};


// --- Componente Principal: INICIO (REFACTORIZADO) ---

const Inicio = () => {
  DocumentTitle("FAST - Inicio");

  // Estados de Carga
  const [loadingTienda, setLoadingTienda] = useState(true);
  const [loadingPeriodo, setLoadingPeriodo] = useState(true);
  
  // Estados de Control
  const [tiendaId, setTiendaId] = useState(null);
  const [periodo, setPeriodo] = useState("hoy"); 
  const [authUser, setAuthUser] = useState(pb.authStore.model); 

  // Estados de Datos Centralizados
  const [stats, setStats] = useState({
    productos: 0,
    tiendas: 0,
    facturas: 0,
    totalVentas: 0,
    clientesUnicos: 0,
  });
  const [facturasData, setFacturasData] = useState([]);
  const [detallesData, setDetallesData] = useState([]);


  // --- EFECTO 1: Suscribirse a los cambios de Auth (Sin cambios) ---
  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setAuthUser(model); 
    });
    return () => unsubscribe(); 
  }, []); 

  // --- EFECTO 2: Obtener la Tienda (Usa 'loadingTienda') ---
  useEffect(() => {
    let mounted = true;
    const getTiendaDelUsuario = async () => {
      if (authUser && authUser.id) {
        setLoadingTienda(true); // Spinner principal
        try {
          const tiendaRes = await pb
            .collection("tienda") 
            .getFirstListItem(`userAdmin = '${authUser.id}'`);
          if (mounted) {
            setTiendaId(tiendaRes.id);
          }
        } catch (error) {
          console.error("Usuario no tiene tienda asignada:", error);
          if (mounted) {
            setTiendaId(null);
          }
        } finally {
          if (mounted) {
            setLoadingTienda(false); // Oculta spinner principal
          }
        }
      } else {
        if (mounted) {
          setTiendaId(null); 
          setLoadingTienda(false); // Oculta spinner principal
        }
      }
    };
    getTiendaDelUsuario();
    return () => {
      mounted = false;
    };
  }, [authUser]); 

  // --- EFECTO 3: Cargar TODOS los datos del Dashboard ---
  // Se ejecuta si 'tiendaId' o 'periodo' cambian.
  useEffect(() => {
    if (!tiendaId) return; // No hacer nada si no hay tienda

    const fetchDashboardData = async () => {
      setLoadingPeriodo(true); // Activa spinners de los componentes hijos
      try {
        // 1. Configurar filtros
        const startDate = getStartDate(periodo);
        const storeFilter = `idTienda = '${tiendaId}'`; 
        const dateFilter = startDate
          ? `created >= "${startDate.toISOString().replace("T", " ")}"`
          : "";
        const finalFilter = dateFilter
          ? `${storeFilter} && ${dateFilter}`
          : storeFilter;

        // 2. Hacer peticiones en paralelo (Facturas y Conteo de Productos)
        const [allFacturas, prodRes] = await Promise.all([
          pb.collection("factura").getFullList({ filter: finalFilter }),
          pb.collection("producto").getList(1, 1, {
            filter: `tienda = '${tiendaId}' && (state = 1 || state = 2)`,
          }),
        ]);

        // 3. Procesar Stats (para las tarjetas)
        const totalVentas = allFacturas.reduce(
          (sum, f) => sum + (Number(f.montoTotal) || 0), 0
        );
        const clientesUnicos = new Set(allFacturas.map((f) => f.idUsuario)).size; 
        setStats({
          productos: prodRes.totalItems || 0,
          tiendas: 1, 
          facturas: allFacturas.length,
          totalVentas,
          clientesUnicos,
        });

        // 4. Pasar datos a componentes hijos
        setFacturasData(allFacturas); // Para el gráfico

        // 5. Petición SECUENCIAL: Obtener detalles
        if (allFacturas.length > 0) {
          const facturaIds = allFacturas.map(f => f.id);
          const itemsFilter = facturaIds.map(id => `idFactura = '${id}'`).join(' || ');
          
          const allDetalles = await pb
            .collection("detalleFactura") 
            .getFullList({ filter: itemsFilter, expand: 'idProducto.categoria' });
          
          setDetallesData(allDetalles); // Para los rankings
        } else {
          setDetallesData([]); // No hay facturas, vaciar los detalles
        }

      } catch (error) {
        console.error("Error cargando datos del dashboard:", error);
        // Limpiar datos en caso de error
        setStats({ productos: 0, tiendas: 1, facturas: 0, totalVentas: 0, clientesUnicos: 0 });
        setFacturasData([]);
        setDetallesData([]);
      } finally {
        setLoadingPeriodo(false); // Desactiva spinners de hijos
      }
    };

    fetchDashboardData();
  }, [tiendaId, periodo]); // Dependencia clave

  return (
    <div>
      {/* Encabezado */}
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl pb-3 text-FAST-Text font-bold">Inicio</h2>
        <p className="text-FAST-Text text-xl">
          Aquí puedes ver tus datos generales
        </p>
      </div>

      {/* Filtros */}
      <FiltroPeriodo periodo={periodo} setPeriodo={setPeriodo} />

      {/* Spinner PRINCIPAL (Solo para 'loadingTienda') */}
      {loadingTienda ? (
        <div className="flex justify-center items-center h-64">
          <SpinnerFAST />
        </div>
      ) : !tiendaId ? (
        <p className="text-FAST-Text text-lg">No tienes una tienda asignada.</p>
      ) : (
        <>
          {/* Stats Principales (Tarjetas) */}
          {/* Se muestran siempre, 'loadingPeriodo' no las afecta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard
              titulo="Total Ventas"
              valor={formatCurrency(stats.totalVentas)}
            />
            <StatCard titulo="Facturas" valor={stats.facturas} />
            <StatCard titulo="Clientes Únicos" valor={stats.clientesUnicos} />
            <StatCard titulo="Productos Activos" valor={stats.productos} />
            {/* <StatCard titulo="Tiendas" valor={stats.tiendas} /> */}
          </div>

          {/* Spinner SECUNDARIO (para 'loadingPeriodo') */}
          {/* Oculta los gráficos y rankings mientras se actualizan */}
          {loadingPeriodo ? (
            <div className="flex justify-center items-center h-64">
              <SpinnerFAST />
            </div>
          ) : (
            <>
              {/* Sección de Gráficos */}
              <div className="p-4 bg-white rounded shadow mb-8">
                <GraficoVentas facturas={facturasData} periodo={periodo} />
              </div>

              {/* Sección de Rankings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProductosMasVendidos detalles={detallesData} />
                <CategoriasMasVendidas detalles={detallesData} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Inicio;