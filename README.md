# Car Catalog

Приложение на **Next.js** для просмотра автомобилей и их детальной информации по карточкам (name, model, year, price). Данные, отображаемые на сайте приходят с [API_task](https://ofc-test-01.tspb.su/test-task/vehicles). 

Интерфейс построен на React, TypeScript, Tailwind-CSS, Shadcn/ui и react-leaflet.

Ознакомиться с сайтом можно по ссылке:
<https://car-catalog-psi.vercel.app/>


## ✨ Функционал приложения
| Экран | Возможности |
|-------|-------------|
| **Главная** `/` | *Серверный рендерингд. Возможность поиска по name, model, year, price (поиск отобразится на карте и выведет нужную машину). Карточки включают в себя краткую информацию об автомобиле, возможность редактирование машины (по полю name, model и price), удаление машины. Карта отображает машины по latitude и longitude. Реализована сортировка по году и прайсу (возрастание, убывание).|
| **404** | Кастомный `not-found.tsx`. |
| **Loading состояния** |  Sceleton загрузки до того, как данные появятся на странице + анимация.|


## 🛠 Стек
 **Next.js** SSR / ISR, Server Components, файловая марщрутизация<br>
 **TypeScript** типизация данных, пришедших с сервера<br>
 **Tailwind CSS** стилизация компонентов<br>
 **Shadcn** готовые компоненты (Card, Button, Skeleton, Input)<br>
 **react-leaflet** react-компоненты для использования карт

## Необходимо:

- **Node.js** - 18 и выше
- **npm**

## Чтобы запустить проект: 

```bash
npm install - # Установка зависимостей

npm run dev - # Запуск режима разработки
```
## Структура проекта

```
src/
├─ api/          # включает типы данных и API функции
├─ app/          # маршруты и страницы приложения
├─ components/   # переиспользуемые React-компоненты
├─ hooks/        # содержит кастомные хуки useSearchCars и useCars  
├─ lib/          # общие утилиты
```
