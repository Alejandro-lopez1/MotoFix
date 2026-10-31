import { useState, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Typography, Divider, useMediaQuery, useTheme,
  AppBar, Toolbar, Breadcrumbs, Link, Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
import { designTokens } from "../theme";

const DRAWER_WIDTH = 280;

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: designTokens.colors.gray[900],
        borderRight: `1px solid ${designTokens.colors.gray[600]}`,
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: designTokens.spacing.md,
          px: designTokens.spacing.lg,
          py: designTokens.spacing.lg,
          cursor: "pointer",
          transition: `all ${designTokens.transitions.normal}`,
          "&:hover": {
            backgroundColor: designTokens.colors.background.elevated,
          },
        }}
        onClick={() => handleNav("/")}
      >
        <Avatar
          sx={{
            bgcolor: designTokens.colors.primary.main,
            color: designTokens.colors.gray[900],
            width: 40,
            height: 40,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          MF
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.5px",
              color: designTokens.colors.primary.main,
            }}
          >
            MotoFix
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: designTokens.colors.text.secondary,
              fontSize: "10px",
            }}
          >
            Workshop Manager
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: designTokens.colors.gray[600] }} />

      {/* Navigation Items */}
      <List
        sx={{
          flexGrow: 1,
          px: designTokens.spacing.md,
          py: designTokens.spacing.md,
          gap: 0,
        }}
      >
        {navItems.map((item) => {
          const selected = isSelected(item.path);
          return (
            <ListItemButton
              key={item.path}
              selected={selected}
              onClick={() => handleNav(item.path)}
              sx={{
                borderRadius: designTokens.borderRadius.sm,
                mb: designTokens.spacing.sm,
                px: designTokens.spacing.md,
                py: "10px",
                color: selected
                  ? designTokens.colors.primary.main
                  : designTokens.colors.text.secondary,
                backgroundColor: selected
                  ? designTokens.colors.background.elevated
                  : "transparent",
                borderLeft: selected
                  ? `3px solid ${designTokens.colors.primary.main}`
                  : "3px solid transparent",
                paddingLeft: selected
                  ? `calc(${designTokens.spacing.md} - 3px)`
                  : designTokens.spacing.md,
                transition: `all ${designTokens.transitions.normal}`,
                "&:hover": {
                  backgroundColor: designTokens.colors.background.elevated,
                  color: designTokens.colors.primary.main,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: selected
                    ? designTokens.colors.primary.main
                    : designTokens.colors.text.secondary,
                  transition: `color ${designTokens.transitions.normal}`,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: designTokens.typography.sizes.body,
                  fontWeight: selected ? 600 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: designTokens.colors.gray[600] }} />

      {/* Footer Actions */}
      <List sx={{ px: designTokens.spacing.md, py: designTokens.spacing.md }}>
        <ListItemButton
          onClick={toggleTheme}
          sx={{
            borderRadius: designTokens.borderRadius.sm,
            mb: designTokens.spacing.sm,
            color: designTokens.colors.text.secondary,
            transition: `all ${designTokens.transitions.normal}`,
            "&:hover": {
              backgroundColor: designTokens.colors.background.elevated,
              color: designTokens.colors.primary.main,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText
            primary={mode === "dark" ? "Modo Claro" : "Modo Oscuro"}
            primaryTypographyProps={{ fontSize: designTokens.typography.sizes.body }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: designTokens.borderRadius.sm,
            color: designTokens.colors.text.secondary,
            transition: `all ${designTokens.transitions.normal}`,
            "&:hover": {
              backgroundColor: designTokens.colors.background.elevated,
              color: designTokens.colors.error.main,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cerrar Sesión"
            primaryTypographyProps={{ fontSize: designTokens.typography.sizes.body }}
          />
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
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: designTokens.colors.background.default }}>
      {/* Mobile Drawer */}
      {isMd ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      ) : (
        /* Desktop Sidebar */
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              backgroundColor: designTokens.colors.gray[900],
              borderRight: `1px solid ${designTokens.colors.gray[600]}`,
              position: "sticky",
              top: 0,
              height: "100vh",
              overflowY: "auto",
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Mobile AppBar */}
        {isMd && (
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              backgroundColor: designTokens.colors.background.paper,
              borderBottom: `1px solid ${designTokens.colors.gray[600]}`,
              color: designTokens.colors.text.primary,
              zIndex: 100,
            }}
          >
            <Toolbar sx={{ minHeight: 60, px: designTokens.spacing.lg }}>
              <IconButton
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{
                  mr: designTokens.spacing.md,
                  color: designTokens.colors.primary.main,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  flexGrow: 1,
                  cursor: "pointer",
                  color: designTokens.colors.primary.main,
                }}
                onClick={() => navigate("/")}
              >
                MotoFix
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        {/* Desktop Breadcrumb */}
        {!isMd && (
          <Box
            sx={{
              px: designTokens.spacing["2xl"],
              pt: designTokens.spacing.xl,
              pb: designTokens.spacing.lg,
              borderBottom: `1px solid ${designTokens.colors.gray[700]}`,
              backgroundColor: designTokens.colors.background.default,
              sticky: 0,
              zIndex: 50,
            }}
          >
            <Breadcrumbs
              sx={{
                "& .MuiBreadcrumbs-separator": {
                  color: designTokens.colors.text.secondary,
                },
              }}
            >
              {breadcrumbs.map((crumb, idx) =>
                idx < breadcrumbs.length - 1 ? (
                  <Link
                    key={crumb.path}
                    underline="hover"
                    color="inherit"
                    sx={{
                      cursor: "pointer",
                      fontSize: designTokens.typography.sizes.bodySmall,
                      color: designTokens.colors.primary.main,
                      transition: `color ${designTokens.transitions.normal}`,
                      "&:hover": {
                        color: designTokens.colors.primary.light,
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => navigate(crumb.path)}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <Typography
                    key={crumb.path}
                    color="text.primary"
                    sx={{
                      fontSize: designTokens.typography.sizes.bodySmall,
                      fontWeight: 500,
                    }}
                  >
                    {crumb.label}
                  </Typography>
                )
              )}
            </Breadcrumbs>
          </Box>
        )}

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: designTokens.spacing.lg, sm: designTokens.spacing.xl, md: designTokens.spacing["2xl"] },
            py: designTokens.spacing.xl,
            maxWidth: "1600px",
            width: "100%",
            mx: "auto",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
