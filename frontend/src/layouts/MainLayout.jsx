import { useState, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Typography, Divider, useMediaQuery, useTheme,
  AppBar, Toolbar, Breadcrumbs, Link, Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import PaymentsIcon from "@mui/icons-material/Payments";
import BusinessIcon from "@mui/icons-material/Business";
import BarChartIcon from "@mui/icons-material/BarChart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { useThemeMode } from "../context/ThemeContext";

const DRAWER_WIDTH = 260;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { label: "Órdenes", icon: <BuildIcon />, path: "/ordenes" },
  { label: "Clientes", icon: <PeopleIcon />, path: "/clientes" },
  { label: "Motocicletas", icon: <TwoWheelerIcon />, path: "/motocicletas" },
  { label: "Repuestos", icon: <InventoryIcon />, path: "/repuestos" },
  { label: "Stock", icon: <WarehouseIcon />, path: "/stock" },
  { label: "Cobros", icon: <PaymentsIcon />, path: "/cobros" },
  { label: "Proveedores", icon: <BusinessIcon />, path: "/proveedores" },
  { label: "Reportes", icon: <BarChartIcon />, path: "/reportes" },
];

const breadcrumbMap = {
  "/": "Dashboard",
  "/ordenes": "Órdenes de Trabajo",
  "/clientes": "Clientes",
  "/motocicletas": "Motocicletas",
  "/repuestos": "Repuestos",
  "/stock": "Gestión de Stock",
  "/cobros": "Cobros",
  "/proveedores": "Proveedores",
  "/reportes": "Reportes",
};

function SidebarContent({ onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();

  const handleNav = (path) => {
    navigate(path);
    onNavigate?.();
  };

  const isSelected = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 2,
          cursor: "pointer",
        }}
        onClick={() => handleNav("/")}
      >
        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, fontSize: 16, fontWeight: 700 }}>
          MF
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.5px" }}>
          MotoFix
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, px: 1.5, py: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={isSelected(item.path)}
            onClick={() => handleNav(item.path)}
            sx={{ borderRadius: 2, mb: 0.3, px: 1.5 }}
          >
            <ListItemIcon sx={{ minWidth: 38, color: isSelected(item.path) ? "primary.main" : undefined }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: isSelected(item.path) ? 600 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List sx={{ px: 1.5, py: 1 }}>
        <ListItemButton onClick={toggleTheme} sx={{ borderRadius: 2, mb: 0.3 }}>
          <ListItemIcon sx={{ minWidth: 38 }}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText primary={mode === "dark" ? "Modo Claro" : "Modo Oscuro"} />
        </ListItemButton>
        <ListItemButton onClick={logout} sx={{ borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 38 }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const breadcrumbs = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const list = [{ label: "Inicio", path: "/" }];
    let acc = "";
    for (const p of parts) {
      acc += `/${p}`;
      const label = breadcrumbMap[acc];
      if (label) list.push({ label, path: acc });
      else list.push({ label: p, path: acc });
    }
    return list;
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {isMd ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
          }}
        >
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH, boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {isMd && (
          <AppBar position="sticky" elevation={1} sx={{ bgcolor: "background.paper", color: "text.primary" }}>
            <Toolbar sx={{ minHeight: { xs: 56 } }}>
              <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, flexGrow: 1, cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                MotoFix
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ px: { xs: 1.5, sm: 2, md: 3 }, pt: { xs: 1.5, sm: 2 } }}>
          {!isMd && (
            <Breadcrumbs sx={{ mb: 2 }}>
              {breadcrumbs.map((crumb, idx) =>
                idx < breadcrumbs.length - 1 ? (
                  <Link
                    key={crumb.path}
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: "pointer", fontSize: 13 }}
                    onClick={() => navigate(crumb.path)}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <Typography key={crumb.path} color="text.primary" sx={{ fontSize: 13 }}>
                    {crumb.label}
                  </Typography>
                )
              )}
            </Breadcrumbs>
          )}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 1.5, sm: 2, md: 3 },
            pb: { xs: 2, md: 3 },
            maxWidth: 1400,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
