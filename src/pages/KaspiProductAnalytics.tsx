
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Search, TrendingUp, Filter, Clock, Users, ArrowUp, ArrowDown, ChartBar, ChartPie } from "lucide-react";
import { mockNicheData } from "@/data/mockData";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Transform the existing data for the new analytics structure
const productAnalyticsData = mockNicheData.map((item, index) => ({
  id: index + 1,
  name: item.keyword,
  category: ["Электроника", "Бытовая техника", "Компьютеры", "Смартфоны", "Аудио"][index % 5],
  price: item.lowestPrice,
  reviews: Math.floor(item.monthlySales / 15), // Assuming 1 review per 15 sales
  sellers: item.sellers,
  estimatedSales: item.monthlySales,
  salesValue: item.monthlySalesValue,
  lastUpdate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  // Additional data for analytics
  trendData: item.demandTrend.map((demand, i) => ({
    date: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sellers: item.supplyTrend[i],
    sales: demand
  }))
}));

// Generate categories summary data
const categorySummary = Array.from(new Set(productAnalyticsData.map(item => item.category)))
  .map(category => {
    const items = productAnalyticsData.filter(item => item.category === category);
    return {
      name: category,
      totalSales: items.reduce((sum, item) => sum + item.estimatedSales, 0),
      averagePrice: Math.round(items.reduce((sum, item) => sum + item.price, 0) / items.length),
      totalProducts: items.length
    };
  })
  .sort((a, b) => b.totalSales - a.totalSales);

const KaspiProductAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [reviewRange, setReviewRange] = useState<[number, number]>([0, 1000]);
  const [sellerRange, setSellerRange] = useState<[number, number]>([0, 50]);
  const [salesRange, setSalesRange] = useState<[number, number]>([0, 10000]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [quickFilter, setQuickFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    return Array.from(new Set(productAnalyticsData.map(item => item.category)));
  }, []);

  // Apply filters and sorting to data
  const filteredData = useMemo(() => {
    let result = productAnalyticsData.filter(item => {
      // Apply text search
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply category filter
      if (selectedCategory && item.category !== selectedCategory) {
        return false;
      }
      
      // Apply review range
      if (item.reviews < reviewRange[0] || item.reviews > reviewRange[1]) {
        return false;
      }
      
      // Apply seller range
      if (item.sellers < sellerRange[0] || item.sellers > sellerRange[1]) {
        return false;
      }
      
      // Apply sales range
      if (item.estimatedSales < salesRange[0] || item.estimatedSales > salesRange[1]) {
        return false;
      }

      // Apply quick filters
      if (quickFilter === "trending") {
        // Simple trending logic: more sales at end than beginning of trendData
        const firstWeekSales = item.trendData.slice(0, 3).reduce((sum, point) => sum + point.sales, 0);
        const lastWeekSales = item.trendData.slice(-3).reduce((sum, point) => sum + point.sales, 0);
        if (lastWeekSales <= firstWeekSales) {
          return false;
        }
      } else if (quickFilter === "lowCompetition") {
        // Low competition: ≤3 sellers and ≥20 reviews
        if (item.sellers > 3 || item.reviews < 20) {
          return false;
        }
      }
      
      return true;
    });

    // Apply sorting
    if (sortConfig !== null) {
      result.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [searchTerm, selectedCategory, reviewRange, sellerRange, salesRange, sortConfig, quickFilter]);

  // Handle sorting when clicking on column headers
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? 
        <ArrowUp className="h-4 w-4" /> : 
        <ArrowDown className="h-4 w-4" />;
    }
    return null;
  };

  // Format numbers with spaces as thousands separator
  const formatNumberWithSpaces = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Last update date
  const lastUpdateDate = useMemo(() => {
    const dates = productAnalyticsData.map(item => new Date(item.lastUpdate));
    return new Date(Math.max(...dates.map(date => date.getTime())))
      .toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  }, []);

  // Get top 10 products by sales
  const topProducts = useMemo(() => {
    return [...productAnalyticsData]
      .sort((a, b) => b.estimatedSales - a.estimatedSales)
      .slice(0, 10);
  }, []);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setReviewRange([0, 1000]);
    setSellerRange([0, 50]);
    setSalesRange([0, 10000]);
    setQuickFilter("");
    setSortConfig(null);
  };

  return (
    <div className="container mx-auto pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">📊 Аналитика товаров Kaspi</h1>
            <p className="text-gray-500">Анализ товаров, продаж и конкуренции на маркетплейсе</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Обновлено: {lastUpdateDate}</span>
          </div>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TabsList>
              <TabsTrigger value="products">Таблица товаров</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuickFilter(quickFilter === "trending" ? "" : "trending")}
                className={quickFilter === "trending" ? "bg-primary/10 text-primary" : ""}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Трендовые товары
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setQuickFilter(quickFilter === "lowCompetition" ? "" : "lowCompetition")}
                className={quickFilter === "lowCompetition" ? "bg-primary/10 text-primary" : ""}
              >
                <Users className="h-4 w-4 mr-2" />
                Слабая конкуренция
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            </div>
          </div>

          {/* Filters section */}
          <motion.div 
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
            className="overflow-hidden"
          >
            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Поиск по названию</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Введите название товара..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Категория</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Все категории</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Количество отзывов</label>
                    <div className="pt-2 px-2">
                      <Slider 
                        defaultValue={[0, 1000]} 
                        max={1000}
                        step={10}
                        value={reviewRange}
                        onValueChange={(value) => setReviewRange(value as [number, number])}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>{reviewRange[0]}</span>
                        <span>{reviewRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Количество продавцов</label>
                    <div className="pt-2 px-2">
                      <Slider 
                        defaultValue={[0, 50]} 
                        max={50}
                        step={1}
                        value={sellerRange}
                        onValueChange={(value) => setSellerRange(value as [number, number])}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>{sellerRange[0]}</span>
                        <span>{sellerRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Примерные продажи</label>
                    <div className="pt-2 px-2">
                      <Slider 
                        defaultValue={[0, 10000]} 
                        max={10000}
                        step={100}
                        value={salesRange}
                        onValueChange={(value) => setSalesRange(value as [number, number])}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>{salesRange[0]}</span>
                        <span>{salesRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Сбросить фильтры
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle>Таблица товаров</CardTitle>
                <CardDescription>
                  Найдено товаров: {filteredData.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[400px] cursor-pointer" onClick={() => requestSort('name')}>
                            <div className="flex items-center gap-2">
                              Название товара
                              {getSortIcon('name')}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => requestSort('category')}>
                            <div className="flex items-center gap-2">
                              Категория
                              {getSortIcon('category')}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => requestSort('price')}>
                            <div className="flex items-center gap-2">
                              Цена
                              {getSortIcon('price')}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => requestSort('reviews')}>
                            <div className="flex items-center gap-2">
                              Отзывы
                              {getSortIcon('reviews')}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => requestSort('sellers')}>
                            <div className="flex items-center gap-2">
                              Продавцы
                              {getSortIcon('sellers')}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => requestSort('estimatedSales')}>
                            <div className="flex items-center gap-2">
                              Продажи (мес.)
                              {getSortIcon('estimatedSales')}
                            </div>
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => requestSort('lastUpdate')}>
                            <div className="flex items-center gap-2">
                              Обновлено
                              {getSortIcon('lastUpdate')}
                            </div>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.length > 0 ? (
                          filteredData.map((product) => (
                            <TableRow key={product.id} className="hover:bg-gray-50">
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>{formatNumberWithSpaces(product.price)} ₸</TableCell>
                              <TableCell>{product.reviews}</TableCell>
                              <TableCell>{product.sellers}</TableCell>
                              <TableCell>{formatNumberWithSpaces(product.estimatedSales)}</TableCell>
                              <TableCell>{product.lastUpdate}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              Нет товаров, соответствующих фильтрам
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top 10 Products Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartBar className="h-5 w-5 text-primary" />
                    Топ-10 товаров по продажам
                  </CardTitle>
                  <CardDescription>Самые продаваемые товары на Kaspi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={topProducts}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          width={150}
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
                        />
                        <Tooltip formatter={(value) => formatNumberWithSpaces(value as number)} />
                        <Legend />
                        <Bar dataKey="estimatedSales" name="Продаж в месяц" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Top Categories Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartPie className="h-5 w-5 text-primary" />
                    Топ категорий по продажам
                  </CardTitle>
                  <CardDescription>Распределение продаж по категориям</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categorySummary}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatNumberWithSpaces(value as number)} />
                        <Legend />
                        <Bar dataKey="totalSales" name="Всего продаж" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Seller Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Динамика количества продавцов</CardTitle>
                <CardDescription>Изменение числа продавцов за последние 7 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={productAnalyticsData[0].trendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sellers"
                        name="Количество продавцов"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        name="Продажи"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Average Prices by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Средняя цена по категориям</CardTitle>
                <CardDescription>Сравнение средних цен в разных категориях</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categorySummary}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatNumberWithSpaces(value as number) + " ₸"} />
                      <Legend />
                      <Bar dataKey="averagePrice" name="Средняя цена" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default KaspiProductAnalytics;
