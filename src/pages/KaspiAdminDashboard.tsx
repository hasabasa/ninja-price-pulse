
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const KaspiAdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("kaspi_admin_authenticated");
    if (authStatus !== "true") {
      toast.error("Доступ запрещен", {
        description: "Пожалуйста, войдите в систему.",
      });
      navigate("/admin");
      return;
    }
    
    setIsAuthenticated(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("kaspi_admin_authenticated");
    toast.success("Вы вышли из системы", {
      description: "Перенаправление на страницу входа.",
    });
    navigate("/admin");
  };

  if (!isAuthenticated) {
    return <div>Проверка авторизации...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Панель управления Каспи магазина</h1>
        <Button variant="outline" onClick={handleLogout}>Выйти</Button>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Обратите внимание!</AlertTitle>
        <AlertDescription>
          Это демо-версия административной панели Каспи магазина. Здесь будут доступны
          инструменты управления товарами, заказами и аналитикой.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Управление товарами</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Добавляйте, редактируйте и удаляйте товары из вашего Каспи магазина.
            </p>
            <Button className="w-full">Управление товарами</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Просматривайте и управляйте заказами с Каспи магазина.
            </p>
            <Button className="w-full">Просмотр заказов</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Аналитика продаж</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Подробная статистика и аналитика по продажам вашего магазина.
            </p>
            <Button className="w-full">Открыть аналитику</Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default KaspiAdminDashboard;
