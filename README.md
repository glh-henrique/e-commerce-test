# Mock Shop

The goal of this repository is to create a mock product catalog for an e-commerce platform with both backend and frontend implementations.

Everything is mocked—there is no connection to a real database.

This project was developed for **TESTING** purposes.

This repository contains two separate projects:

1. **Backend**  – `backend-mock-api-ts` (Mock API built with Node.js + TypeScript + Express)
2. **Frontend** – `e-commer-front` (Single-Page Application using React + TypeScript + Vite + Tailwind CSS)

---

## 📥 Cloning the Repository

```bash
git@github.com:glh-henrique/e-commerce-test.git
cd e-commerce-test
```

---

## 🔧 Backend

1. Open a terminal and navigate to the backend folder:

   ```bash
   cd backend-mock-api-ts
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run in development mode (with automatic reload):

   ```bash
   npm run dev
   ```

   * The mock API will be available at `http://localhost:3000`
   * Main endpoints:

     * `POST /api/auth/login`
     * `GET  /api/products`
     * `GET  /api/products/:id`
     * `POST /api/products`  (protected)
     * `PUT  /api/products/:id`  (protected)
     * `DELETE /api/products/:id`  (protected)

---

## 💻 Frontend

1. In a separate terminal, navigate to the frontend folder:

   ```bash
   cd e-commer-front
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to the suggested port.

---

## 🚀 How to Use

There are two user roles: **User** and **Admin**.

* As a **User**, you can browse the product catalog, add or remove items in the cart, and complete the checkout process (mocked).

  **User:**

  * Email: `user@example.com`
  * Password: `123456`

* As an **Admin**, you can browse the catalog, add new products, and edit or delete existing ones. The cart functionality is disabled for admins.

  **Admin:**

  * Email: `admin@example.com`
  * Password: `123456`

---

**Navigation Routes**

* `/login` → Login page
* `/products` → Product listing
* `/products/new` → Create a new product
* `/products/:id` → Edit an existing product
* `/cart` → Shopping cart

---

## 🛠️ Useful Scripts

* **Backend**

  * `npm run dev` – Run with automatic reload (ts-node-dev)
  * `npm run build` – Compile TypeScript to JavaScript in `dist/`
  * `npm start` – Run the compiled version (`dist/index.js`)

* **Frontend**

  * `npm run dev` – Start the development server (Vite)
  * `npm run build` – Generate a production build
  * `npm run preview` – Serve the production build for testing

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
