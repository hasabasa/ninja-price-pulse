
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
} from "@/components/ui/sidebar";
import { Bot, BarChart, Calculator, ListChecks, Search, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    title: "Поиск ниш",
    path: "/niche-search",
    icon: Search,
  }
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>KaspiNinja</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={location.pathname === item.path}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
