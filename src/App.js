// App.js
import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import backgroundImage from "./backgroundone.png";
import backgroundTwo from "./backgroundtwo.png";
import backgroundThree from "./backgroundthree.png";
import backgroundFour from "./backgroundfour.png";
import backgroundFive from "./backgroundfive.png";
import backgroundSix from "./backgroundsix.png";
import backgroundSeven from "./backgroundseven.jpeg";
import backgroundEight from "./backgroundeight.jpeg";
// Алиасы для изображений
// Правильные импорты изображений полотенец

import whiteImage from "./white.png";
import whiteBathOne from "./white_bathone.png";
import whiteBathTwo from "./white_bathtwo.png";

import greenImage from "./green.png";
import greenBathOne from "./green_bathone.png";
import greenBathTwo from "./green_bathtwo.png";

import blueImage from "./blue.png";
import blueBathOne from "./blue_bathone.png";
import blueBathTwo from "./blue_bathtwo.png";
// Для больших изображений интерьера
import greenTwoImage from "./greentwo.png";
import blackImage from "./black.png";
import blackOneImage from "./blackone.png";
// Функция для контекстных изображений
const getContextImages = (color) => {
  const contextMap = {
    white: [whiteBathOne, whiteBathTwo],
    green: [greenBathOne, greenBathTwo],
    blue: [blueBathOne, blueBathTwo],
  };
  return contextMap[color] || contextMap.white;
};

// Header Component
const Header = ({
  cartItems = [],
  onCartClick,
  onHistoryClick,
  onHelpClick,
  scrollToProducts,
  scrollToNews,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (action) => {
    setIsMenuOpen(false);
    if (action) action();
  };

  const getTotalItems = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Лого и навигация слева */}
          <div className="header-left">
            <div className="header-logo">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="6" r="4" fill="#ff4444" />
                <rect x="2" y="12" width="16" height="1.5" fill="#4444ff" />
                <rect x="2" y="15" width="16" height="1.5" fill="#4444ff" />
                <rect x="2" y="18" width="16" height="1.5" fill="#4444ff" />
              </svg>
            </div>

            {/* Десктопная навигация слева */}
            <nav className="desktop-nav">
              <button className="nav-button" onClick={onHistoryClick}>
                История
              </button>
              <button className="nav-button" onClick={scrollToProducts}>
                Каталог
              </button>
              <button className="nav-button" onClick={onHelpClick}>
                FAQ
              </button>
              <button className="nav-button" onClick={scrollToNews}>
                Новости
              </button>
            </nav>
          </div>

          {/* Корзина справа */}
          <div className="header-right">
            <div className="header-right desktop-only">
              <button className="nav-button cart-button" onClick={onCartClick}>
                <span className="cart-counter-circle">{getTotalItems()}</span>
                Корзина
              </button>
            </div>
          </div>

          {/* Планшетная навигация */}
          <div className="tablet-nav">
            <button className="menu-button" onClick={toggleMenu}>
              Меню
            </button>
          </div>

          {/* Мобильная навигация */}
          <div className="mobile-nav">
            <button className="menu-button" onClick={toggleMenu}>
              Меню
            </button>
          </div>
        </div>

        {/* Выпадающее меню */}
        <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="dropdown-content">
            <button
              className="dropdown-item"
              onClick={() => handleMenuClick(onHistoryClick)}
            >
              История
            </button>
            <button
              className="dropdown-item"
              onClick={() => handleMenuClick(scrollToProducts)}
            >
              Каталог
            </button>
            <button
              className="dropdown-item"
              onClick={() => handleMenuClick(onHelpClick)}
            >
              FAQ
            </button>
            <button
              className="dropdown-item"
              onClick={() => handleMenuClick(scrollToNews)}
            >
              Новости
            </button>
            <button
              className="dropdown-item mobile-cart-menu"
              onClick={() => {
                setIsMenuOpen(false);
                onCartClick();
              }}
            >
              🛒 Корзина ({getTotalItems()})
            </button>
          </div>
        </div>
      </header>

      {/* Оверлей для закрытия меню */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [circleAnimated, setCircleAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
    setTimeout(() => setCircleAnimated(true), 2000);
  }, []);

  return (
    <section className="hero">
      <div className="hero-image-bg"></div>

      <div className="hero-overlay">
        <div className="hero-container">
          <div className="hero-content">
            <div className={`hero-text ${isLoaded ? "animate-in" : ""}`}>
              <p className="hero-subtitle">Инстайн — Мягкая полотенца</p>
              <h1 className="hero-title">
                Мягкая вода бережно относится к пряже, подчёркивая естественную
                мягкость хлопка.
              </h1>
            </div>
          </div>

          <div className={`hero-graphic ${isLoaded ? "animate-in" : ""}`}>
            <div
              className={`graphic-circle ${
                circleAnimated ? "animate-circle" : ""
              }`}
            >
              <div className="circle-progress"></div>

              <div className="graphic-lines">
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
              </div>
            </div>
            <div className="graphic-bottom-line"></div>
          </div>

          <div className={`indicator-001 ${isLoaded ? "animate-in" : ""}`}>
            001
          </div>
          <div className={`indicator-002 ${isLoaded ? "animate-in" : ""}`}>
            002
          </div>
          <div className={`indicator-003 ${isLoaded ? "animate-in" : ""}`}>
            003
          </div>
          <div className={`indicator-004 ${isLoaded ? "animate-in" : ""}`}>
            004
          </div>
        </div>
      </div>

      <style>{`
        .hero-image-bg {
          background-image: url(${backgroundImage});
        }
      `}</style>
    </section>
  );
};

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector(".about-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-subtitle">Имабари, Эхиме</div>

        <div className={`about-content ${isVisible ? "animate-in" : ""}`}>
          <h2 className="about-title">
            Регион богатый природой.
            <br />
            Мягкая вода{" "}
            <span className="icon-water">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 20c0-4 4-8 8-8s8 4 8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M14 22c0-3 3-6 6-6s6 3 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
            , качественная
            <br />
            пряжа{" "}
            <span className="icon-yarn">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 8v24M8 20h24"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
            , и богатый опыт.
          </h2>
        </div>
      </div>
    </section>
  );
};

const NatureSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector(".nature-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="nature-section">
      <div className="nature-image-bg"></div>

      <div className="nature-overlay">
        <div className="nature-container">
          <div className={`nature-content ${isVisible ? "animate-in" : ""}`}>
            <p className="nature-subtitle">Исключительное Японское качество</p>
            <h2 className="nature-title">
              Полотенца Imabari — прикосновение Японии
            </h2>
          </div>
        </div>
      </div>

      <style>{`
        .nature-image-bg {
          background-image: url(${backgroundTwo});
        }
      `}</style>
    </section>
  );
};

const DescriptionSection = ({ onFeatureClick, onHistoryClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    const section = document.querySelector(".description-section");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const features = [
    {
      id: "water",
      title: "Мягкая вода",
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle
            cx="25"
            cy="25"
            r="24"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M15 20c0-3 2-5 5-5s5 2 5 5h5c2 0 3 1 3 3s-1 3-3 3H17c-2 0-3-1-3-3s1-3 1-3z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M12 30c2-1 4 1 6 0s4-1 6 0s4 1 6 0s4-1 6 0"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M12 34c2-1 4 1 6 0s4-1 6 0s4 1 6 0s4-1 6 0"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      ),
      description: `Подземные воды реки Соджагава — вода которая бережно относится к пряже и материалу полотенца и позволяет получить нежные и яркие цвета, подчеркивая естественную мягкость используемого хлопка..`,
      image: backgroundSeven,
    },
    {
      id: "experience",
      title: "Богатый опыт",
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle
            cx="25"
            cy="25"
            r="24"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            cx="25"
            cy="25"
            r="18"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="25"
            cy="25"
            r="12"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="25" cy="25" r="6" stroke="currentColor" strokeWidth="1" />
          <circle cx="25" cy="25" r="2" fill="currentColor" />
        </svg>
      ),
      description: `Различные ремесленные навыки можно увидеть в деталях каждого этапа производства полотенца, включая обработку пряжи, ткачество, состав красителя и уникальную технику Sakizarashi Sakizome`,
      image: backgroundSix,
    },
    {
      id: "standards",
      title: "Стандарты",
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle
            cx="25"
            cy="25"
            r="24"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="15"
            y="15"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M20 20h10M20 25h10M20 30h10"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      ),
      description: `У нас есть свой собственные методы проверки качества. Например, есть «правило пяти секунд». Оно проверяет, тонет ли полотенце после того, как его положили на воду в течение пяти секунд. Это уникальная проверка, используемая в этой области, чтобы гарантировать поглощение воды.`,
      image: backgroundFive,
    },
  ];

  return (
    <section className="description-section">
      <div className="description-container">
        <div className={`description-content ${isVisible ? "animate-in" : ""}`}>
          <p className="description-text">
            Откройте для себя полотенца Imabari, созданные в одноименном регионе
            Японии, известном своими многовековыми традициями текстильного
            мастерства. Эти полотенца — воплощение элегантности, мягкости и
            долговечности, которые станут идеальным дополнением вашего дома или
            роскошным подарком для близких. Подарите себе или своим близким
            незабываемое ощущение комфорта с полотенцами Imabari.
          </p>

          <div
            className="description-signature"
            onClick={onHistoryClick}
            style={{ cursor: "pointer" }}
          >
            История Imabari
          </div>
        </div>

        <div className={`features-grid ${isVisible ? "animate-in" : ""}`}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-item"
              onClick={() => onFeatureClick(feature)}
              style={{ cursor: "pointer" }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">
                {feature.title}
                <span className="info-icon">ⓘ</span>
              </h3>
              <div className="feature-spacer"></div>
              <p className="feature-description">
                {feature.description.substring(0, 200)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductsSection = ({ onAddToCart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Towel");
  const [selectedColor, setSelectedColor] = useState("white");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector(".products-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      id: 1,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "white",
      image: whiteImage,
      additionalImages: [whiteBathOne, whiteBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая природа региона — все это способствует качеству производства, что было замечено издавна.",
    },
    {
      id: 2,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "green",
      image: greenImage,
      additionalImages: [greenBathOne, greenBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая природа региона — все это способствует качеству производства, что было замечено издавна.",
    },
    {
      id: 3,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "blue",
      image: blueImage,
      additionalImages: [blueBathOne, blueBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая природа региона — все это способствует качеству производства, что было замечено издавна.",
    },
    {
      id: 4,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "blue",
      image: blueImage,
      additionalImages: [blueBathOne, blueBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая природа региона — все это способствует качеству производства, что было замечено издавна.",
    },
    {
      id: 5,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "white",
      image: whiteImage,
      additionalImages: [whiteBathOne, whiteBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая природа региона — все это способствует качеству производства, что было замечено издавна.",
    },
    {
      id: 6,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "green",
      image: greenImage,
      additionalImages: [greenBathOne, greenBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая природа региона — все это способствует качеству производства, что было замечено издавна.",
    },
    {
      id: 7,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "white",
      image: whiteImage,
      additionalImages: [whiteBathOne, whiteBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая природа региона — все это способствует качеству производства, что было замечено издавна.",
    },
    {
      id: 8,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "blue",
      image: blueImage,
      additionalImages: [blueBathOne, blueBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая природа региона — все это способствует качеству производства, что было замечено издавна.",
    },
    {
      id: 9,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "green",
      image: greenImage,
      additionalImages: [greenBathOne, greenBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая природа региона — все это способствует качеству производства, что было замечено издавна.",
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.color);
    setSelectedSize("Towel");
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct && onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(
          {
            ...selectedProduct,
            color: selectedColor,
          },
          selectedSize
        );
      }
    }
  };

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product, "Towel");
  };

  return (
    <section className="products-section">
      <div className="products-container">
        <div className={`products-header ${isVisible ? "animate-in" : ""}`}>
          <h2 className="products-title">Продукция Imabari</h2>

          <div className="products-tabs">
            <button className="tab-button active">Полотенца</button>
            <button className="tab-button">Для дома</button>
            <button className="tab-button">Аксессуары / Одежда</button>
          </div>
        </div>

        <div className={`hero-images ${isVisible ? "animate-in" : ""}`}>
          <div className="hero-image-large">
            <img
              src={greenTwoImage}
              alt="Imabari towels in bathroom interior"
            />
          </div>
          <div className="hero-image-small">
            <img src={blackImage} alt="Imabari black towel in bathroom" />
            <div className="image-overlay">
              <div className="overlay-card">
                <div className="overlay-product-image">
                  <img src={blackOneImage} alt="Imabari Cotton Towel" />
                </div>
                <div className="overlay-product-info">
                  <h3>Imabari Cotton Towel</h3>
                  <p className="overlay-price">5.000 ₽</p>
                </div>
                <div className="overlay-dots">
                  <span className="dot active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`products-grid ${isVisible ? "animate-in" : ""}`}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-color">{product.color.toUpperCase()}</p>
                <p className="product-price">{product.price}</p>

                <button
                  className="product-add"
                  onClick={(e) => handleQuickAdd(product, e)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.5 15l5-5-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`products-pagination ${isVisible ? "animate-in" : ""}`}>
          <button className="pagination-arrow" disabled>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15l-5-5 5-5"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          <button className="pagination-number active">1</button>
          <button className="pagination-number">2</button>
          <button className="pagination-number">3</button>
          <span className="pagination-dots">...</span>
          <button className="pagination-number">6</button>

          <button className="pagination-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Модальное окно товара */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content-fullscreen"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-grid">
              <div className="modal-images">
                <div className="main-product-image">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="product-main-img"
                  />
                </div>

                <div className="context-images">
                  <img
                    src={getContextImages(selectedProduct.color)[0]}
                    alt="Bathroom context 1"
                    className="context-img"
                  />
                  <img
                    src={getContextImages(selectedProduct.color)[1]}
                    alt="Bathroom context 2"
                    className="context-img"
                  />
                </div>

                <p className="image-caption">Читать отзывы</p>
              </div>

              <div className="modal-info">
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <p className="modal-price">{selectedProduct.price}</p>

                <p className="modal-description">
                  {selectedProduct.description}
                </p>

                <p className="modal-quality">Читать больше</p>

                <div className="size-selection">
                  <label>Размер:</label>
                  <div className="size-options">
                    <button
                      className={`size-btn ${
                        selectedSize === "Small" ? "active" : ""
                      }`}
                      onClick={() => setSelectedSize("Small")}
                    >
                      Small
                    </button>
                    <button
                      className={`size-btn ${
                        selectedSize === "Towel" ? "active" : ""
                      }`}
                      onClick={() => setSelectedSize("Towel")}
                    >
                      Towel
                    </button>
                    <button
                      className={`size-btn ${
                        selectedSize === "Large" ? "active" : ""
                      }`}
                      onClick={() => setSelectedSize("Large")}
                    >
                      Large
                    </button>
                  </div>
                </div>

                <div className="color-selection">
                  <label>Цвет:</label>
                  <div className="color-options">
                    <button
                      className={`color-btn white ${
                        selectedColor === "white" ? "active" : ""
                      }`}
                      onClick={() => setSelectedColor("white")}
                      data-color="white"
                    ></button>
                    <button
                      className={`color-btn green ${
                        selectedColor === "green" ? "active" : ""
                      }`}
                      onClick={() => setSelectedColor("green")}
                      data-color="green"
                    ></button>
                    <button
                      className={`color-btn blue ${
                        selectedColor === "blue" ? "active" : ""
                      }`}
                      onClick={() => setSelectedColor("blue")}
                      data-color="blue"
                    ></button>
                  </div>
                </div>

                <div className="quantity-section">
                  <button
                    className="quantity-btn minus"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    className="quantity-btn plus"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  В корзину
                </button>

                <div className="modal-accordion">
                  <button className="accordion-btn">
                    Параметры
                    <span className="accordion-icon">⌄</span>
                  </button>
                </div>

                <p className="reviews-link">Читать отзывы</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ManufacturingSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector(".manufacturing-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="manufacturing-section">
      {/* Верхняя часть с изображением и геометрической фигурой */}
      <div className="manufacturing-image-container">
        <div className="manufacturing-image-bg"></div>

        <div className="manufacturing-overlay">
          <div className="manufacturing-container">
            <div className={`geometric-shape ${isVisible ? "animate-in" : ""}`}>
              <div className="shape-circle">
                <div className="shape-diamond">
                  <div className="shape-lines">
                    <div className="horizontal-line"></div>
                    <div className="vertical-line"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть с текстовой информацией */}
      <div className="manufacturing-content">
        <div className="manufacturing-text-container">
          <div className={`info-card ${isVisible ? "animate-in" : ""}`}>
            <h3 className="info-title">
              200 производителей
              <span className="title-icon">⌃</span>
            </h3>
            <p className="info-description">
              Сейчас на производственной площадке находится почти 200 фабрик,
              которые крутят пряжу, красят пряжу, изготавливают полотенца.
            </p>

            <div className="accordion-section">
              <div className="accordion-item">
                <button className="accordion-header">
                  Материалы
                  <span className="accordion-icon">⌄</span>
                </button>
              </div>

              <div className="accordion-item">
                <button className="accordion-header">
                  Контроль качества
                  <span className="accordion-icon">⌄</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .manufacturing-image-bg {
          background-image: url(${backgroundThree});
        }
      `}</style>
    </section>
  );
};

const NewsSection = ({ onNewsClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector(".news-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const newsItems = [
    {
      id: 1,
      date: "1 Января",
      title: "Открытие интернет-магазина",
      description:
        "Мы с гордостью открываем интернет-магазин в России чтобы радовать вас лучшими Японскими полотенцами из японского региона Имабари.",
    },
    {
      id: 2,
      date: "1 Января",
      title: "Открытие интернет-магазина",
      description:
        "Мы с гордостью открываем интернет-магазин в России чтобы радовать вас лучшими Японскими полотенцами из японского региона Имабари.",
    },
    {
      id: 3,
      date: "1 Января",
      title: "Открытие интернет-магазина",
      description:
        "Мы с гордостью открываем интернет-магазин в России чтобы радовать вас лучшими Японскими полотенцами из японского региона Имабари.",
    },
  ];

  return (
    <section className="news-section">
      <div className="news-container">
        <div className="news-content">
          <div className={`news-header ${isVisible ? "animate-in" : ""}`}>
            <h2 className="news-title">Следите за нашим развитием</h2>
            <p className="news-subtitle">
              Новости компании Imabari — это наша текущая история.
            </p>
          </div>

          <div className={`news-list ${isVisible ? "animate-in" : ""}`}>
            {newsItems.map((item, index) => (
              <div
                key={item.id}
                className="news-item clickable"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => onNewsClick(item)}
              >
                <div className="news-date">{item.date}</div>
                <h3 className="news-item-title">{item.title}</h3>
                <p className="news-description">{item.description}</p>
              </div>
            ))}

            <div className="news-pagination">
              <button className="pagination-arrow" disabled>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M12.5 15l-5-5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              <button className="pagination-number active">1</button>
              <button className="pagination-number">2</button>
              <button className="pagination-number">3</button>
              <span className="pagination-dots">...</span>
              <button className="pagination-number">6</button>

              <button className="pagination-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 15l5-5-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onHelpClick, onContactsClick }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="footer-brand">
              Имабари — Мягкая полотенца, регион богатый природой.
            </h3>
            <p className="footer-copyright">© 2020 Imabari</p>
          </div>

          <div className="footer-center">
            <div className="footer-column">
              <h4 className="footer-title">Информация</h4>
              <ul className="footer-links">
                <li>
                  <button onClick={onHelpClick} className="footer-link">
                    Помощь
                  </button>
                </li>
                <li>
                  <button onClick={onContactsClick} className="footer-link">
                    Контакты
                  </button>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Политика конфиденциальности
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-column">
              <h4 className="footer-title">Связь</h4>
              <div className="footer-contact">hello@imabari.care</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Сделано в Дзен Дизайн</p>
        </div>
      </div>
    </footer>
  );
};

const HelpPage = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="page-overlay" onClick={onClose}>
      <div className="page-content" onClick={(e) => e.stopPropagation()}>
        <button className="page-close" onClick={onClose}>
          ✕
        </button>

        <div className="page-container">
          <h1 className="page-title">Помощь</h1>

          <div className="help-sections">
            <section className="help-section">
              <h3>Оплата</h3>
              <p>
                Мы принимаем разные способы оплаты, онлайн и офлайн,
                безконтактная оплата и наличный расчет — все для вашего
                удобства.
              </p>

              <h4>Онлайн</h4>
              <p>
                — Банковские карты Visa (в том числе Electron), MasterCard,
                Maestro, «СБ и МИР.
              </p>
              <p>— Мобильные платежи в системах Apple Pay и Google Pay</p>

              <p>
                Оплата происходит в защищенном режиме через CloudPayments. К
                оплате принимаются карты, выпущенные на территории России.
              </p>

              <h4>При получении</h4>
              <p>
                — Штатные курьеры при доставке по Москве внутри МКАД принимают
                карты МИР, Visa, MasterCard (включая Electron и Maestro) и
                наличные.
              </p>

              <p>— Курьеры службы Boxberry при доставке в пункты выдачи.</p>
              <p>
                К оплате принимаются карты, выпущенные на территории России.
              </p>
            </section>

            <section className="help-section">
              <h3>Доставка</h3>

              <p>
                Москва (МКАД) — 400Р, бесплатно от 5 000Р. Согласуем интервал
                доставки в течение двух дней после оформления заказа, доставим
                за 2-3 рабочих дня или в нужную дату. Доставка работает с
                понедельника по пятницу с 10:00 до 20:00. Курьер привезёт на
                примерку до 2 курток/пар обуви или до 4 плащей/рюкзаков/пар
                джинсов/пар штанов. Доставка свыше лимита оплачивается
                дополнительно. Максимальное количество товаров из раздела
                демисезонных и зимних курток не более 4 единиц, стоимость
                доставки (МКАД) — 800Р, бесплатно от 5 000Р. Примерка — 15
                минут. Если ничего не подойдёт, оплачивается только доставка.
              </p>
            </section>
            <section className="help-section">
              <h3>Обмен и возврат</h3>
              <p>Отправим новый товар или вернём деньги, если:</p>
              <p>— товаром не пользовались</p>
              <p>— его купили на официальном сайте</p>
              <p>— с момента получения прошло до 30 дней</p>

              <p>Транспортные расходы до склада оплачиваются покупателем.</p>
            </section>
            <section className="help-section">
              <h3>Уход</h3>
              <p>
                Правильный уход за одеждой — это тоже шаг к экологической
                ответственности. Ведь вещь в хорошем состоянии будет служить не
                один сезон и в будущем может пригодиться тому, кто в этом
                нуждается. Мы делимся некоторыми простыми советами по уходу,
                чтобы вы могли сохранить ваши вещи как можно дольше. Но, прежде
                чем приступить к стирке в домашних условиях, либо отдать вещь в
                химчистку, изучите, пожалуйста, этикетку с рекомендациями по
                уходу за конкретным изделием.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactsPage = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="page-overlay" onClick={onClose}>
      <div className="page-content" onClick={(e) => e.stopPropagation()}>
        <button className="page-close" onClick={onClose}>
          ✕
        </button>

        <div className="page-container">
          <h1 className="page-title">Контакты</h1>

          <div className="contacts-content">
            <div className="contact-info">
              <h3>Телефон</h3>
              <p>+7 (495) 123-45-67</p>
              <p>Режим работы: Пн-Пт 9:00-18:00</p>

              <h3>Email</h3>
              <p>info@imabari.ru</p>
              <p>support@imabari.ru</p>

              <h3>Адрес офиса</h3>
              <p>г. Москва, ул. Примерная, д. 123</p>
              <p>Станция метро "Примерная"</p>

              <h3>Социальные сети</h3>
              <p>Instagram: @imabari_russia</p>
              <p>VK: vk.com/imabari_russia</p>
            </div>

            <div className="company-info">
              <h3>ООО "Имабари Россия"</h3>
              <p>ИНН: 1234567890</p>
              <p>ОГРН: 1234567890123</p>
              <p>Адрес: 123456, г. Москва, ул. Примерная, д. 123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsModal = ({ isOpen, onClose, newsItem }) => {
  if (!isOpen || !newsItem) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="news-modal-container">
          <div className="news-modal-header">
            <div className="news-modal-date">{newsItem.date}</div>
            <h2 className="news-modal-title">{newsItem.title}</h2>
            <p className="news-modal-description">{newsItem.description}</p>
          </div>

          <div className="news-modal-image">
            <img src={backgroundFour} alt="Новость" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureModal = ({ isOpen, onClose, feature }) => {
  if (!isOpen || !feature) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="feature-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="feature-modal-container">
          <div className="feature-modal-left">
            <div className="feature-modal-icon">{feature.icon}</div>
            <h2 className="feature-modal-title">{feature.title}</h2>
            <p className="feature-modal-description">{feature.description}</p>
          </div>

          <div className="feature-modal-right">
            <img src={feature.image} alt={feature.title} />
          </div>
        </div>
      </div>
    </div>
  );
};
const HistoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="history-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="history-modal-container">
          <div className="history-modal-header">
            <span className="history-label">История</span>
            <h2 className="history-title">
              Полотенца Imabari —<br />
              прикосновение Японии
            </h2>
          </div>

          <div className="history-modal-image">
            <img src={backgroundEight} alt="Пейзаж Имабари" />
          </div>

          <div className="history-modal-content-text">
            <p>
              Имабари, Эхиме — Мягкая полотенца, которые производят
              производители на уже более 100 лет. На этой большой
              производственной площадке находится почти 200 фабрик, которые
              крутят пряжу, красят пряжу, изготавливают полотенца и т. д. Кроме
              того, район рядом с Внутренним морем Сэто богат природой и
              плодородна земля хороша известна как город, где мягкая. Симанами
              Кайдо пересекает пролив. Вся большие люди наслаждаются здесь
              многолетним.
            </p>

            <div className="history-sections">
              <div className="history-section">
                <h3>Истоки</h3>
                <p>
                  Подземные воды реки Соджагава, богатая природа региона — все
                  это способствует качеству производства, что было замечено
                  издавна.
                </p>
                <span className="history-year">1894</span>
              </div>

              <div className="history-section">
                <h3>Старт производства</h3>
                <p>
                  Имабари, Эхиме — Мекка полотенец. Больше 130 лет назад тут
                  начали производить лучшие полотенца не только в Японии но и в
                  мире.
                </p>
                <span className="history-year">2024</span>
              </div>

              <div className="history-section">
                <h3>Настоящее время</h3>
                <p>
                  Подземные воды реки Соджагава, богатая природа региона — все
                  это способствует качеству производства, что было замечено
                  издавна.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const CartModal = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="cart-modal-container">
          <div className="cart-header">
            <h2 className="cart-title">Корзина</h2>
            <div className="cart-header-right">
              <span className="cart-count">{totalQuantity} товара</span>
              <button className="clear-cart" onClick={onClearCart}>
                Очистить корзину
              </button>
            </div>
          </div>

          <div className="cart-items-grid">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Корзина пуста</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item-card">
                  <div className="cart-item-quantity-badge">
                    {item.quantity} шт
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => onRemoveItem(item.id, item.size)}
                  >
                    ✕
                  </button>

                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">
                      {item.price.toLocaleString()} ₽
                    </p>
                  </div>

                  <div className="cart-item-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.size, -1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.size, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-footer">
              <p className="delivery-info">
                Бесплатная доставка на заказы выше 2000 ₽
              </p>
              <button className="checkout-btn" onClick={onCheckout}>
                Оформить заказ — {total.toLocaleString()} ₽
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const CheckoutPage = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    index: "",
    paymentMethod: "card",
  });

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryCost = total >= 5000 ? 0 : 200;
  const discount = 0;
  const finalTotal = total + deliveryCost - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Имитация процесса оплаты
    if (formData.paymentMethod === "card") {
      // Имитируем успешную оплату в 80% случаев
      const isSuccess = Math.random() > 0.2;

      setTimeout(() => {
        if (isSuccess) {
          const orderNumber = Math.floor(Math.random() * 900000) + 100000;
          onPaymentSuccess(orderNumber);
          onClearCart();
        } else {
          onPaymentError();
        }
        onClose();
      }, 1000);
    } else {
      // Наличная оплата всегда успешна
      const orderNumber = Math.floor(Math.random() * 900000) + 100000;
      onPaymentSuccess(orderNumber);
      onClearCart();
      onClose();
    }
  };

  return (
    <div className="page-overlay" onClick={onClose}>
      <div
        className="checkout-page-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="page-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <div className="checkout-container">
          <div className="checkout-left">
            <h1 className="checkout-title">Оформление заказа</h1>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h3 className="form-section-title">Личная информация</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Имя *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="surname">Фамилия *</label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Телефон *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Доставка</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">Город *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Адрес *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="index">Индекс *</label>
                    <input
                      type="text"
                      id="index"
                      name="index"
                      value={formData.index}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <p className="delivery-cost">
                  Стоимость доставки: {deliveryCost} ₽
                </p>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Оплата</h3>

                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                    />
                    <span className="payment-text">Карта на сайте</span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleInputChange}
                    />
                    <span className="payment-text">
                      Наличными при получении
                    </span>
                  </label>
                </div>
              </div>

              <button type="submit" className="checkout-submit-btn">
                Перейти к оплате
              </button>
            </form>
          </div>

          <div className="checkout-right">
            <div className="order-summary">
              <h3 className="summary-title">Корзина</h3>
              <p className="summary-count">{totalQuantity} товара</p>

              <div className="summary-items">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="summary-item">
                    <div className="summary-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-line"></div>

              <div className="summary-calculations">
                <div className="calc-row">
                  <span>Товары:</span>
                  <span>{total.toLocaleString()} ₽</span>
                </div>
                <div className="calc-row">
                  <span>Доставка:</span>
                  <span>{deliveryCost} ₽</span>
                </div>
                <div className="calc-row">
                  <span>Скидка:</span>
                  <span>{discount} ₽</span>
                </div>
              </div>

              <div className="summary-total">
                <span>Итог:</span>
                <span className="total-price">
                  {finalTotal.toLocaleString()}₽
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const PaymentErrorPage = ({ isOpen, onClose, onRetry }) => {
  if (!isOpen) return null;

  return (
    <div className="page-overlay">
      <div className="payment-status-page">
        <div className="payment-status-container">
          <div className="payment-status-content">
            <h1 className="payment-status-title">Ошибка оплаты</h1>
            <p className="payment-status-subtitle">Оплачивать опять нужно не</p>

            <div className="payment-actions">
              <button className="payment-btn primary" onClick={onRetry}>
                Попробовать ещё раз
              </button>
              <button className="payment-btn secondary" onClick={onClose}>
                На главную
              </button>
            </div>
          </div>
        </div>

        <div className="payment-footer">
          <p>© 2020 Imabari</p>
        </div>
      </div>
    </div>
  );
};
const PaymentSuccessPage = ({ isOpen, onClose, orderNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="page-overlay">
      <div className="payment-status-page">
        <div className="payment-status-container">
          <div className="payment-status-content">
            <h1 className="payment-status-title">Оплата прошла успешно!</h1>
            <p className="payment-status-subtitle">Заказ №{orderNumber}</p>
            <p className="payment-status-description">
              Уведомление о статусе заказа будет отправлено на указанную почту
            </p>

            <div className="payment-actions">
              <button className="payment-btn primary" onClick={onClose}>
                На главную
              </button>
            </div>
          </div>
        </div>

        <div className="payment-footer">
          <p>© 2020 Imabari</p>
        </div>
      </div>
    </div>
  );
};
const AddToCartNotification = ({
  isVisible,
  onClose,
  product,
  onContinue,
  onGoToCart,
}) => {
  if (!isVisible || !product) return null;

  return (
    <div className="notification-overlay" onClick={onClose}>
      <div
        className="notification-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="notification-close" onClick={onClose}>
          ✕
        </button>

        <div className="notification-header">
          <h3 className="notification-title">Товар добавлен в корзину!</h3>
        </div>

        <div className="notification-product">
          <div className="notification-product-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="notification-product-info">
            <h4 className="notification-product-name">{product.name}</h4>
            <div className="notification-product-details">
              <span>Размер: {product.size || "Towel"}</span>
              <span className="separator">|</span>
              <span>Цвет: {product.color}</span>
            </div>
            <p className="notification-product-price">{product.price} ₽</p>
          </div>
        </div>

        <div className="notification-actions">
          <button className="notification-btn secondary" onClick={onContinue}>
            Продолжить покупки
          </button>
          <button className="notification-btn primary" onClick={onGoToCart}>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};
const App = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showPaymentError, setShowPaymentError] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const productsRef = useRef(null);
  const newsRef = useRef(null);

  const scrollToProducts = () => {
    console.log("Скролл к продуктам"); // Для отладки
    if (productsRef.current) {
      productsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToNews = () => {
    console.log("Скролл к новостям"); // Для отладки
    if (newsRef.current) {
      newsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
    setShowNewsModal(true);
  };

  const closeNewsModal = () => {
    setShowNewsModal(false);
    setSelectedNews(null);
  };

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setShowFeatureModal(true);
  };

  const closeFeatureModal = () => {
    setShowFeatureModal(false);
    setSelectedFeature(null);
  };

  const addToCart = (product, size = "Towel") => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            color: product.color,
            price: parseInt(product.price.replace(/[^\d]/g, "")),
            quantity: 1,
            size: size,
            image: product.image,
          },
        ];
      }
    });

    // Показать уведомление
    setAddedProduct({
      ...product,
      size: size,
      price: product.price,
    });
    setShowAddNotification(true);
  };

  const updateCartQuantity = (id, size, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems((items) =>
      items.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handlePaymentSuccess = (orderNum) => {
    setOrderNumber(orderNum);
    setShowPaymentSuccess(true);
  };

  const handlePaymentError = () => {
    setShowPaymentError(true);
  };

  const handleRetryPayment = () => {
    setShowPaymentError(false);
    setShowCheckout(true);
  };

  const closeAllModals = () => {
    setShowCheckout(false);
    setShowPaymentSuccess(false);
    setShowPaymentError(false);
  };

  const handleContinueShopping = () => {
    setShowAddNotification(false);
    setAddedProduct(null);
  };

  const handleGoToCart = () => {
    setShowAddNotification(false);
    setAddedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="App">
      <Header
        onHelpClick={() => setShowHelp(true)}
        onContactsClick={() => setShowContacts(true)}
        onCartClick={() => setIsCartOpen(true)}
        onHistoryClick={() => setShowHistoryModal(true)}
        scrollToProducts={scrollToProducts}
        scrollToNews={scrollToNews}
        cartItems={cartItems}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />
      <HeroSection />
      <AboutSection />
      <NatureSection />
      <DescriptionSection
        onFeatureClick={handleFeatureClick}
        onHistoryClick={() => setShowHistoryModal(true)}
      />
      <div ref={productsRef}>
        <ProductsSection onAddToCart={addToCart} />
      </div>
      <ManufacturingSection />
      <div ref={newsRef}>
        <NewsSection onNewsClick={handleNewsClick} />
      </div>
      <Footer
        onHelpClick={() => setShowHelp(true)}
        onContactsClick={() => setShowContacts(true)}
      />

      <HelpPage isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <ContactsPage
        isOpen={showContacts}
        onClose={() => setShowContacts(false)}
      />
      <NewsModal
        isOpen={showNewsModal}
        onClose={closeNewsModal}
        newsItem={selectedNews}
      />
      <FeatureModal
        isOpen={showFeatureModal}
        onClose={closeFeatureModal}
        feature={selectedFeature}
      />
      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setShowCheckout(true);
        }}
      />
      <CheckoutPage
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        onClearCart={clearCart}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
      <PaymentSuccessPage
        isOpen={showPaymentSuccess}
        onClose={closeAllModals}
        orderNumber={orderNumber}
      />
      <PaymentErrorPage
        isOpen={showPaymentError}
        onClose={closeAllModals}
        onRetry={handleRetryPayment}
      />
      <AddToCartNotification
        isVisible={showAddNotification}
        onClose={handleContinueShopping}
        product={addedProduct}
        onContinue={handleContinueShopping}
        onGoToCart={handleGoToCart}
      />
    </div>
  );
};

export default App;
