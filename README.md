# 🛍️ Shoply - E-commerce Web App

A modern and responsive E-commerce web application built with React, Vite, and Tailwind CSS.

---

<p align="center">
  <img src="./screenshots/Desktop view/Home.png" width="100%" alt="Shoply E-commerce Web App">
</p>

⭐ Shoply is a modern E-commerce Frontend built to provide a smooth and intuitive shopping experience, with a clean interface, responsive design, and essential shopping features.

---

<p align="center">

![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.2.1-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-06B6D4?logo=tailwindcss)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)

</p>

---

## 📌 About the project

Shoply is a modern E-commerce Frontend built with React, Vite, and Tailwind CSS. 
The project was created to simulate a real-world online shopping experience while focusing on clean UI, responsive design, and reusable React components.

The application allows users to browse products, explore categories, search and sort products, view detailed product information, manage favorites, and add products to a shopping cart. 
It also includes deals, discount calculations, quantity management, and dedicated empty and error states to provide a more complete user experience.

Shoply was developed as a practical project to strengthen my skills in React, state management, API integration, responsive UI development, and building reusable Frontend components.

---

## 🔗 Links

🚀 [Live Demo]()

💻 [Source Code]()

---

## 📸 Screenshots

### 💻 Desktop view

<p align="center">
 <img src="./screenshots/Desktop view/Home.png" width="16%">
 <img src="./screenshots/Desktop view/Shop.png" width="16%">
 <img src="./screenshots/Desktop view/Categories.png" width="16%">
 <img src="./screenshots/Desktop view/Deals.png" width="16%">
 <img src="./screenshots/Desktop view/Checkout.png" width="16%">
 <img src="./screenshots/Desktop view/Product details.png" width="16%">
</p>

### 📱 Mobile view

<p align="center">
 <img src="./screenshots/Mobile view/Home.jpg" width="16%">
 <img src="./screenshots/Mobile view/Shop.jpg" width="16%">
 <img src="./screenshots/Mobile view/Categories.jpg" width="16%">
 <img src="./screenshots/Mobile view/Deals.jpg" width="16%">
 <img src="./screenshots/Mobile view/Checkout.jpg" width="16%">
 <img src="./screenshots/Mobile view/Product details.jpg" width="16%">
</p>

### 🔍 Cart & Favorites

#### 💻 Desktop view

<p align="center">
 <img src="./screenshots/Desktop view/Favorites - Products.png" width="24%">
 <img src="./screenshots/Desktop view/Cart - Products.png" width="24%">
 <img src="./screenshots/Desktop view/Favorites - Empty.png" width="24%">
 <img src="./screenshots/Desktop view/Cart - Empty.png" width="24%">
</p>


#### 📱 Mobile view

<p align="center">
 <img src="./screenshots/Mobile view/Favorites - Products.jpg" width="24%">
 <img src="./screenshots/Mobile view/Cart - Products.jpg" width="24%">
 <img src="./screenshots/Mobile view/Favorites - Empty.jpg" width="24%">
 <img src="./screenshots/Mobile view/Cart - Empty.jpg" width="24%">
</p>

---

## ✨ Features

- 🛍️ Product Browsing — Browse products with pagination and category-based navigation.
- 🔎 Search & Sorting — Search for products and sort them based on different criteria.
- 📂 Categories — Explore products through dedicated product categories.
- 🔥 Deals & Discounts — Discover discounted products with discount-based filtering and sorting.
- 📦 Product Details — View detailed product information, images, ratings and prices.
- ❤️ Favorites — Add and remove products from a personalized favorites list.
- 🛒 Shopping Cart — Add products, adjust quantities, remove items, and view cart totals.
- 💰 Discount & Total Calculations — Automatically calculate discounts, subtotal, shipping, and final total.
- 📱 Responsive Design — Optimized for different screen sizes and devices.
- ⚡ Loading & Error Handling — Provide appropriate feedback while data is loading or when an error occurs.
- 🎨 Reusable Components — Built with reusable React components for a consistent and maintainable UI.
- 💾 Persistent Cart & Favorites — Preserve cart and favorites data using localStorage.

