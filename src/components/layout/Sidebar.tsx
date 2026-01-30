import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  AlertTriangle,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Calculator,
  BarChart3,
  Shield,
  Building2,
  Receipt,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: Upload, label: "Upload & Analyze", href: "/upload" },
  { icon: TrendingUp, label: "Cash Flow", href: "/cash-flow" },
  { icon: PieChart, label: "Expenses", href: "/expenses" },
  { icon: BarChart3, label: "Forecasting", href: "/forecasting" },
  { icon: AlertTriangle, label: "Risk Alerts", href: "/risks", badge: "3" },
];

const financeNavItems: NavItem[] = [
  { icon: Receipt, label: "Compliance", href: "/compliance" },
  { icon: Building2, label: "Benchmarking", href: "/benchmarking" },
  { icon: Calculator, label: "Bookkeeping", href: "/bookkeeping" },
  { icon: Wallet, label: "Products", href: "/products" },
];

const systemNavItems: NavItem[] = [
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Shield, label: "Security", href: "/security" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        to={item.href}
        className={cn(
          "nav-item group relative",
          isActive && "active"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="whitespace-nowrap overflow-hidden"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>
        {item.badge && !collapsed && (
          <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
        {item.badge && collapsed && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
        )}
      </Link>
    );
  };

  const NavSection = ({ title, items }: { title: string; items: NavItem[] }) => (
    <div className="space-y-1">
      <AnimatePresence>
        {!collapsed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider"
          >
            {title}
          </motion.p>
        )}
      </AnimatePresence>
      {items.map((item) => (
        <NavLink key={item.href} item={item} />
      ))}
    </div>
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center glow-primary">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <h1 className="text-lg font-bold gradient-text whitespace-nowrap">
                  FinanceAI
                </h1>
                <p className="text-xs text-sidebar-foreground/50 whitespace-nowrap">
                  SME Health Platform
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        <NavSection title="Dashboard" items={mainNavItems} />
        <NavSection title="Finance" items={financeNavItems} />
        <NavSection title="System" items={systemNavItems} />
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
