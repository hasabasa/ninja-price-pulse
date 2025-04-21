
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { 
  LineChart, 
  BarChart, 
  Calculator, 
  ListChecks, 
  Search, 
  Bot, 
  Home, 
  ChevronLeft, 
  ChevronRight, 
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    path: "/",
    name: "Главная",
    icon: <Home className="h-5 w-5" />
  },
  {
    path: "/price-bot",
    name: "Бот демпинга",
    icon: <Bot className="h-5 w-5" />
  },
  {
    path: "/sales",
    name: "Мои продажи",
    icon: <BarChart className="h-5 w-5" />
  },
  {
    path: "/unit-economics",
    name: "Юнит-экономика",
    icon: <Calculator className="h-5 w-5" />
  },
  {
    path: "/crm",
    name: "CRM и напоминания",
    icon: <ListChecks className="h-5 w-5" />
  },
  {
    path: "/niche-search",
    name: "Поиск ниш",
    icon: <Search className="h-5 w-5" />
  }
];

interface SidebarProps {
  isMobile?: boolean;
}

const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile sidebar when route changes
    setMobileOpen(false);
  }, [location.pathname]);

  // Function to determine if a nav item is active
  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarWidth = collapsed ? 'w-16' : 'w-64';
  const mobileSidebarClass = mobileOpen ? 'translate-x-0' : '-translate-x-full';

  const renderNavItems = () => (
    <ul className="space-y-2 mt-6">
      {menuItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={cn(
              "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
              isActive(item.path)
                ? "bg-primary/10 text-primary font-medium"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3"
              >
                {item.name}
              </motion.span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          className="fixed top-4 left-4 z-40"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <motion.div
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r p-4 shadow-lg transform transition-transform duration-300 ease-in-out",
            mobileSidebarClass
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">KaspiNinja</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          {renderNavItems()}
        </motion.div>
      </>
    );
  }

  return (
    <motion.div
      className={cn(
        "flex-shrink-0 h-screen bg-white border-r p-4 transition-all duration-300 ease-in-out",
        sidebarWidth
      )}
      layout
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center"
          >
            <span className="text-xl font-bold text-primary">KaspiNinja</span>
          </motion.div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <AnimatePresence mode="wait">
        {renderNavItems()}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
