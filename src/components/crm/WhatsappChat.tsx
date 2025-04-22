
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Send, WhatsappIcon } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isOutgoing: boolean;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatContact {
  id: number;
  name: string;
  phone: string;
  lastMessage: string;
  unread: number;
  lastActive: string;
}

const mockChats: ChatContact[] = [
  {
    id: 1,
    name: "Айдар Сериков",
    phone: "+7 (701) 555-1234",
    lastMessage: "Спасибо за информацию",
    unread: 2,
    lastActive: "2025-04-22T10:30:00"
  },
  {
    id: 2,
    name: "Алия Нурланова",
    phone: "+7 (707) 222-4567",
    lastMessage: "Когда будет доставка?",
    unread: 0,
    lastActive: "2025-04-22T11:45:00"
  },
  {
    id: 3,
    name: "Тимур Ахметов",
    phone: "+7 (777) 888-9012",
    lastMessage: "Хорошо, договорились",
    unread: 1,
    lastActive: "2025-04-22T09:20:00"
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    text: "Здравствуйте! Интересует ваш товар",
    isOutgoing: false,
    timestamp: "10:30",
    status: 'read'
  },
  {
    id: 2,
    text: "Добрый день! Какой именно товар вас интересует?",
    isOutgoing: true,
    timestamp: "10:31",
    status: 'read'
  },
  {
    id: 3,
    text: "iPhone 15 Pro, есть в наличии?",
    isOutgoing: false,
    timestamp: "10:32",
    status: 'read'
  },
  {
    id: 4,
    text: "Да, есть в наличии. Какой объем памяти вас интересует?",
    isOutgoing: true,
    timestamp: "10:33",
    status: 'delivered'
  }
];

export const WhatsappChat = () => {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [contacts] = useState<ChatContact[]>(mockChats);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      isOutgoing: true,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-[800px] gap-4">
      {/* Contacts List */}
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Чаты WhatsApp</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[700px] pr-4">
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id 
                      ? 'bg-primary/10' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <WhatsappIcon className="h-6 w-6 text-green-500" />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{contact.name}</span>
                        <span className="text-xs text-gray-500">
                          {formatDate(contact.lastActive)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 truncate">
                          {contact.lastMessage}
                        </span>
                        {contact.unread > 0 && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1">
        <CardHeader className="border-b">
          {selectedContact ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <WhatsappIcon className="h-6 w-6 text-green-500" />
              </Avatar>
              <div>
                <CardTitle>{selectedContact.name}</CardTitle>
                <div className="text-sm text-gray-500">{selectedContact.phone}</div>
              </div>
            </div>
          ) : (
            <CardTitle>Выберите чат</CardTitle>
          )}
        </CardHeader>
        <CardContent className="p-0">
          {selectedContact ? (
            <>
              <ScrollArea className="h-[650px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOutgoing ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.isOutgoing 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-100'
                        }`}
                      >
                        <p>{message.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                          {message.isOutgoing && (
                            <MessageSquare className="h-3 w-3 opacity-70" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-[700px] flex items-center justify-center text-gray-500">
              Выберите чат, чтобы начать общение
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
