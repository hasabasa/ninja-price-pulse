
// Mock data for Kaspi Price Ninja platform

// Mock products data for Price Bot
export const mockProducts = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max 256GB",
    sku: "AP-IP15PM-256-BLK",
    cost: 450000,
    sellingPrice: 699990,
    category: "Телефоны",
    weight: 0.5,
    image: "https://resources.cdn-kaspi.kz/img/m/p/h14/h50/84378448199710.jpg?format=gallery-medium",
    active: true,
    competitors: [
      {
        id: 101,
        name: "TechnoGalaxy",
        price: 709990,
        rating: 4.8,
        delivery: "Сегодня",
        isOfficial: true
      },
      {
        id: 102,
        name: "KaspiMart",
        price: 699990,
        rating: 4.9,
        delivery: "Завтра",
        isOfficial: true
      },
      {
        id: 103,
        name: "MobileWorld",
        price: 719990,
        rating: 4.7,
        delivery: "2-3 дня",
        isOfficial: false
      }
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra 512GB",
    sku: "SM-S23U-512-GRN",
    cost: 420000,
    sellingPrice: 629990,
    category: "Телефоны",
    weight: 0.6,
    image: "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84390173007902.jpg?format=gallery-medium",
    active: true,
    competitors: [
      {
        id: 201,
        name: "SamsungOfficial",
        price: 639990,
        rating: 5.0,
        delivery: "Сегодня",
        isOfficial: true
      },
      {
        id: 202,
        name: "TechMarket",
        price: 635990,
        rating: 4.6,
        delivery: "Завтра",
        isOfficial: false
      },
      {
        id: 203,
        name: "GadgetPro",
        price: 629990,
        rating: 4.5,
        delivery: "2-3 дня",
        isOfficial: false
      }
    ]
  },
  {
    id: 3,
    name: "Apple MacBook Pro 14 M3 Pro",
    sku: "MB-PRO-14-M3P",
    cost: 850000,
    sellingPrice: 1199990,
    category: "Компьютеры",
    weight: 1.8,
    image: "https://resources.cdn-kaspi.kz/img/m/p/hbf/h98/84577188716574.jpg?format=gallery-medium",
    active: false,
    competitors: [
      {
        id: 301,
        name: "iStudio",
        price: 1249990,
        rating: 4.9,
        delivery: "Сегодня",
        isOfficial: true
      },
      {
        id: 302,
        name: "AppleWorld",
        price: 1229990,
        rating: 4.8,
        delivery: "1-2 дня",
        isOfficial: true
      },
      {
        id: 303,
        name: "TechnoMart",
        price: 1199990,
        rating: 4.7,
        delivery: "2-3 дня",
        isOfficial: false
      }
    ]
  }
];

// Mock sales data for Sales Analytics
export const mockSalesData = [
  {
    date: "2023-04-01",
    sales: 1250000,
    orders: 5
  },
  {
    date: "2023-04-02",
    sales: 1750000,
    orders: 7
  },
  {
    date: "2023-04-03",
    sales: 2100000,
    orders: 9
  },
  {
    date: "2023-04-04",
    sales: 1900000,
    orders: 8
  },
  {
    date: "2023-04-05",
    sales: 2300000,
    orders: 10
  },
  {
    date: "2023-04-06",
    sales: 2000000,
    orders: 8
  },
  {
    date: "2023-04-07",
    sales: 2500000,
    orders: 11
  }
];

// Mock best selling products
export const mockBestSellers = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max 256GB",
    sales: 15,
    revenue: 10499850,
    image: "https://resources.cdn-kaspi.kz/img/m/p/h14/h50/84378448199710.jpg?format=gallery-medium"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra 512GB",
    sales: 12,
    revenue: 7559880,
    image: "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84390173007902.jpg?format=gallery-medium"
  },
  {
    id: 3,
    name: "Apple MacBook Pro 14 M3 Pro",
    sales: 7,
    revenue: 8399930,
    image: "https://resources.cdn-kaspi.kz/img/m/p/hbf/h98/84577188716574.jpg?format=gallery-medium"
  }
];

// Mock commission rates for Gold
export const goldCommissionRates = {
  "Автотовары": 12,
  "Аксессуары": 15,
  "Аптека": 10,
  "Бытовая техника": 12,
  "Детские товары": 12,
  "Книги/Досуг": 12,
  "Канцелярия": 12,
  "Компьютеры": 12,
  "Красота и здоровье": 12,
  "Мебель": 12,
  "Обувь": 12,
  "Одежда": 12,
  "Продукты": 7,
  "ТВ, Аудио, Видео": 15,
  "Телефоны": 15,
  "Дом и дача": 12,
  "Животные": 10,
  "Украшения": 15
};

// Mock commission rates for Red/Kredit
export const redKreditCommissionRates = {
  "Автотовары": 7,
  "Аксессуары": 10,
  "Аптека": 5,
  "Косметика": 10,
  "Мебель": 7,
  "Продукты": 5,
  "Ремонт": 7,
  "Спорт": 10,
  "Дом": 10,
  "Электроника": 7,
  "Одежда/Обувь": 10,
  "Украшения": 10,
  "Прочее": 12.5
};

