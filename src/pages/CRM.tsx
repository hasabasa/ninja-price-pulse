import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTasks } from "@/data/mockData";
import { 
  Check, 
  Phone, 
  MessageSquare, 
  Filter, 
  Plus, 
  History, 
  Mail, 
  LinkIcon as Link,
  Clock,
  Calendar
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { WhatsappChat } from "@/components/crm/WhatsappChat";

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
  const [activeTab, setActiveTab] = useState("tasks");
  const [integrationTab, setIntegrationTab] = useState("crm");
  const { toast } = useToast();
  
  // CRM Integration state
  const [crmSettings, setCrmSettings] = useState({
    crmType: "bitrix24",
    webhookUrl: "",
    responsibleUser: "",
  });
  
  // VoIP settings state
  const [voipSettings, setVoipSettings] = useState({
    provider: "asterisk",
    sipAccount: "",
    username: "",
    password: "",
    server: "",
    callAfterOrder: true,
    workHoursOnly: true,
    workHoursStart: "09:00",
    workHoursEnd: "18:00",
    retryCount: 2
  });
  
  // Call history
  const [callHistory] = useState([
    { id: 1, customer: "Айдар Сериков", phone: "+7 (701) 555-1234", date: "2025-04-21T10:30:00", duration: "1:24", status: "completed" },
    { id: 2, customer: "Алия Нурланова", phone: "+7 (707) 222-4567", date: "2025-04-21T11:45:00", duration: "0:45", status: "completed" },
    { id: 3, customer: "Тимур Ахметов", phone: "+7 (777) 888-9012", date: "2025-04-21T13:20:00", duration: "0:00", status: "missed" },
    { id: 4, customer: "Галия Бекетова", phone: "+7 (702) 333-5678", date: "2025-04-20T15:10:00", duration: "2:12", status: "completed" },
    { id: 5, customer: "Арман Сатыбалдиев", phone: "+7 (705) 777-3456", date: "2025-04-20T16:30:00", duration: "0:00", status: "no-answer" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "overdue": return "bg-red-100 text-red-800 hover:bg-red-200";
      case "missed": return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "no-answer": return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      default: return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Выполнено";
      case "pending": return "В ожидании";
      case "overdue": return "Просрочено";
      case "missed": return "Пропущен";
      case "no-answer": return "Нет ответа";
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
  
  const handleSaveCrmSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: `Интеграция с ${getCrmName(crmSettings.crmType)} настроена успешно`,
    });
  };
  
  const handleSaveVoipSettings = () => {
    toast({
      title: "Настройки VoIP сохранены",
      description: `Настройки ${voipSettings.provider} сохранены успешно`,
    });
  };
  
  const handleExportCallHistory = () => {
    toast({
      title: "Экспорт запущен",
      description: "История звонков экспортируется в CSV файл",
    });
  };
  
  const getCrmName = (crmType: string) => {
    switch (crmType) {
      case "bitrix24": return "Bitrix24";
      case "amocrm": return "amoCRM";
      case "pipedrive": return "Pipedrive";
      default: return crmType;
    }
  };
  
  const getCallStatusBadge = (status: string) => {
    switch (status) {
      case "completed": 
        return <Badge variant="outline" className="bg-green-100 text-green-800">Завершен</Badge>;
      case "missed": 
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Пропущен</Badge>;
      case "no-answer": 
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">Нет ответа</Badge>;
      default: 
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="tasks">Задачи</TabsTrigger>
            <TabsTrigger value="timeline">Таймлайн</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="integration">Интеграция</TabsTrigger>
            <TabsTrigger value="calls">История звонков</TabsTrigger>
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
          
          <TabsContent value="whatsapp">
            <WhatsappChat />
          </TabsContent>
          
          
          <TabsContent value="integration">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Интеграция с CRM-системами и автоматические звонки</CardTitle>
                  <CardDescription>
                    Настройка интеграции с внешними CRM-системами и параметры автозвонков
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={integrationTab} onValueChange={setIntegrationTab} className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="crm">CRM-системы</TabsTrigger>
                      <TabsTrigger value="voip">Автоматические звонки</TabsTrigger>
                    </TabsList>
                    
                    
                    <TabsContent value="crm">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Выберите CRM-систему</Label>
                          <RadioGroup 
                            value={crmSettings.crmType}
                            onValueChange={(value) => setCrmSettings({...crmSettings, crmType: value})}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="bitrix24" id="bitrix24" />
                              <Label htmlFor="bitrix24" className="flex items-center">
                                <span className="inline-block w-6 h-6 mr-2 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">B24</span>
                                Bitrix24
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="amocrm" id="amocrm" />
                              <Label htmlFor="amocrm" className="flex items-center">
                                <span className="inline-block w-6 h-6 mr-2 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">amo</span>
                                amoCRM
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pipedrive" id="pipedrive" />
                              <Label htmlFor="pipedrive" className="flex items-center">
                                <span className="inline-block w-6 h-6 mr-2 bg-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">PD</span>
                                Pipedrive
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="webhookUrl">Webhook URL</Label>
                            <Input 
                              id="webhookUrl" 
                              placeholder="https://your-crm.com/api/webhook"
                              value={crmSettings.webhookUrl}
                              onChange={(e) => setCrmSettings({...crmSettings, webhookUrl: e.target.value})}
                            />
                            <p className="text-sm text-gray-500">URL вебхука для отправки данных в CRM-систему</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="responsible">Ответственный сотрудник</Label>
                            <Input 
                              id="responsible" 
                              placeholder="ID или email ответственного"
                              value={crmSettings.responsibleUser}
                              onChange={(e) => setCrmSettings({...crmSettings, responsibleUser: e.target.value})}
                            />
                            <p className="text-sm text-gray-500">ID или email сотрудника в CRM-системе</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button onClick={handleSaveCrmSettings}>
                            Сохранить настройки CRM
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    
                    <TabsContent value="voip">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Выберите VoIP-провайдера</Label>
                          <RadioGroup 
                            value={voipSettings.provider}
                            onValueChange={(value) => setVoipSettings({...voipSettings, provider: value})}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="asterisk" id="asterisk" />
                              <Label htmlFor="asterisk">Asterisk</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="freepbx" id="freepbx" />
                              <Label htmlFor="freepbx">FreePBX</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3cx" id="3cx" />
                              <Label htmlFor="3cx">3CX</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="sipAccount">SIP-аккаунт</Label>
                              <Input 
                                id="sipAccount" 
                                placeholder="sip:username@domain.com"
                                value={voipSettings.sipAccount}
                                onChange={(e) => setVoipSettings({...voipSettings, sipAccount: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="sipServer">SIP-сервер</Label>
                              <Input 
                                id="sipServer" 
                                placeholder="sip.example.com"
                                value={voipSettings.server}
                                onChange={(e) => setVoipSettings({...voipSettings, server: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="sipUsername">Имя пользователя</Label>
                              <Input 
                                id="sipUsername" 
                                placeholder="username"
                                value={voipSettings.username}
                                onChange={(e) => setVoipSettings({...voipSettings, username: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="sipPassword">Пароль</Label>
                              <Input 
                                id="sipPassword" 
                                type="password"
                                placeholder="••••••••"
                                value={voipSettings.password}
                                onChange={(e) => setVoipSettings({...voipSettings, password: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium mb-4">Параметры звонков</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="callAfterOrder" className="font-medium">Звонить сразу после заказа</Label>
                                <p className="text-sm text-gray-500">Автоматический звонок клиенту после создания заказа</p>
                              </div>
                              <Switch 
                                id="callAfterOrder"
                                checked={voipSettings.callAfterOrder}
                                onCheckedChange={(checked) => setVoipSettings({...voipSettings, callAfterOrder: checked})}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="workHoursOnly" className="font-medium">Звонки только в рабочее время</Label>
                                <p className="text-sm text-gray-500">Звонки будут совершаться только в указанное рабочее время</p>
                              </div>
                              <Switch 
                                id="workHoursOnly"
                                checked={voipSettings.workHoursOnly}
                                onCheckedChange={(checked) => setVoipSettings({...voipSettings, workHoursOnly: checked})}
                              />
                            </div>
                            
                            {voipSettings.workHoursOnly && (
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="workHoursStart">Начало рабочего времени</Label>
                                  <Input 
                                    id="workHoursStart" 
                                    type="time"
                                    value={voipSettings.workHoursStart}
                                    onChange={(e) => setVoipSettings({...voipSettings, workHoursStart: e.target.value})}
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="workHoursEnd">Конец рабочего времени</Label>
                                  <Input 
                                    id="workHoursEnd" 
                                    type="time"
                                    value={voipSettings.workHoursEnd}
                                    onChange={(e) => setVoipSettings({...voipSettings, workHoursEnd: e.target.value})}
                                  />
                                </div>
                              </div>
                            )}
                            
                            <div className="space-y-2">
                              <Label htmlFor="retryCount">Количество повторных попыток</Label>
                              <Select 
                                value={voipSettings.retryCount.toString()} 
                                onValueChange={(value) => setVoipSettings({...voipSettings, retryCount: parseInt(value, 10)})}
                              >
                                <SelectTrigger id="retryCount">
                                  <SelectValue placeholder="Выберите количество" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">Без повторов</SelectItem>
                                  <SelectItem value="1">1 повтор</SelectItem>
                                  <SelectItem value="2">2 повтора</SelectItem>
                                  <SelectItem value="3">3 повтора</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-sm text-gray-500">Сколько раз повторять звонок, если нет ответа</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button onClick={handleSaveVoipSettings}>
                            Сохранить настройки звонков
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          
          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>История звонков</span>
                  <Button variant="outline" size="sm" onClick={handleExportCallHistory}>
                    <History className="h-4 w-4 mr-2" />
                    Экспортировать
                  </Button>
                </CardTitle>
                <CardDescription>История всех автоматических и ручных звонков</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="h-12 px-4 text-left font-medium text-gray-500">Клиент</th>
                          <th className="h-12 px-4 text-left font-medium text-gray-500">Телефон</th>
                          <th className="h-12 px-4 text-left font-medium text-gray-500">Дата и время</th>
                          <th className="h-12 px-4 text-left font-medium text-gray-500">Длительность</th>
                          <th className="h-12 px-4 text-left font-medium text-gray-500">Статус</th>
                        </tr>
                      </thead>
                      <tbody>
                        {callHistory.map((call) => (
                          <tr key={call.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{call.customer}</td>
                            <td className="p-4">{call.phone}</td>
                            <td className="p-4">{formatDateTime(call.date)}</td>
                            <td className="p-4">{call
