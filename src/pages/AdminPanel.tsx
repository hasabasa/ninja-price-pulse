
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Демонстрационная проверка (замените на реальную аутентификацию)
    if (email && password) {
      // Сохраняем данные для демонстрации
      localStorage.setItem("kaspi_admin_email", email);
      localStorage.setItem("kaspi_admin_authenticated", "true");
      
      toast.success("Успешный вход!", {
        description: "Вы будете перенаправлены в панель управления.",
      });
      navigate("/kaspi-admin-dashboard");
    } else {
      toast.error("Ошибка входа", {
        description: "Пожалуйста, введите email и пароль.",
      });
    }
    
    setIsLoggingIn(false);
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
            <Lock className="h-6 w-6" />
            Вход в систему
          </CardTitle>
          <CardDescription>
            Введите ваши данные для входа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ваш@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? "Вход..." : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminPanel;