---

## 🛠️ Technologies 

### Frontend
- React — Building the user interface and managing application state.
- JavaScript (ES6+) — Application logic and functionality.
- Tailwind CSS — Styling and responsive UI development.

### Routing 
- React Router — Client-side routing and navigation.

### Libraries & Tools
- Lucide React — Icons and UI elements.
- DummyJSON API — Product and category data.
- React Toastify — Displaying user feedback and notifications.
- JSON Server — Simulating backend API functionality for order submission.
- LocalStorage — Persisting cart and favorites data.
- Git & GitHub — Version control and project hosting.
- Vite — Development environment and build tool.

### Deployment
- Vercel

---

## 📂 Project Structure

│
├──  src/
│  ├── components/          # Reusable React components
│  ├── pages/               # Web app pages
│  ├── Contexts/            # Application state management
│  ├── layout/              # Shared layout component
│  ├── hooks/               # Custom React hooks
│  ├── serveces             # Order submission service      
│  ├── App.jsx
│  └── index.css
│
├──  screenshots/           # screenshots
│  ├── Desktop view/
│  └── Mobile view/
│
├──  public/
│  └── images/              # Static images
│  
├──  db.json                # Local order data
│  
├──  tailwind.config.js     # Tailwind CSS configuration
│ 
└──  README.md

---

## 📌 Project scope

Shoply focuses on the Frontend experience of an E-commerce application. 
The current version includes product browsing, search and sorting, category navigation, deals, product details, favorites, shopping cart functionality, and order checkout flow.

The project uses the DummyJSON API as a source of product and category data, while cart and favorites data are persisted locally using LocalStorage.
Order data entered during checkout is sent to a JSON Server API and stored in a JSON file to simulate backend data handling.

Authentication, real payment processing, and a production backend are outside the scope of the current version and may be introduced in future iterations.

---

## 🔮 Future improvements
 
- 🔐 User Authentication — Add user registration, login, and personalized user accounts.
- 💳 Payment Integration — Integrate a real payment gateway to support online payments.
- 🗄️ Production Backend — Replace the current mock/external data sources with a dedicated backend and database.
- 📦 Order Management — Allow users to view their order history and track orders.
- 🔍 Advanced Search & Filtering — Add more advanced filtering options and improve product search.
- 🌓 Dark Mode — Add a dark theme for a more personalized user experience.
- ❤️ Cloud-based Favorites & Cart — Sync user data across devices through a backend service.

---

## ⚙️ Installation

1. Clone the repository
git clone [REPOSITORY_LINK]()
cd Shoply
2. Install dependencies
npm install
3. Start the JSON Server
npm run server
4. Start the development server
Open another terminal and run:
npm run dev

The application will then be available at the local development URL provided by Vite.

---

## 📚 What I learned

Building Shoply gave me practical experience in developing a complete React E-commerce Frontend and helped me strengthen my understanding of:

- Building reusable and maintainable React components.
- Managing application state using React Context API and custom hooks.
- Working with REST APIs and handling asynchronous data fetching.
- Implementing client-side routing with React Router.
- Building responsive and consistent interfaces using Tailwind CSS.
- Implementing product search, sorting, filtering, pagination, favorites, and cart functionality.
- Managing persistent client-side data using LocalStorage.
- Integrating JSON Server to simulate backend data handling and order submission.
- Handling loading, error, and empty states to improve the user experience.
- Debugging and solving common issues that appear during React development.
- Structuring a Frontend project with reusable components and clear separation of responsibilities.

---

## 👩‍💻 Author

ENG. Selvana Nassar

GitHub: [SelvanaNassar](https://github.com/SelvanaNassar)

LinkedIn: [Selvana Nassar](https://www.linkedin.com/in/selvana-nassar-a83538216)

Email: [selvananassar@gmail.com](mailto:selvananassar@gmail.com)