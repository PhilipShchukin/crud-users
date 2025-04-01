# 📌 CRUD Users

CRUD-приложение на **NestJS (Backend) + Next.js (Frontend)** с использованием **PostgreSQL, Prisma**. 🚀

---

## 🔥 Функционал
- 👥 Управление пользователями (создание, редактирование, удаление)
- 📄 REST API для работы с пользователями
- 🛠 Использование Prisma ORM
- 🗄 Подключение к PostgreSQL

---

## 🚀  Запуск 
#### 📌 Backend (NestJS)
```zsh
cd backend
npm install
npx prisma db push  # Запуск prisma
npm run start:dev
```

#### 📌 Frontend (Next.js)
```zsh
cd frontend
npm install
npm run dev
```
- Backend  - на `http://localhost:4200`
- Frontend – на `http://localhost:3000`

```

#### 📌 Настройка переменных окружения
Создайте файл `.env` в корне проекта и добавьте:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
PORT=3000
```
> Замените `user`, `password` и `dbname` на свои значения.

#### 📌 Запуск базы данных (если используется Docker)
```bash
docker-compose up -d
```


---

## 📂 Структура проекта
```
crud-users/
│── backend/      # Сервер на NestJS
│── frontend/     # Клиент на Next.js
│── README.md     # Документация
```

---

## 📊 API эндпоинты
| Метод  | URL            | Описание               |
|--------|--------------|------------------------|
| GET    | `/users`     | Получить всех пользователей |
| GET    | `/users/:id` | Получить пользователя по ID |
| POST   | `/users`     | Создать пользователя |
| PATCH  | `/users/:id` | Обновить данные пользователя |
| DELETE | `/users/:id` | Удалить пользователя |



## 🛠 Используемый стек
- **Backend:** NestJS, Prisma.
- **Frontend:** Next.js 14, TypeScript, Tailwind.
- **Хранение:** PostgreSQL.

---
