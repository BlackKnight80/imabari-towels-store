const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

// API для товаров
const products = [
  {
    id: 1,
    name: "Imabari Cotton Towel",
    price: 5000,
    color: "Серое",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Imabari Cotton Towel",
    price: 5000,
    color: "Белое",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Imabari Cotton Towel",
    price: 5000,
    color: "Синее",
    image:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

// Главная страница
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
