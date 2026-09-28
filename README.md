# GREEN-API MAX Chat

Тестовый одностраничный чат-клиент для обмена текстовыми сообщениями в MAX через GREEN-API. Приложение поддерживает один активный чат и хранит состояние только во время текущей сессии.

## Возможности

- подключение по `idInstance` и `apiTokenInstance`;
- проверка номера MAX через `CheckAccount` и создание одного активного чата;
- отправка текстовых сообщений через `SendMessage`;
- получение текстовых сообщений через последовательный long polling `ReceiveNotification`;
- удаление обработанных уведомлений через `DeleteNotification`;
- отправка по Enter и перенос строки по Shift+Enter;
- интерфейс, визуально вдохновлённый web.max.ru.

## Стек

React 19, TypeScript, Vite, Zustand, styled-components, React Hook Form, Zod, Axios, Vitest, React Testing Library, GREEN-API для MAX.

## Запуск

Установить зависимости:

```bash
npm install
```

Создать `.env` на основе `.env.example`:

```env
VITE_GREEN_API_URL=https://api.green-api.com/v3
```

Запустить приложение:

```bash
npm run dev
```

`idInstance` и `apiTokenInstance` не нужно добавлять в `.env`: пользователь вводит их через интерфейс, после чего они хранятся только в runtime state приложения.

## Настройка GREEN-API

1. Создать MAX instance в GREEN-API.
2. Авторизовать instance.
3. Включить получение уведомлений о входящих сообщениях и файлах.
4. Оставить пустым webhook URL для используемого HTTP API.

## Как пользоваться

1. Ввести `idInstance` и `apiTokenInstance`.
2. Нажать «Продолжить».
3. Нажать кнопку «+» в sidebar.
4. Ввести номер пользователя MAX.
5. Нажать «Создать чат».
6. Отправлять текстовые сообщения.
7. Ответы из MAX будут автоматически появляться в интерфейсе.

## Архитектура

Структура проекта вдохновлена feature-oriented/FSD-подходом:

- `entities/session/model/sessionStore.ts` — credentials GREEN-API;
- `entities/chat/model/chatStore.ts` — текущий `activeChat`;
- `entities/message/model/messageStore.ts` — сообщения текущего чата;
- `shared/api/greenApi` — HTTP-клиент и типы GREEN-API;
- `features/createChat` — проверка номера и создание чата;
- `features/sendMessage` — отправка текстовых сообщений;
- `features/receiveMessages` — получение и обработка входящих сообщений;
- `pages` — композиция экранов подключения и чата.

## Long polling

`ReceiveNotification` выполняется последовательно: следующий запрос начинается только после завершения предыдущего. `receiveTimeout` установлен в 60 секунд. Активный запрос отменяется через `AbortController` при cleanup, а после обработки полученного уведомления вызывается `DeleteNotification`.

## Тесты

```bash
npm run test:run
npm run build
npm run lint
```

Тестами покрыты schemas, создание чата, последовательная отправка сообщений, Enter/Shift+Enter, обработка входящих сообщений и cleanup polling.

## Ограничения

- поддерживаются только текстовые сообщения;
- поддерживается один активный чат;
- история сообщений не сохраняется после перезагрузки страницы.
