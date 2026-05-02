# Pizza API

REST API for a pizza ordering system — Express + MongoDB + JWT + Multer + Nodemailer + Swagger.

> 🔗 **Live API:** https://ozguryildiz-pizza-api.vercel.app
> 📘 **Live Swagger UI:** https://ozguryildiz-pizza-api.vercel.app/documents/swagger
> 📕 **Live Redoc:** https://ozguryildiz-pizza-api.vercel.app/documents/redoc
> 🔑 **Demo login:** `demo@demo.com` / `Demo1234!` (admin)

## ✨ Features

- JWT + Token-based authentication
- Email verification (Nodemailer)
- Image upload (Multer)
- Pagination, sorting, search, filtering middleware
- Centralized error handling and request logging
- CRUD: pizzas, toppings, users, orders
- Swagger + Redoc API documentation

## 🧰 Stack

`Node.js` · `Express` · `MongoDB` · `Mongoose` · `JWT` · `Multer` · `Nodemailer` · `Swagger` · `Redoc`

## 🌐 Try It

```bash
# Login
curl -X POST https://ozguryildiz-pizza-api.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@demo.com","password":"Demo1234!"}'

# List pizzas (public)
curl https://ozguryildiz-pizza-api.vercel.app/pizzas

# List toppings
curl https://ozguryildiz-pizza-api.vercel.app/toppings
```

## 🛠 Run Locally

```bash
git clone https://github.com/ozguryildiz54/pizza-api.git
cd pizza-api
npm install
cp .env-sample .env  # add MONGODB connection string + JWT secrets
npm run dev
```

App runs on `http://localhost:8000`.

## 📦 Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/auth/login` | Login |
| POST | `/auth/refresh` | Refresh JWT |
| GET/POST/PUT/DELETE | `/users` | User CRUD (admin) |
| GET/POST/PUT/DELETE | `/pizzas` | Pizza CRUD |
| GET/POST/PUT/DELETE | `/toppings` | Topping CRUD |
| GET/POST/PUT/DELETE | `/orders` | Order CRUD |

Full docs at `/documents/swagger`.

---

Deployed on Vercel. MongoDB hosted on Atlas free tier.
