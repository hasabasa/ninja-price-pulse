
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, TrendingDown, Users } from "lucide-react";
import { mockNicheData } from "@/data/mockData";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const NicheSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockNicheData>([]);
  const [selectedNiche, setSelectedNiche] = useState<(typeof mockNicheData)[0] | null>(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    // Filter mock data based on search term
    const results = mockNicheData.filter(item => 
      item.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(results);
    if (results.length > 0) {
      setSelectedNiche(results[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatNumberWithSpaces = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">📊 Поиск ниш</h1>
          <p className="text-gray-500">Анализ спроса и предложения для поиска перспективных ниш</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Поиск товаров</CardTitle>
            <CardDescription>Введите название товара для анализа рыночной ниши</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Введите название товара..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Button onClick={handleSearch}>Поиск</Button>
            </div>
            
            {searchResults.length > 0 && (
              <div className="mt-4">
                <div className="text-sm text-gray-500">Найдено результатов: {searchResults.length}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedNiche && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{selectedNiche.keyword}</CardTitle>
                <CardDescription>Общий анализ ниши</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-blue-700 mr-2" />
                      <h3 className="text-sm font-medium text-blue-700">Продавцов</h3>
                    </div>
                    <div className="text-2xl font-bold">{selectedNiche.sellers}</div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-700 mr-2" />
                      <h3 className="text-sm font-medium text-green-700">Самая низкая цена</h3>
                    </div>
                    <div className="text-2xl font-bold">{formatNumberWithSpaces(selectedNiche.lowestPrice)} ₸</div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <TrendingDown className="h-5 w-5 text-orange-700 mr-2" />
                      <h3 className="text-sm font-medium text-orange-700">Самая высокая цена</h3>
                    </div>
                    <div className="text-2xl font-bold">{formatNumberWithSpaces(selectedNiche.highestPrice)} ₸</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-purple-700 mr-2" />
                      <h3 className="text-sm font-medium text-purple-700">Объём продаж</h3>
                    </div>
                    <div className="text-2xl font-bold">{formatNumberWithSpaces(selectedNiche.monthlySales)} шт.</div>
                    <div className="text-sm text-purple-700">{formatNumberWithSpaces(selectedNiche.monthlySalesValue / 1000000)} млн ₸</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Анализ тенденций</CardTitle>
                <CardDescription>График спроса и предложения за последние 8 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chart" className="w-full">
                  <TabsList>
                    <TabsTrigger value="chart">График</TabsTrigger>
                    <TabsTrigger value="stats">Статистика</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chart" className="pt-4">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={selectedNiche.demandTrend.map((value, index) => ({
                            month: index,
                            demand: value,
                            supply: selectedNiche.supplyTrend[index]
                          }))}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="month" 
                            tickFormatter={(value) => {
                              const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг'];
                              return months[value] || '';
                            }}
                          />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="demand" 
                            name="Спрос" 
                            stroke="#8884d8" 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="supply" 
                            name="Предложение" 
                            stroke="#82ca9d" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="stats" className="pt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Месяц</th>
                            <th className="text-left py-3 px-4 font-medium">Спрос</th>
                            <th className="text-left py-3 px-4 font-medium">Предложение</th>
                            <th className="text-left py-3 px-4 font-medium">Разница</th>
                          </tr>
                        </thead>
                        <tbody>
                          {['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг'].map((month, index) => (
                            <tr key={month} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">{month}</td>
                              <td className="py-3 px-4">{selectedNiche.demandTrend[index]}</td>
                              <td className="py-3 px-4">{selectedNiche.supplyTrend[index]}</td>
                              <td className="py-3 px-4">
                                {selectedNiche.demandTrend[index] - selectedNiche.supplyTrend[index]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {searchTerm && searchResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8"
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-medium mb-2">Ничего не найдено</h3>
            <p className="text-gray-500">Попробуйте изменить поисковый запрос</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NicheSearch;
