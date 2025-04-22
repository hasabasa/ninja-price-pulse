
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTasks } from "@/data/mockData";
import { Check, Phone, MessageSquare, Filter, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const CRM = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState({
    type: "call",
    customer: "",
    phone: "",
    task: "",
    deadline: new Date().toISOString().slice(0, 16)
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "overdue": return "bg-red-100 text-red-800 hover:bg-red-200";
      default: return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Выполнено";
      case "pending": return "В ожидании";
      case "overdue": return "Просрочено";
      default: return status;
    }
  };

  const filteredAndSearchedTasks = tasks.filter(task => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = searchTerm === "" || 
      task.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.phone.includes(searchTerm) ||
      task.task.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateTask = () => {
    if (!newTask.customer || !newTask.phone || !newTask.task) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    const task = {
      id: tasks.length + 1,
      type: newTask.type,
      customer: newTask.customer,
      phone: newTask.phone,
      task: newTask.task,
      status: "pending",
      deadline: newTask.deadline,
      createdAt: new Date().toISOString()
    };

    setTasks([task, ...tasks]);
    setNewTask({
      type: "call",
      customer: "",
      phone: "",
      task: "",
      deadline: new Date().toISOString().slice(0, 16)
    });

    toast({
      title: "Задача создана",
      description: "Новая задача успешно добавлена",
    });
  };

  const handleCompleteTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: "completed", completedAt: new Date().toISOString() } 
        : task
    ));
    
    toast({
      title: "Задача выполнена",
      description: "Статус задачи изменен на 'Выполнено'",
    });
  };

  const handleCall = (phone: string) => {
    toast({
      title: "Звонок инициирован",
      description: `Вызов на номер ${phone}`,
    });
  };

  const handleMessage = (phone: string) => {
    toast({
      title: "Сообщение",
      description: `Отправка сообщения на номер ${phone}`,
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
          <h1 className="text-3xl font-bold">✅ CRM и напоминания</h1>
          <p className="text-gray-500">Система задач и авто-звонков клиентам</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Новая задача
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Создать новую задачу</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о новой задаче и нажмите "Создать"
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="taskType" className="text-right">
                      Тип
                    </Label>
                    <Select 
                      value={newTask.type}
                      onValueChange={(value) => setNewTask({...newTask, type: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Выберите тип задачи" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Звонок</SelectItem>
                        <SelectItem value="message">Сообщение</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer" className="text-right">
                      Клиент
                    </Label>
                    <Input
                      id="customer"
                      value={newTask.customer}
                      onChange={(e) => setNewTask({...newTask, customer: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Телефон
                    </Label>
                    <Input
                      id="phone"
                      value={newTask.phone}
                      onChange={(e) => setNewTask({...newTask, phone: e.target.value})}
                      placeholder="+7 (XXX) XXX-XX-XX"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task" className="text-right">
                      Задача
                    </Label>
                    <Input
                      id="task"
                      value={newTask.task}
                      onChange={(e) => setNewTask({...newTask, task: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deadline" className="text-right">
                      Срок
                    </Label>
                    <Input
                      id="deadline"
                      type="datetime-local"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateTask}>Создать задачу</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Фильтр
            </Button>
          </div>
          <div className="w-full md:w-auto">
            <Input 
              placeholder="Поиск по задаче или клиенту..." 
              className="w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList>
            <TabsTrigger value="tasks">Задачи</TabsTrigger>
            <TabsTrigger value="timeline">Таймлайн</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Все задачи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{tasks.length}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">В ожидании</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-700">
                    {tasks.filter(task => task.status === 'pending').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Просрочено</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-700">
                    {tasks.filter(task => task.status === 'overdue').length}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Список задач</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                  >
                    Все
                  </Button>
                  <Button 
                    variant={filter === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("pending")}
                  >
                    В ожидании
                  </Button>
                  <Button 
                    variant={filter === "overdue" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("overdue")}
                  >
                    Просрочено
                  </Button>
                  <Button 
                    variant={filter === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("completed")}
                  >
                    Выполнено
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAndSearchedTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex flex-wrap justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getStatusColor(task.status)}>
                              {getStatusText(task.status)}
                            </Badge>
                            <Badge variant="outline">
                              {task.type === 'call' ? 'Звонок' : 'Сообщение'}
                            </Badge>
                          </div>
                          <h3 className="font-medium">{task.task}</h3>
                          <div className="text-sm text-gray-500">
                            <div>{task.customer} • {task.phone}</div>
                            <div>
                              {task.status === 'completed' 
                                ? `Выполнено: ${new Date(task.completedAt || '').toLocaleString('ru-RU')}` 
                                : `Срок: ${new Date(task.deadline).toLocaleString('ru-RU')}`
                              }
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          {task.status !== 'completed' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleCompleteTask(task.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Выполнено
                              </Button>
                              {task.type === 'call' ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleCall(task.phone)}
                                >
                                  <Phone className="h-4 w-4 mr-1" />
                                  Позвонить
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleMessage(task.phone)}
                                >
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Написать
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredAndSearchedTasks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Задач с выбранным фильтром не найдено
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Временная шкала</CardTitle>
                <CardDescription>История всех задач и событий</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-8 border-l border-gray-200 space-y-8">
                  {tasks.sort((a, b) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                  ).map((task, index) => (
                    <div key={task.id} className="relative">
                      <div className="absolute -left-10 flex items-center justify-center w-6 h-6 rounded-full border border-white bg-blue-100">
                        {task.type === 'call' ? 
                          <Phone className="h-3 w-3 text-blue-700" /> : 
                          <MessageSquare className="h-3 w-3 text-blue-700" />
                        }
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="mb-2"
                      >
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {getStatusText(task.status)}
                        </Badge>
                        <h4 className="font-medium mt-1">{task.task}</h4>
                        <p className="text-sm text-gray-500">{task.customer} • {task.phone}</p>
                        <time className="text-xs text-gray-400">
                          {new Date(task.createdAt).toLocaleString('ru-RU')}
                        </time>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default CRM;
