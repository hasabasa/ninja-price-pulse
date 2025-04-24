
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockProducts, Product } from "@/data/mockData";
import { Bot, ChevronsUpDown, TrendingDown, UserRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PriceBot = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const { toast } = useToast();
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBotStatus = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, active: !product.active } : product
    ));
  };

  const selectStrategy = (productId: number, strategy: string) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, strategy } : product
    ));
    
    toast({
      title: "Стратегия выбрана",
      description: `Стратегия "${strategy}" успешно выбрана`,
      duration: 3000,
    });
  };

  const updateLimitValue = (productId: number, limitType: string, value: number) => {
    setProducts(products.map(product => 
      product.id === productId ? { 
        ...product, 
        limits: { 
          ...product.limits || {}, 
          [limitType]: Array.isArray(value) ? value[0] : value
        } 
      } : product
    ));
  };

  const saveSettings = (productId: number) => {
    toast({
      title: "Настройки сохранены",
      description: "Настройки бота успешно сохранены",
      duration: 3000,
    });
  };

  const startAllBots = () => {
    setProducts(products.map(product => ({ ...product, active: true })));
    toast({
      title: "Боты запущены",
      description: "Все боты были успешно запущены",
      duration: 3000,
    });
  };

  const stopAllBots = () => {
    setProducts(products.map(product => ({ ...product, active: false })));
    toast({
      title: "Боты остановлены",
      description: "Все боты были успешно остановлены",
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">🔥 Бот демпинга</h1>
          <p className="text-gray-500">Динамическое ценообразование для автоматического мониторинга цен конкурентов</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[300px]">
            <Input 
              placeholder="Поиск товаров по названию или артикулу..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={startAllBots}>
            <Bot className="mr-2 h-4 w-4" />
            Запустить все боты
          </Button>
          <Button variant="outline" onClick={stopAllBots}>
            <Bot className="mr-2 h-4 w-4" />
            Остановить все боты
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-gray-50 pb-8">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="flex-shrink-0 w-24 h-24">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-[300px]">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-lg">{product.name}</h3>
                        <Badge variant={product.active ? "default" : "outline"}>
                          {product.active ? "Активен" : "Неактивен"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Артикул: {product.sku}</p>
                      <div className="flex flex-wrap gap-x-8 gap-y-2 mt-2 text-sm">
                        <div>
                          <span className="text-gray-500">Категория:</span> {product.category}
                        </div>
                        <div>
                          <span className="text-gray-500">Себестоимость:</span> {product.cost.toLocaleString()} ₸
                        </div>
                        <div>
                          <span className="text-gray-500">Текущая цена:</span> {product.sellingPrice.toLocaleString()} ₸
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-auto">
                      <Switch 
                        checked={product.active} 
                        onCheckedChange={() => toggleBotStatus(product.id)}
                        id={`bot-switch-${product.id}`}
                      />
                      <Label htmlFor={`bot-switch-${product.id}`}>
                        {product.active ? "Бот включен" : "Бот выключен"}
                      </Label>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <Tabs defaultValue="competitors" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="competitors">Конкуренты</TabsTrigger>
                      <TabsTrigger value="strategy">Стратегия</TabsTrigger>
                      <TabsTrigger value="settings">Настройки</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="competitors" className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-4 font-medium">Продавец</th>
                              <th className="text-left py-2 px-4 font-medium">Цена</th>
                              <th className="text-left py-2 px-4 font-medium">Рейтинг</th>
                              <th className="text-left py-2 px-4 font-medium">Доставка</th>
                              <th className="text-left py-2 px-4 font-medium">Статус</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.competitors.map(competitor => (
                              <tr key={competitor.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <UserRound className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>{competitor.name}</span>
                                    {competitor.isOfficial && (
                                      <Badge variant="outline" className="ml-2">Официальный</Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4">{competitor.price.toLocaleString()} ₸</td>
                                <td className="py-3 px-4">{competitor.rating} ★</td>
                                <td className="py-3 px-4">{competitor.delivery}</td>
                                <td className="py-3 px-4">
                                  {competitor.price < product.sellingPrice ? (
                                    <Badge variant="destructive" className="flex items-center">
                                      <TrendingDown className="h-3 w-3 mr-1" />
                                      Ниже на {(product.sellingPrice - competitor.price).toLocaleString()} ₸
                                    </Badge>
                                  ) : competitor.price > product.sellingPrice ? (
                                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center">
                                      <ChevronsUpDown className="h-3 w-3 mr-1" />
                                      Выше на {(competitor.price - product.sellingPrice).toLocaleString()} ₸
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="flex items-center">
                                      <ChevronsUpDown className="h-3 w-3 mr-1" />
                                      Равная цена
                                    </Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="strategy">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Выберите стратегию</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card 
                              className={`cursor-pointer ${product.strategy === 'first' ? 'border-primary' : 'border-border'} hover:border-primary/80 transition-all`}
                              onClick={() => selectStrategy(product.id, 'first')}
                            >
                              <CardHeader>
                                <CardTitle className="text-base">🥇 Стань первым</CardTitle>
                                <CardDescription>Цена на 1 тг дешевле, чем у ближайшего конкурента</CardDescription>
                              </CardHeader>
                            </Card>
                            <Card 
                              className={`cursor-pointer ${product.strategy === 'equal' ? 'border-primary' : 'border-border'} hover:border-primary/80 transition-all`}
                              onClick={() => selectStrategy(product.id, 'equal')}
                            >
                              <CardHeader>
                                <CardTitle className="text-base">⚖️ Равная цена</CardTitle>
                                <CardDescription>Держать цену наравне с выбранным конкурентом</CardDescription>
                              </CardHeader>
                            </Card>
                            <Card 
                              className={`cursor-pointer ${product.strategy === 'custom' ? 'border-primary' : 'border-border'} hover:border-primary/80 transition-all`}
                              onClick={() => selectStrategy(product.id, 'custom')}
                            >
                              <CardHeader>
                                <CardTitle className="text-base">💰 Своя стратегия</CardTitle>
                                <CardDescription>Настроить пользовательское правило</CardDescription>
                              </CardHeader>
                            </Card>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Наблюдать за продавцом</h3>
                            <Select defaultValue={product.watchCompetitor?.toString() || product.competitors[0]?.id.toString()}>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите продавца..." />
                              </SelectTrigger>
                              <SelectContent>
                                {product.competitors.map(competitor => (
                                  <SelectItem key={competitor.id} value={competitor.id.toString()}>
                                    {competitor.name} - {competitor.price.toLocaleString()} ₸
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Частота обновления</h3>
                            <Select defaultValue={product.updateFrequency?.toString() || "5"}>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите частоту..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Каждый час</SelectItem>
                                <SelectItem value="2">Каждые 3 часа</SelectItem>
                                <SelectItem value="3">Каждые 6 часов</SelectItem>
                                <SelectItem value="4">Раз в день</SelectItem>
                                <SelectItem value="5">Немедленно при изменении</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="settings">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-medium mb-4">Ограничения</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label>Минимальная цена</Label>
                                    <span className="text-sm text-gray-500">
                                      {(product.limits?.minPrice || product.cost + 10000).toLocaleString()} ₸
                                    </span>
                                  </div>
                                  <Slider 
                                    value={[product.limits?.minPrice || product.cost + 10000]} 
                                    min={product.cost} 
                                    max={product.cost * 2} 
                                    step={1000}
                                    onValueChange={(value) => updateLimitValue(product.id, 'minPrice', value[0])}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label>Минимальная прибыль</Label>
                                    <span className="text-sm text-gray-500">
                                      {(product.limits?.minProfit || 10000).toLocaleString()} ₸
                                    </span>
                                  </div>
                                  <Slider 
                                    value={[product.limits?.minProfit || 10000]} 
                                    min={0} 
                                    max={50000} 
                                    step={1000}
                                    onValueChange={(value) => updateLimitValue(product.id, 'minProfit', value[0])}
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label>Максимальная цена</Label>
                                    <span className="text-sm text-gray-500">
                                      {(product.limits?.maxPrice || product.cost * 1.5).toLocaleString()} ₸
                                    </span>
                                  </div>
                                  <Slider 
                                    value={[product.limits?.maxPrice || product.cost * 1.5]} 
                                    min={product.cost}
                                    max={product.cost * 2} 
                                    step={1000}
                                    onValueChange={(value) => updateLimitValue(product.id, 'maxPrice', value[0])}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label>Шаг изменения</Label>
                                    <span className="text-sm text-gray-500">
                                      {(product.limits?.priceStep || 100).toLocaleString()} ₸
                                    </span>
                                  </div>
                                  <Slider 
                                    value={[product.limits?.priceStep || 100]} 
                                    min={1} 
                                    max={10000} 
                                    step={100}
                                    onValueChange={(value) => updateLimitValue(product.id, 'priceStep', value[0])}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-4 flex justify-end gap-2">
                            <Button variant="outline">Отменить</Button>
                            <Button onClick={() => saveSettings(product.id)}>Сохранить настройки</Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PriceBot;
