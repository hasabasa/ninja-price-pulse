
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Store, Link } from "lucide-react";

const AdminPanel = () => {
  const [merchantId, setMerchantId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Simulate API connection request
    setTimeout(() => {
      // In a real application, validate the merchant ID and API key with Kaspi's API
      if (merchantId && apiKey) {
        // Store connection details in localStorage
        localStorage.setItem("kaspi_merchant_id", merchantId);
        localStorage.setItem("kaspi_api_key", apiKey);
        localStorage.setItem("kaspi_admin_authenticated", "true");
        
        toast.success("Магазин успешно подключен!", {
          description: "Вы будете перенаправлены в панель управления.",
        });
        navigate("/kaspi-admin-dashboard");
      } else {
        toast.error("Ошибка подключения", {
          description: "Пожалуйста, проверьте введенные данные.",
        });
      }
      setIsConnecting(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container max-w-md mx-auto px-4 py-8"
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Store className="h-6 w-6" />
            Подключить Kaspi магазин
          </CardTitle>
          <CardDescription>
            Введите данные вашего магазина на Kaspi.kz для подключения к системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merchantId">ID Продавца</Label>
              <div className="relative">
                <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="merchantId"
                  placeholder="Введите ID продавца"
                  className="pl-10"
                  value={merchantId}
                  onChange={(e) => setMerchantId(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Ключ</Label>
              <div className="relative">
                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Введите API ключ"
                  className="pl-10"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isConnecting}>
              {isConnecting ? "Подключение..." : "Подключить магазин"}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground mt-2">
              <p>Для получения данных перейдите в</p>
              <p>
                <a 
                  href="https://kaspi.kz/merchantcabinet" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  Личный кабинет продавца Kaspi
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminPanel;
