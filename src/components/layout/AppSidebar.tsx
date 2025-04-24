
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Menu, Bot, BarChart, Calculator, ListChecks, ChartBar, Home, PanelLeft, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Главная",
    path: "/",
    icon: Home,
  },
  {
    title: "Бот демпинга",
    path: "/price-bot",
    icon: Bot,
  },
  {
    title: "Мои продажи",
    path: "/sales",
    icon: BarChart,
  },
  {
    title: "Юнит-экономика",
    path: "/unit-economics",
    icon: Calculator,
  },
  {
    title: "CRM и напоминания",
    path: "/crm",
    icon: ListChecks,
  },
  {
    title: "Аналитика товаров Kaspi",
    path: "/kaspi-analytics",
    icon: ChartBar,
  },
  {
    title: "Вход для администратора",
    path: "/admin",
    icon: Lock,
  }
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggleSidebar } = useSidebar();

  const handleNavigation = (path: string) => {
    navigate(path);
    const currentItem = menuItems.find(item => item.path === path);
    if (currentItem) {
      toast({
        title: `Переход в раздел: ${currentItem.title}`,
        description: "Загрузка данных...",
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Sidebar variant="floating" collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between px-4 py-4">
              <SidebarGroupLabel className="text-base font-semibold">KaspiNinja</SidebarGroupLabel>
              <SidebarTrigger className="ml-auto">
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
            </div>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={location.pathname === item.path}
                      onClick={() => handleNavigation(item.path)}
                      className="w-full justify-start gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:bg-sidebar-accent/20 group-data-[collapsible=icon]:rounded-md group-data-[collapsible=icon]:p-2"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      
      {/* Desktop sidebar toggle button */}
      <Button
        onClick={toggleSidebar}
        variant="ghost"
        size="icon"
        className="fixed left-4 bottom-4 hidden md:flex p-2 bg-primary/10 text-primary rounded-full shadow-lg hover:bg-primary/20 transition-colors"
      >
        <PanelLeft className="h-5 w-5" />
      </Button>

      {/* Mobile sidebar toggle button */}
      <Button
        onClick={toggleSidebar}
        className="fixed left-4 bottom-4 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
