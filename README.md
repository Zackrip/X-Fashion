# X-Fashion 🛍️

**Next-Gen Fashion E-Commerce Platform with Reel-Based Shopping Experience**

X-Fashion is a fully-featured e-commerce platform for clothing that redefines online shopping by integrating an **Instagram/TikTok-style reel section** with direct “Add to Cart” functionality. Users can scroll through dynamic product reels, see real-world usage of garments, and instantly purchase without leaving the video feed — addressing the modern shopper’s need for visual, immersive product discovery.

---

## 🌟 Key Features

### For Shoppers
- **Reel-Based Product Discovery**  
  - Scroll through short-form video reels showcasing real-life product usage  
  - **One-tap Add to Cart** directly from the reel interface  
  - No need to read lengthy product descriptions — see the product in action
- **Full E-Commerce Functionality**
  - Browse categories, search products, view details
  - Shopping cart, wishlist, checkout, and order tracking
  - User profiles with order history
- **Secure Authentication**
  - Email/password login & registration
  - Protected user routes and sessions

### For Sellers
- **Seller Onboarding Workflow**
  - Users fill out a seller application form with required details
  - **Admin approval required** before a user can list products
  - Seller dashboard to manage inventory, orders, and analytics
- **Product Management**
  - Add, edit, and delete products
  - Upload product images and **reel videos**
  - Set pricing, stock, and categories

### For Admins
- **Admin Portal**
  - Approve/reject seller applications
  - Manage users, sellers, and products
  - View platform-wide analytics and reports
  - Content moderation for reels and listings
- **Robust Access Control**
  - Role-based authentication (User, Seller, Admin)
  - Protected admin routes and API endpoints

---

### Frontend
| Tech | Purpose |
|---|---|
| React + Vite | UI Framework |
| React Router v6 | Routing |
| Redux Toolkit | Cart state management |
| Axios | API calls |
| Tailwind CSS | Styling |
| Sonner | Toast notifications |
| Lucide + React Icons | Icons |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | Server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Multer | File upload handling |
| ImageKit | Image & video storage |
| bcryptjs | Password hashing |

---

**Full Stack:** MERN (MongoDB, Express.js, React.js, Node.js)

---

## 📁 Project Structure

```
Testingg/
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── product.controller.js
│       │   └── order.controller.js
│       ├── models/
│       │   ├── user.models.js
│       │   ├── product.model.js
│       │   └── order.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── product.routes.js
│       │   └── order.routes.js
│       ├── middleware/
│       │   └── auth.middleware.js
│       ├── services/
│       │   └── storage.service.js
│       └── app.js
│
└── frontend/
    └── vite-project/
        └── src/
            ├── components/
            │   ├── Common/         # Navbar, Footer, SearchBar, etc.
            │   ├── Cart/           # CartContents
            │   └── Layout/         # UserLayout, AdminLayout
            ├── pages/
            │   ├── User/           # Home, Cart, Checkout, Reels, Profile, Orders
            │   ├── Seller/         # SellerDashboard, AddProduct
            │   ├── Admin/          # AdminHomePage, UsersPage, ProductsPage
            │   └── auth/           # Login, Register
            ├── Store/              # Redux slices (cart)
            └── routes/             # AppRoutes.jsx
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- ImageKit account

### 1. Clone the repo
```bash
git clone https://github.com/Zackrip/x-fashions.git
cd x-fashions
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `backend/`:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/xfashions
JWT_SECRET=your_jwt_secret_key

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/yourid
```

```bash
npx nodemon server.js
```

### 3. Frontend Setup
```bash
cd frontend/vite-project
npm install
```

Create `.env` file in `frontend/vite-project/`:
```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/logout` | Auth |
| GET | `/api/auth/me` | Auth |
| PATCH | `/api/auth/become-seller` | Auth |
| GET | `/api/auth/pending-sellers` | Admin |
| PATCH | `/api/auth/approve-seller/:id` | Admin |
| PATCH | `/api/auth/reject-seller/:id` | Admin |
| GET | `/api/auth/all-users` | Admin |

### Products
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| GET | `/api/products/shorts` | Public |
| GET | `/api/products/my-products` | Seller |
| POST | `/api/products` | Seller |
| DELETE | `/api/products/:id` | Seller/Admin |

### Orders
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/orders` | Auth |
| GET | `/api/orders/my-orders` | Auth |
| GET | `/api/orders/all` | Admin |
| PATCH | `/api/orders/:id/status` | Admin |

---

## User Roles

| Role | Permissions |
|---|---|
| `user` | Browse, cart, checkout, orders, apply for seller |
| `partner` | All user permissions + add/delete products, seller dashboard |
| `admin` | All permissions + approve sellers, manage users & orders |

---

## Deployment

| Service | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://mongodb.com/atlas) |
| File Storage | [ImageKit](https://imagekit.io) |

---

## Future Features
More exciting features and enhancements will be added in future updates.

## License

MIT License — feel free to use and modify.

---

> Built with ❤️ — X-Fashions
