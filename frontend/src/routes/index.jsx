import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import OrdenesListPage from "../pages/OrdenesListPage";
import OrdenDetailPage from "../pages/OrdenDetailPage";
import OrdenFormPage from "../pages/OrdenFormPage";
import ClientesPage from "../pages/ClientesPage";
import MotocicletasPage from "../pages/MotocicletasPage";
import RepuestosListPage from "../pages/RepuestosListPage";
import RepuestoDetailPage from "../pages/RepuestoDetailPage";
import StockPage from "../pages/StockPage";
import CobrosPage from "../pages/CobrosPage";
import ProveedoresPage from "../pages/ProveedoresPage";
import ReportesPage from "../pages/ReportesPage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "ordenes", element: <OrdenesListPage /> },
      { path: "ordenes/nueva", element: <OrdenFormPage /> },
      { path: "ordenes/:id", element: <OrdenDetailPage /> },
      { path: "clientes", element: <ClientesPage /> },
      { path: "motocicletas", element: <MotocicletasPage /> },
      { path: "repuestos", element: <RepuestosListPage /> },
      { path: "repuestos/:id", element: <RepuestoDetailPage /> },
      { path: "stock", element: <StockPage /> },
      { path: "cobros", element: <CobrosPage /> },
      { path: "proveedores", element: <ProveedoresPage /> },
      { path: "reportes", element: <ReportesPage /> },
    ],
  },
]);
