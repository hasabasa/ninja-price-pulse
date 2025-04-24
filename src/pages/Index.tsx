import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Calculator, LineChart, ListChecks, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  {
    title: "Бот демпинга",
    description: "Динамическое ценообразование для мониторинга конкурентов и автоматического изменения цен",
    icon: <Bot className="h-12 w-12 text-primary" />,
    path: "/price-bot",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "Мои продажи",
    description: "Аналитика продаж с графиками и статистикой по периодам",
    icon: <LineChart className="h-12 w-12 text-primary" />,
    path: "/sales",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Юнит-экономика",
    description: "Расчет прибыльности с учетом комиссий и доставки Kaspi",
    icon: <Calculator className="h-12 w-12 text-primary" />,
    path: "/unit-economics",
    color: "from-orange-500/20 to-yellow-500/20"
  },
  {
    title: "CRM и напоминания",
    description: "Система задач и авто-звонков клиентам",
    icon: <ListChecks className="h-12 w-12 text-primary" />,
    path: "/crm",
    color: "from-red-500/20 to-pink-500/20"
  },
  {
    title: "Аналитика товаров Kaspi",
    description: "Анализ спроса и предложения для поиска перспективных ниш",
    icon: <ChartBar className="h-12 w-12 text-primary" />,
    path: "/kaspi-analytics",
    color: "from-indigo-500/20 to-blue-500/20"
  }
];

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Добро пожаловать в Kaspi Price Ninja
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Платформа для умного управления вашими продажами на Kaspi.kz
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={module.path} className="block h-full">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color} mb-4 inline-block`}>
                    {module.icon}
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">Открыть</Button>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Index;
