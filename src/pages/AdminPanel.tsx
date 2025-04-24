
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Store, Upload, Link } from "lucide-react";

const AdminPanel = () => {
  const [storeUrl, setStoreUrl] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.js')) {
      setSelectedFile(file);
      toast.success("Скрипт успешно выбран");
    } else {
      toast.error("Пожалуйста, выберите JavaScript файл (.js)");
    }
  };

  const handleUploadScript = async () => {
    if (!selectedFile) {
      toast.error("Пожалуйста, выберите файл скрипта");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        // Сохраняем скрипт в localStorage для демонстрации
        localStorage.setItem('parser_script', content);
        toast.success("Парсер успешно загружен!", {
          description: "Теперь вы можете использовать его для анализа магазина.",
        });
      };
      reader.readAsText(selectedFile);
    } catch (error) {
      toast.error("Ошибка при загрузке скрипта");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container max-w-md mx-auto px-4 py-8 space-y-6"
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
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Upload className="h-6 w-6" />
            Загрузить парсер
          </CardTitle>
          <CardDescription>
            Загрузите ваш скрипт парсера для анализа магазина
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="script">Файл скрипта (.js)</Label>
              <Input
                id="script"
                type="file"
                accept=".js"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            
            <Button 
              onClick={handleUploadScript}
              className="w-full"
              disabled={!selectedFile}
            >
              Загрузить скрипт
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminPanel;
