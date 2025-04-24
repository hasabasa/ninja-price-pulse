
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, User } from "lucide-react";

const AdminPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a login request
    setTimeout(() => {
      // Simple login validation (for demo purposes)
      // In a real application, use a secure authentication system
      if (username === "admin" && password === "password") {
        toast.success("Авторизация успешна!", {
          description: "Добро пожаловать в админ-панель Каспи магазина.",
        });
        // Store authentication state in localStorage
        localStorage.setItem("kaspi_admin_authenticated", "true");
        navigate("/kaspi-admin-dashboard");
      } else {
        toast.error("Ошибка авторизации", {
          description: "Неверное имя пользователя или пароль.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container max-w-md mx-auto px-4 py-8"
    >
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Вход в админ-панель</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="admin"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Авторизация..." : "Войти"}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground mt-2">
              <p>Для демо-входа используйте:</p>
              <p>Логин: <strong>admin</strong> / Пароль: <strong>password</strong></p>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminPanel;
