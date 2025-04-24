
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle, Package, ShoppingCart, BarChart2, Settings, Upload, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Имитация данных товаров Kaspi
const mockProducts = [
  { id: 1, name: "Смартфон iPhone 13", price: 389990, stock: 15, category: "Электроника" },
  { id: 2, name: "Ноутбук ASUS TUF Gaming", price: 429990, stock: 8, category: "Компьютеры" },
  { id: 3, name: "Наушники Sony WH-1000XM4", price: 159990, stock: 22, category: "Аудио" },
  { id: 4, name: "Телевизор Samsung QLED", price: 599990, stock: 5, category: "ТВ и видео" }
];

// Имитация данных заказов Kaspi
const mockOrders = [
  { id: "K-12345", date: "2025-04-20", customer: "Алексей Смирнов", items: 3, total: 599990, status: "В обработке" },
  { id: "K-12346", date: "2025-04-19", customer: "Елена Иванова", items: 1, total: 389990, status: "Отправлен" },
  { id: "K-12347", date: "2025-04-18", customer: "Максим Петров", items: 2, total: 589980, status: "Доставлен" },
];

const KaspiAdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка авторизации
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

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Имитация задержки API
    setTimeout(() => {
      const newProduct = {
        id: products.length + 1,
        name: newProductName,
        price: parseInt(newProductPrice),
        stock: 10,
        category: "Новая категория"
      };
      
      setProducts([...products, newProduct]);
      setNewProductName("");
      setNewProductPrice("");
      setIsLoading(false);
      
      toast.success("Товар добавлен", {
        description: `${newProduct.name} успешно добавлен в ваш Каспи магазин.`,
      });
    }, 1000);
  };

  const handleSyncWithKaspi = () => {
    toast.info("Синхронизация с Каспи", {
      description: "Начата синхронизация данных с Каспи магазином...",
    });

    // Имитация процесса синхронизации
    setTimeout(() => {
      toast.success("Синхронизация завершена", {
        description: "Данные успешно синхронизированы с Каспи магазином.",
      });
    }, 2000);
  };

  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));
    
    toast.success("Статус заказа обновлен", {
      description: `Заказ ${orderId} теперь имеет статус "${newStatus}"`,
    });
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
        <AlertTitle>Интеграция с Каспи</AlertTitle>
        <AlertDescription>
          Все модули сайта интегрированы с платформой Каспи для автоматической синхронизации данных.
        </AlertDescription>
      </Alert>

      <Button onClick={handleSyncWithKaspi} className="mb-6 flex gap-2">
        <Upload className="h-4 w-4" />
        <span>Синхронизировать с Каспи</span>
      </Button>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="dashboard">Обзор</TabsTrigger>
          <TabsTrigger value="products">Товары</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  <span>Управление товарами</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Всего товаров: <strong>{products.length}</strong>
                </p>
                <Button 
                  className="w-full"
                  onClick={() => setActiveTab("products")}
                >
                  Управление товарами
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Заказы</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Новых заказов: <strong>{orders.filter(o => o.status === "В обработке").length}</strong>
                </p>
                <Button 
                  className="w-full"
                  onClick={() => setActiveTab("orders")}
                >
                  Просмотр заказов
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  <span>Аналитика продаж</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Общая сумма продаж: <strong>{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()} ₸</strong>
                </p>
                <Button 
                  className="w-full"
                >
                  Открыть аналитику
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Управление товарами Каспи магазина</CardTitle>
              <CardDescription>Добавляйте, редактируйте и управляйте товарами вашего магазина на Каспи</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Input 
                    placeholder="Название товара" 
                    value={newProductName}
                    onChange={e => setNewProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input 
                    placeholder="Цена (тенге)" 
                    type="number"
                    value={newProductPrice}
                    onChange={e => setNewProductPrice(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Добавление..." : "Добавить товар"}
                </Button>
              </form>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium border-b">
                  <div>ID</div>
                  <div className="col-span-2">Название</div>
                  <div>Цена (₸)</div>
                  <div>Наличие</div>
                </div>
                {products.map(product => (
                  <div key={product.id} className="grid grid-cols-5 p-4 border-b hover:bg-muted/50">
                    <div>{product.id}</div>
                    <div className="col-span-2">{product.name}</div>
                    <div>{product.price.toLocaleString()}</div>
                    <div>{product.stock}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handleSyncWithKaspi}>
                  <Upload className="mr-2 h-4 w-4" />
                  Выгрузить в Каспи
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Импорт из Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Заказы из Каспи магазина</CardTitle>
              <CardDescription>Управляйте заказами, полученными через платформу Каспи</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 font-medium border-b">
                  <div>ID заказа</div>
                  <div>Дата</div>
                  <div>Клиент</div>
                  <div>Сумма (₸)</div>
                  <div>Статус</div>
                  <div>Действия</div>
                </div>
                {orders.map(order => (
                  <div key={order.id} className="grid grid-cols-6 p-4 border-b hover:bg-muted/50">
                    <div>{order.id}</div>
                    <div>{order.date}</div>
                    <div>{order.customer}</div>
                    <div>{order.total.toLocaleString()}</div>
                    <div>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Доставлен" ? "bg-green-100 text-green-800" : 
                          order.status === "Отправлен" ? "bg-blue-100 text-blue-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div>
                      <select 
                        className="text-xs rounded border px-2 py-1"
                        value={order.status}
                        onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                      >
                        <option>В обработке</option>
                        <option>Отправлен</option>
                        <option>Доставлен</option>
                        <option>Отменен</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default KaspiAdminDashboard;
