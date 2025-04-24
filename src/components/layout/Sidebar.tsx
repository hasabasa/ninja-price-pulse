import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
    
    // Show toast for current section
    const currentItem = menuItems.find(item => item.path === path);
    if (currentItem) {
      toast({
        title: `Переход в раздел: ${currentItem.name}`,
        description: "Загрузка данных...",
        duration: 2000,
      });
    }
  };

  const sidebarWidth = collapsed ? 'w-16' : 'w-64';
  const mobileSidebarClass = mobileOpen ? 'translate-x-0' : '-translate-x-full';

  const renderNavItems = () => (
    <ul className="space-y-2 mt-6">
      {menuItems.map((item) => (
        <li key={item.path}>
          <Button
            variant={isActive(item.path) ? "secondary" : "ghost"}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              "w-full flex items-center justify-start px-4 py-3 text-sm rounded-lg transition-colors gap-3", // Updated to ensure left alignment
              isActive(item.path)
                ? "bg-primary/10 text-primary font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            {React.cloneElement(item.icon, { 
              className: "h-5 w-5 flex-shrink-0" // Ensure consistent icon size and prevent shrinking
            })}
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2" // Added small margin between icon and text
              >
                {item.name}
              </motion.span>
            )}
          </Button>
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
          initial={{ x: "-100%" }}
          animate={{ x: mobileOpen ? 0 : "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r p-4 shadow-lg"
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
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20"
            onClick={toggleMobileSidebar}
            aria-hidden="true"
          />
        )}
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
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="transition-transform">
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
