
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { categoryOptions, paymentTypes, deliveryLocations, goldCommissionRates, redKreditCommissionRates, deliveryRates } from "@/data/mockData";

const UnitEconomics = () => {
  const [formData, setFormData] = useState({
    cost: 100000,
    sellingPrice: 150000,
    category: "Телефоны",
    weight: 1,
    deliveryLocation: "city",
    paymentType: "gold"
  });

  const [result, setResult] = useState({
    commission: 0,
    commissionPercent: 0,
    delivery: 0,
    profit: 0,
    profitPercent: 0
  });

  const handleInputChange = (field: string, value: number | string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Calculate commission based on category and payment type
  const calculateCommission = () => {
    const { category, paymentType, sellingPrice } = formData;
    let commissionPercent = 0;

    if (paymentType === "gold") {
      commissionPercent = goldCommissionRates[category as keyof typeof goldCommissionRates] || 12;
    } else if (paymentType === "red" || paymentType === "kredit") {
      commissionPercent = redKreditCommissionRates[category as keyof typeof redKreditCommissionRates] || 10;
    } else if (paymentType === "installment12" || paymentType === "installment24") {
      commissionPercent = 15;
    }

    return {
      commissionPercent,
      commissionAmount: (sellingPrice as number) * (commissionPercent / 100)
    };
  };

  // Calculate delivery cost
  const calculateDelivery = () => {
    const { weight, deliveryLocation, sellingPrice } = formData;
    
    // If price is less than 5000, delivery is free
    if ((sellingPrice as number) < 5000) return 0;
    
    const location = deliveryLocation === "city" ? deliveryRates.city : deliveryRates.country;
    
    if (weight <= 5) return location.upto5kg;
    if (weight <= 15) return location["5to15kg"];
    if (weight <= 50) return location["15to50kg"];
    return location.over50kg;
  };

  // Calculate profit
  useEffect(() => {
    const { cost, sellingPrice } = formData;
    const { commissionPercent, commissionAmount } = calculateCommission();
    const deliveryCost = calculateDelivery();
    
    const profit = (sellingPrice as number) - (cost as number) - commissionAmount - deliveryCost;
    const profitPercent = ((profit / (sellingPrice as number)) * 100).toFixed(2);
    
    setResult({
      commission: commissionAmount,
      commissionPercent,
      delivery: deliveryCost,
      profit,
      profitPercent: parseFloat(profitPercent)
    });
  }, [formData]);

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">💰 Юнит-экономика</h1>
          <p className="text-gray-500">Расчет прибыльности с учетом комиссий и доставки Kaspi</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Данные для расчета
                </CardTitle>
                <CardDescription>Введите информацию для расчета прибыли</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cost">Себестоимость товара (₸)</Label>
                      <Input
                        id="cost"
                        type="number"
                        value={formData.cost}
                        onChange={(e) => handleInputChange("cost", parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sellingPrice">Цена продажи на Kaspi (₸)</Label>
                      <Input
                        id="sellingPrice"
                        type="number"
                        value={formData.sellingPrice}
                        onChange={(e) => handleInputChange("sellingPrice", parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория товара</Label>
                      <Select 
                        value={formData.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Вес товара (кг)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deliveryLocation">Доставка</Label>
                      <Select 
                        value={formData.deliveryLocation}
                        onValueChange={(value) => handleInputChange("deliveryLocation", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип доставки" />
                        </SelectTrigger>
                        <SelectContent>
                          {deliveryLocations.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="paymentType">Тип оплаты</Label>
                      <Select 
                        value={formData.paymentType}
                        onValueChange={(value) => handleInputChange("paymentType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип оплаты" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentTypes.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Результат расчета</CardTitle>
                <CardDescription>Юнит-экономика вашего товара</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Себестоимость:</div>
                      <div className="text-sm font-medium text-right">{Number(formData.cost).toLocaleString()} ₸</div>
                      
                      <div className="text-sm text-gray-500">Цена продажи:</div>
                      <div className="text-sm font-medium text-right">{Number(formData.sellingPrice).toLocaleString()} ₸</div>
                      
                      <div className="text-sm text-gray-500">Комиссия Kaspi:</div>
                      <div className="text-sm font-medium text-right">
                        {result.commission.toLocaleString()} ₸ ({result.commissionPercent}%)
                      </div>
                      
                      <div className="text-sm text-gray-500">Стоимость доставки:</div>
                      <div className="text-sm font-medium text-right">{result.delivery.toLocaleString()} ₸</div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-lg font-semibold">Чистая прибыль:</div>
                      <div className="text-lg font-semibold text-right text-green-600">
                        {result.profit.toLocaleString()} ₸
                      </div>
                      
                      <div className="text-sm text-gray-500">Маржа:</div>
                      <div className="text-sm font-medium text-right">{result.profitPercent}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnitEconomics;