// Mock delivery rates
export const deliveryRates = {
  city: {
    "upto5kg": 799,
    "5to15kg": 999,
    "15to50kg": 2299,
    "over50kg": 3999,
    "carTires": 699,
    "truckTires": 3999
  },
  country: {
    "upto5kg": 1299,
    "5to15kg": 1699,
    "15to50kg": 3599,
    "over50kg": 6499,
    "carTires": 799,
    "truckTires": 5699
  }
};

// Mock CRM Tasks
export const mockTasks = [
  {
    id: 1,
    type: "call",
    customer: "Алексей Петров",
    phone: "+7 (777) 123-45-67",
    task: "Позвонить после доставки iPhone 15",
    status: "pending",
    deadline: "2023-04-22T14:00:00",
    createdAt: "2023-04-20T10:15:00"
  },
  {
    id: 2,
    type: "message",
    customer: "Мария Иванова",
    phone: "+7 (707) 987-65-43",
    task: "Напомнить о брошенной корзине (MacBook Pro)",
    status: "completed",
    deadline: "2023-04-21T16:30:00",
    completedAt: "2023-04-21T15:45:00",
    createdAt: "2023-04-21T09:20:00"
  },
  {
    id: 3,
    type: "call",
    customer: "Дмитрий Сидоров",
    phone: "+7 (747) 555-11-22",
    task: "Предложить чехол к Samsung Galaxy S23",
    status: "overdue",
    deadline: "2023-04-19T11:00:00",
    createdAt: "2023-04-18T14:30:00"
  },
  {
    id: 4,
    type: "message",
    customer: "Анна Козлова",
    phone: "+7 (701) 333-22-11",
    task: "Запросить отзыв о доставке MacBook",
    status: "pending",
    deadline: "2023-04-23T13:00:00",
    createdAt: "2023-04-21T17:10:00"
  }
];

// Mock Niche Search Data
export const mockNicheData = [
  {
    keyword: "iPhone 15 Pro",
    sellers: 42,
    lowestPrice: 599990,
    highestPrice: 799990,
    monthlySales: 320,
    monthlySalesValue: 224000000,
    demandTrend: [65, 70, 75, 90, 95, 100, 90, 85],
    supplyTrend: [60, 65, 75, 80, 85, 90, 95, 100]
  },
  {
    keyword: "Samsung S23",
    sellers: 38,
    lowestPrice: 499990,
    highestPrice: 649990,
    monthlySales: 280,
    monthlySalesValue: 156800000,
    demandTrend: [70, 75, 80, 85, 90, 95, 90, 85],
    supplyTrend: [65, 70, 75, 80, 90, 95, 100, 95]
  },
  {
    keyword: "AirPods Pro 2",
    sellers: 55,
    lowestPrice: 129990,
    highestPrice: 179990,
    monthlySales: 410,
    monthlySalesValue: 61500000,
    demandTrend: [75, 80, 90, 95, 100, 95, 90, 85],
    supplyTrend: [60, 70, 80, 90, 100, 95, 90, 85]
  },
  {
    keyword: "MacBook Pro M3",
    sellers: 29,
    lowestPrice: 999990,
    highestPrice: 1599990,
    monthlySales: 120,
    monthlySalesValue: 155990000,
    demandTrend: [60, 70, 80, 90, 100, 95, 90, 85],
    supplyTrend: [50, 60, 70, 80, 90, 95, 100, 90]
  }
];

// Export all category options
export const categoryOptions = [
  { value: "Автотовары", label: "Автотовары" },
  { value: "Аксессуары", label: "Аксессуары" },
  { value: "Аптека", label: "Аптека" },
  { value: "Бытовая техника", label: "Бытовая техника" },
  { value: "Детские товары", label: "Детские товары" },
  { value: "Книги/Досуг", label: "Книги/Досуг" },
  { value: "Канцелярия", label: "Канцелярия" },
  { value: "Компьютеры", label: "Компьютеры" },
  { value: "Красота и здоровье", label: "Красота и здоровье" },
  { value: "Мебель", label: "Мебель" },
  { value: "Обувь", label: "Обувь" },
  { value: "Одежда", label: "Одежда" },
  { value: "Продукты", label: "Продукты" },
  { value: "ТВ, Аудио, Видео", label: "ТВ, Аудио, Видео" },
  { value: "Телефоны", label: "Телефоны" },
  { value: "Дом и дача", label: "Дом и дача" },
  { value: "Животные", label: "Животные" },
  { value: "Украшения", label: "Украшения" },
  { value: "Косметика", label: "Косметика" },
  { value: "Ремонт", label: "Ремонт" },
  { value: "Спорт", label: "Спорт" },
  { value: "Электроника", label: "Электроника" },
  { value: "Прочее", label: "Прочее" }
];

// Payment types
export const paymentTypes = [
  { value: "gold", label: "Gold (обычная оплата)" },
  { value: "red", label: "Kaspi Red" },
  { value: "kredit", label: "Kaspi Kredit" },
  { value: "installment12", label: "Рассрочка 0-0-12" },
  { value: "installment24", label: "Рассрочка 0-0-24" }
];

// Delivery locations
export const deliveryLocations = [
  { value: "city", label: "По городу" },
  { value: "country", label: "По Казахстану" }
];
