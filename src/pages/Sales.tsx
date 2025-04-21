
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { mockSalesData, mockBestSellers } from "@/data/mockData";
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart as RechartsBarChart, Bar } from "recharts";

const Sales = () => {
  const [dateRange, setDateRange] = useState("week");
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">📈 Мои продажи</h1>
          <p className="text-gray-500">Аналитика продаж с графиками и статистикой по периодам</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Общий доход</CardTitle>
              <div className="text-2xl font-bold">13,850,000 ₸</div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-500 flex items-center">
                +12% с прошлого периода
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Количество заказов</CardTitle>
              <div className="text-2xl font-bold">58</div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-500 flex items-center">
                +8% с прошлого периода
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Средний чек</CardTitle>
              <div className="text-2xl font-bold">238,793 ₸</div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-500 flex items-center">
                +4% с прошлого периода
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Динамика продаж</CardTitle>
              <div className="flex items-center gap-4">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Выберите период" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">По дням</SelectItem>
                    <SelectItem value="week">По неделям</SelectItem>
                    <SelectItem value="month">По месяцам</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  Экспорт
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue" className="w-full">
              <TabsList>
                <TabsTrigger value="revenue" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Доходы
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Заказы
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="revenue" className="pt-4">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={mockSalesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={formatDate} 
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [`${value.toLocaleString()} ₸`, 'Доход']}
                        labelFormatter={(label) => `Дата: ${formatDate(label)}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        name="Доходы" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="pt-4">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={mockSalesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={formatDate} 
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [value, 'Заказы']}
                        labelFormatter={(label) => `Дата: ${formatDate(label)}`}
                      />
                      <Legend />
                      <Bar 
                        dataKey="orders" 
                        name="Заказы" 
                        fill="#8884d8" 
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Топ продаж</CardTitle>
              <Button variant="outline">
                Экспорт
              </Button>
            </div>
            <CardDescription>Самые продаваемые товары за выбранный период</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Товар</th>
                    <th className="text-left py-3 px-4 font-medium">Количество</th>
                    <th className="text-left py-3 px-4 font-medium">Доход</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBestSellers.map((product, index) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{product.sales} шт</td>
                      <td className="py-4 px-4">{product.revenue.toLocaleString()} ₸</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Sales;
