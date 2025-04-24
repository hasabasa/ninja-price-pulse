
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
  const [storeUrl, setStoreUrl] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Validate Kaspi магазин URL
    const isValidKaspiUrl = (url: string) => {
      const kaspiPattern = /kaspi\.kz\/shop\//;
      return kaspiPattern.test(url);
    };

    if (isValidKaspiUrl(storeUrl)) {
      // Сохраняем URL магазина вместо API
      localStorage.setItem("kaspi_store_url", storeUrl);
      localStorage.setItem("kaspi_admin_authenticated", "true");
      
      toast.success("Магазин успешно подключен!", {
        description: "Вы будете перенаправлены в панель управления.",
      });
      navigate("/kaspi-admin-dashboard");
    } else {
      toast.error("Неверная ссылка на магазин", {
        description: "Пожалуйста, введите корректную ссылку Kaspi магазина.",
      });
    }
    
    setIsConnecting(false);
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
            Введите ссылку на ваш магазин на Kaspi.kz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeUrl">Ссылка на магазин</Label>
              <div className="relative">
                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="storeUrl"
                  placeholder="https://kaspi.kz/shop/ваш-магазин"
                  className="pl-10"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isConnecting}>
              {isConnecting ? "Подключение..." : "Подключить магазин"}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground mt-2">
              <p>Найдите ссылку на ваш магазин в</p>
              <p>
                <a 
                  href="https://kaspi.kz/merchantcabinet" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline"
                >
                  Личном кабинете продавца Kaspi
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

