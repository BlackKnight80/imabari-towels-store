// App.js
import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import backgroundImage from "./backgroundone-desktop.png";
import backgroundMobile from "./backgroundone-mobile.png";
import backgroundTablet from "./backgroundone-tablet.png";
import backgroundDesktop from "./backgroundone-desktop.png";
import background4K from "./backgroundone-4k.png";
import backgroundTwo from "./backgroundtwo.png";
import backgroundThree from "./backgroundthree.png";
import backgroundFour from "./backgroundfour.png";
import backgroundFive from "./backgroundfive.png";
import backgroundSix from "./backgroundsix.png";
import backgroundSeven from "./backgroundseven.jpeg";
import backgroundEight from "./backgroundeight.jpeg";

import whiteImage from "./white.png";
import whiteBathOne from "./white_bathone.png";
import whiteBathTwo from "./white_bathtwo.png";

import greenImage from "./green.png";
import greenBathOne from "./green_bathone.png";
import greenBathTwo from "./green_bathtwo.png";

import blueImage from "./blue.png";
import blueBathOne from "./blue_bathone.png";
import blueBathTwo from "./blue_bathtwo.png";

import greenTwoImage from "./greentwo.png";
import blackImage from "./black.png";
import blackOneImage from "./blackone.png";

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
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header" ref={menuRef}>
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <svg
              width="28"
              height="46"
              viewBox="0 0 28 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.9999 0H0.399902V27.6H27.9999V0ZM14.2 24.84C20.2972 24.84 25.2399 19.8972 25.2399 13.8C25.2399 7.70277 20.2972 2.76 14.2 2.76C8.10274 2.76 3.15996 7.70277 3.15996 13.8C3.15996 19.8972 8.10274 24.84 14.2 24.84Z"
                fill="#FF4944"
              />
              <rect
                x="0.399902"
                y="32.2"
                width="27.6"
                height="2.76"
                fill="#2E42C7"
              />
              <rect
                x="0.399902"
                y="37.72"
                width="27.6"
                height="2.76"
                fill="#2E42C7"
              />
              <rect
                x="0.399902"
                y="43.24"
                width="27.6"
                height="2.76"
                fill="#2E42C7"
              />
            </svg>
          </div>

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

        <div className="header-right">
          <div className="desktop-only">
            <button className="nav-button cart-button" onClick={onCartClick}>
              <span className="cart-counter-circle">{getTotalItems()}</span>
              Корзина
            </button>
          </div>
        </div>

        <div className="tablet-nav">
          <button className="menu-button" onClick={toggleMenu}>
            Меню
          </button>
        </div>

        <div className="mobile-nav">
          <button className="menu-button" onClick={toggleMenu}>
            Меню
          </button>
        </div>
      </div>

      <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="dropdown-header">
          <button
            className="dropdown-close"
            onClick={() => setIsMenuOpen(false)}
          >
            ×
          </button>
        </div>

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

          {/* Корзина внизу меню */}
          <button
            className="dropdown-item mobile-cart-menu"
            onClick={() => handleMenuClick(onCartClick)}
          >
            <span className="cart-counter-circle">{getTotalItems()}</span>
            Корзина
          </button>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState("");
  const [progress, setProgress] = useState(0);

  const getBackgroundImage = () => {
    const width = window.innerWidth;
    if (width >= 3840) return background4K;
    if (width >= 1920) return backgroundDesktop;
    if (width >= 1024) return backgroundTablet;
    return backgroundMobile;
  };

  useEffect(() => {
    const updateImage = () => {
      setCurrentImage(getBackgroundImage());
    };

    updateImage();
    window.addEventListener("resize", updateImage);

    return () => window.removeEventListener("resize", updateImage);
  }, []);

  // Только анимация прогресса без переключения слайдов
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 100 / (5000 / 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <section className="hero">
      <img src={currentImage} className="hero-bg-img" alt="" />

      <div className="hero-graphic">
        <svg
          width="310"
          height="325"
          viewBox="0 0 310 325"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hero-svg-animated"
        >
          <path
            d="M155 1.25C206.094 1.25 251.367 26.172 279.327 64.5283L279.984 65.4365C298.09 90.6573 308.75 121.582 308.75 155C308.75 239.914 239.914 308.75 155 308.75C70.0862 308.75 1.25 239.914 1.25 155C1.25 122.104 11.5792 91.6244 29.1719 66.623L30.0156 65.4365C57.9201 26.5658 103.504 1.25 155 1.25Z"
            stroke="white"
            strokeWidth="2.5"
            className="circle-path"
          />
          <line
            y1="323.75"
            x2="310"
            y2="323.75"
            stroke="white"
            strokeWidth="2.5"
            className="bottom-line"
          />
          <rect
            x="65.25"
            y="68.25"
            width="179.5"
            height="48.5"
            stroke="white"
            strokeWidth="2.5"
            className="rect-1"
          />
          <rect
            x="65.25"
            y="130.25"
            width="179.5"
            height="48.5"
            stroke="white"
            strokeWidth="2.5"
            className="rect-2"
          />
          <rect
            x="65.25"
            y="192.25"
            width="179.5"
            height="48.5"
            stroke="white"
            strokeWidth="2.5"
            className="rect-3"
          />
        </svg>
      </div>

      <div className="hero-overlay">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-subtitle animate-fade-up">
                Имабари — Мягкая полотенца
              </p>
              <div className="hero-title">
                <div className="animate-fade-up delay-1">
                  Мягкая вода бережно относится к пряже,
                </div>
                <div className="animate-fade-up delay-2">
                  подчёркивая естественную мягкость хлопка.
                </div>
              </div>
            </div>
          </div>
          <div className="hero-indicators">
            <div className="indicator indicator-001 active">
              001
              <svg
                className="progress-ring"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1"
                  strokeDasharray={`${2 * Math.PI * 14}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 14 * (1 - progress / 100)
                  }`}
                  transform="rotate(-90 16 16)"
                  className="progress-circle"
                />
              </svg>
            </div>
            <div className="indicator indicator-002">002</div>
            <div className="indicator indicator-003">003</div>
            <div className="indicator indicator-004">004</div>
          </div>
        </div>
      </div>
    </section>
  );
};
const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-subtitle animate-fade-up">Имабари, Эхиме</div>

        <div className="about-content">
          <h2 className="about-title">
            <span className="animate-fade-up delay-1">
              Регион богатый природой.
            </span>
            <br />
            <span className="animate-fade-up delay-2">
              Мягкая вода{" "}
              <span className="icon-water animate-icon">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="21"
                    cy="21"
                    r="20.8"
                    fill="white"
                    stroke="#2C2C2C"
                    strokeWidth="0.4"
                  />
                  <g clipPath="url(#clip0_249_3488)">
                    <path
                      d="M19.7822 33.5797C19.7822 33.5797 21.9994 34.4892 23.7731 32.868C23.7731 32.868 26.4336 29.7442 29.8198 32.433"
                      stroke="#2C2C2C"
                      strokeWidth="0.4"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M22.6372 33.5797C22.6372 33.5797 20.4201 34.4892 18.6464 32.868C18.6464 32.868 15.9858 29.7442 12.5996 32.433"
                      stroke="#2C2C2C"
                      strokeWidth="0.4"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M19.7822 29.2165C19.7822 29.2165 21.9994 30.1259 23.7731 28.5047C23.7731 28.5047 26.4336 25.3809 29.8198 28.0697"
                      stroke="#2C2C2C"
                      strokeWidth="0.4"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M22.6372 29.2165C22.6372 29.2165 20.4201 30.1259 18.6464 28.5047C18.6464 28.5047 15.9858 25.3809 12.5996 28.0697"
                      stroke="#2C2C2C"
                      strokeWidth="0.4"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M19.7822 24.8541C19.7822 24.8541 21.9994 25.7636 23.7731 24.1424C23.7731 24.1424 26.4336 21.0186 29.8198 23.7074"
                      stroke="#2C2C2C"
                      strokeWidth="0.4"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M22.6372 24.8541C22.6372 24.8541 20.4201 25.7636 18.6464 24.1424C18.6464 24.1424 15.9858 21.0186 12.5996 23.7074"
                      stroke="#2C2C2C"
                      strokeWidth="0.4"
                      strokeMiterlimit="10"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.4905 18.639C14.8289 18.639 13.4819 17.292 13.4819 15.6305C13.4819 14.2135 14.4615 13.0253 15.7804 12.7062C16.1087 10.1139 18.3219 8.10938 21.0034 8.10938C23.1634 8.10938 25.0196 9.41015 25.8314 11.2711C27.3885 11.7312 28.5247 13.172 28.5247 14.8781C28.5247 16.9551 26.841 18.6388 24.764 18.6388H16.4905V18.639Z"
                      stroke="#2C2C2C"
                      strokeWidth="0.4"
                      fill="none"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_249_3488">
                      <rect
                        width="27.72"
                        height="27.72"
                        fill="white"
                        transform="translate(35.2798 7.13965) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              , качественная
            </span>
            <br />
            <span className="animate-fade-up delay-3">
              пряжа{" "}
              <span className="icon-yarn animate-icon">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="21"
                    cy="21"
                    r="20.8"
                    fill="white"
                    stroke="#2C2C2C"
                    strokeWidth="0.4"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r="16"
                    stroke="#2C2C2C"
                    strokeWidth="0.4"
                    fill="none"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r="12"
                    stroke="#2C2C2C"
                    strokeWidth="0.4"
                    fill="none"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r="8"
                    stroke="#2C2C2C"
                    strokeWidth="0.4"
                    fill="none"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r="4"
                    stroke="#2C2C2C"
                    strokeWidth="0.4"
                    fill="none"
                  />
                  <circle cx="21" cy="21" r="2" fill="#2C2C2C" />
                </svg>
              </span>
              , и богатый опыт.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};
const NatureSection = () => {
  return (
    <section className="nature-section">
      <div className="nature-image-bg"></div>

      <div className="nature-overlay">
        <div className="nature-container">
          <div className={`nature-content `}>
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
  const features = [
    {
      id: "water",
      title: "Мягкая вода",
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="21"
            cy="21"
            r="20.8"
            fill="white"
            stroke="#2C2C2C"
            strokeWidth="0.4"
          />
          <g clipPath="url(#clip0_249_3510)">
            <g clipPath="url(#clip1_249_3510)">
              <g clipPath="url(#clip2_249_3510)">
                <path
                  d="M19.7822 33.5817C19.7822 33.5817 21.9994 34.4911 23.7731 32.8699C23.7731 32.8699 26.4336 29.7461 29.8198 32.435"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  strokeMiterlimit="10"
                />
                <path
                  d="M22.6372 33.5817C22.6372 33.5817 20.4201 34.4911 18.6464 32.8699C18.6464 32.8699 15.9858 29.7461 12.5996 32.435"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  strokeMiterlimit="10"
                />
                <path
                  d="M19.7822 29.2184C19.7822 29.2184 21.9994 30.1279 23.7731 28.5067C23.7731 28.5067 26.4336 25.3828 29.8198 28.0717"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  strokeMiterlimit="10"
                />
                <path
                  d="M22.6372 29.2184C22.6372 29.2184 20.4201 30.1279 18.6464 28.5067C18.6464 28.5067 15.9858 25.3828 12.5996 28.0717"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  strokeMiterlimit="10"
                />
                <path
                  d="M19.7822 24.8571C19.7822 24.8571 21.9994 25.7665 23.7731 24.1453C23.7731 24.1453 26.4336 21.0215 29.8198 23.7104"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  strokeMiterlimit="10"
                />
                <path
                  d="M22.6372 24.8571C22.6372 24.8571 20.4201 25.7665 18.6464 24.1453C18.6464 24.1453 15.9858 21.0215 12.5996 23.7104"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  strokeMiterlimit="10"
                />

                <path
                  d="M16.4905 18.641C14.8289 18.641 13.4819 17.294 13.4819 15.6324C13.4819 14.2155 14.4615 13.0273 15.7804 12.7082C16.1087 10.1159 18.3219 8.11133 21.0034 8.11133C23.1634 8.11133 25.0196 9.4121 25.8314 11.2731C27.3885 11.7331 28.5247 13.1739 28.5247 14.8801C28.5247 16.9571 26.841 18.6408 24.764 18.6408C24.764 18.6408 24.764 18.6408 24.764 18.6408V18.6413H16.4905V18.641Z"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  fill="none"
                />
              </g>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_249_3510">
              <rect
                width="27.72"
                height="27.72"
                fill="white"
                transform="translate(35.2798 7.14062) rotate(90)"
              />
            </clipPath>
            <clipPath id="clip1_249_3510">
              <rect
                width="27.72"
                height="27.72"
                fill="white"
                transform="translate(35.2798 7.14062) rotate(90)"
              />
            </clipPath>
            <clipPath id="clip2_249_3510">
              <rect
                width="27.72"
                height="27.72"
                fill="white"
                transform="translate(35.2798 7.14062) rotate(90)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
      description: `Подземные воды реки Соджагава — вода которая бережно относится к пряже и материалу полотенца и позволяет получить нежные и яркие цвета, подчеркивая естественную мягкость используемого хлопка`,
      image: backgroundSeven,
    },
    {
      id: "experience",
      title: "Богатый опыт",
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="21"
            cy="21"
            r="20.8"
            fill="white"
            stroke="#2C2C2C"
            strokeWidth="0.4"
          />
          <g clipPath="url(#clip0_249_4701)">
            <g clipPath="url(#clip1_249_4701)">
              <g clipPath="url(#clip2_249_4701)">
                <path
                  d="M20.9876 7.68611C16.3996 7.6861 12.6802 11.4054 12.6802 15.9934C12.6802 20.5815 16.3996 24.3008 20.9876 24.3008C25.5756 24.3008 29.2949 20.5815 29.2949 15.9934C29.2949 11.4054 25.5756 7.68611 20.9876 7.68611Z"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  strokeMiterlimit="10"
                />
                <path
                  d="M25.8079 16.231C21.2199 16.231 17.5006 19.9503 17.5006 24.5384C17.5006 29.1264 21.2199 32.8457 25.8079 32.8457C30.3959 32.8457 34.1152 29.1264 34.1152 24.5384C34.1152 19.9504 30.3959 16.231 25.8079 16.231Z"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  strokeMiterlimit="10"
                />
                <path
                  d="M16.1922 16.231C11.6042 16.231 7.88484 19.9503 7.88484 24.5384C7.88484 29.1264 11.6042 32.8457 16.1922 32.8457C20.7802 32.8457 24.4995 29.1264 24.4995 24.5384C24.4995 19.9504 20.7802 16.231 16.1922 16.231Z"
                  stroke="#2C2C2C"
                  strokeWidth="0.4"
                  strokeMiterlimit="10"
                />
              </g>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_249_4701">
              <rect
                width="27.72"
                height="27.72"
                fill="white"
                transform="translate(7.14014 7.14062)"
              />
            </clipPath>
            <clipPath id="clip1_249_4701">
              <rect
                width="27.72"
                height="27.72"
                fill="white"
                transform="translate(7.14014 7.14062)"
              />
            </clipPath>
            <clipPath id="clip2_249_4701">
              <rect
                width="27.72"
                height="27.72"
                fill="white"
                transform="translate(7.14014 7.14062)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
      description: `Различные ремесленные навыки можно увидеть в деталях каждого этапа производства полотенца, включая обработку пряжи, ткачество, состав красителя и уникальную технику Sakizarashi Sakizome`,
      image: backgroundSix,
    },
    {
      id: "standards",
      title: "Стандарты",
      icon: (
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="21"
            cy="21"
            r="20.8"
            fill="white"
            stroke="#2C2C2C"
            strokeWidth="0.4"
          />
          <rect
            x="11.1199"
            y="11.1199"
            width="19.76"
            height="19.76"
            stroke="#2C2C2C"
            strokeWidth="0.4"
          />
          <path
            d="M21.0002 14.2807C17.2889 14.2807 14.2802 17.2893 14.2802 21.0007C14.2802 24.7121 17.2889 27.7207 21.0002 27.7207C24.7116 27.7207 27.7202 24.7121 27.7202 21.0007C27.7202 17.2894 24.7116 14.2807 21.0002 14.2807Z"
            stroke="#2C2C2C"
            strokeWidth="0.4"
            strokeMiterlimit="10"
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
        <div className="description-content">
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

        <div className="features-grid">
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
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductsSection = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Towel");
  const [selectedColor, setSelectedColor] = useState("white");
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: "Imabari Cotton Towel",
      price: "5.000 ₽",
      color: "white",
      image: whiteImage,
      additionalImages: [whiteBathOne, whiteBathTwo],
      description:
        "Подземные воды реки Соджагава, богатая п рирода региона — все это способствует качеству производства, что было замечено издавна.",
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
        <div className={`products-header`}>
          <h2 className="products-title">Продукция Imabari</h2>

          <div className="products-tabs">
            <button className="tab-button active">Полотенца</button>
            <button className="tab-button">Для дома</button>
            <button className="tab-button">Аксессуары / Одежда</button>
          </div>
        </div>

        <div className={`hero-images`}>
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

        <div className={`products-grid `}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
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

        <div className={`products-pagination `}>
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
                    >
                      Белое
                    </button>
                    <button
                      className={`color-btn green ${
                        selectedColor === "green" ? "active" : ""
                      }`}
                      onClick={() => setSelectedColor("green")}
                      data-color="green"
                    >
                      Серое
                    </button>
                    <button
                      className={`color-btn blue ${
                        selectedColor === "blue" ? "active" : ""
                      }`}
                      onClick={() => setSelectedColor("blue")}
                      data-color="blue"
                    >
                      Синее
                    </button>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ManufacturingSection = () => {
  return (
    <section className="manufacturing-section">
      <div className="manufacturing-image-container">
        <div className="manufacturing-image-bg"></div>
        <div className="manufacturing-overlay">
          <div className="manufacturing-container">
            <div className="geometric-shape">
              <svg
                width="201"
                height="210"
                viewBox="0 0 201 210"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="99.25"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <rect
                  x="100"
                  y="9.82043"
                  width="127.532"
                  height="127.532"
                  transform="rotate(45 100 9.82043)"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <line
                  x1="1"
                  y1="209.25"
                  x2="201"
                  y2="209.25"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="manufacturing-content">
        <div className="manufacturing-text-container">
          <div className="info-card">
            <h3 className="info-title">
              200 производителей
              <span className="title-icon">⌃</span>
            </h3>
            <p className="info-description">
              Сейчас на производственной площадке находится почти 200 фабрик,
              которые
              <br />
              крутят пряжу, красят пряжу, изготавливают полотенца.
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
          <div className={`news-header`}>
            <h2 className="news-title">Следите за нашим развитием</h2>
            <p className="news-subtitle">
              Новости компании Imabari — это наша текущая история.
            </p>
          </div>

          <div className={`news-list  `}>
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

const NewsModal = ({ isOpen, onClose, newsItem }) => {
  if (!isOpen || !newsItem) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-simple" onClick={onClose}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2421 13.2422L4.75687 4.75691"
              stroke="#2C2C2C"
              strokeLinecap="square"
            />
            <path
              d="M13.2421 4.75684L4.75687 13.2421"
              stroke="#2C2C2C"
              strokeLinecap="square"
            />
          </svg>
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

          <div className="news-modal-text">
            <p>
              Имабари, Эхиме — Мекка полотенец, которая продолжает производить
              их уже более 130 лет. На этой большой производственной площадке
              находится почти 200 фабрик, которые крутят пряжу, красят пряжу,
              изготавливают полотенца и т. д.
            </p>

            <p>
              Кроме того, район рядом с Внутренним морем Сето богат природой и в
              последнее время хорошо известен как город, где мостик Симанами
              Кайдо пересекает пролив. Все больше людей наслаждаются здесь
              велопутешествиями.
            </p>
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
            <div className="history-modal-icon">
              <svg width="50" height="52" viewBox="0 0 220 231" fill="none">
                <path
                  d="M110 1.25C145.855 1.25 177.658 18.6007 197.47 45.3691L198.404 46.6504C211.21 64.4894 218.75 86.3625 218.75 110C218.75 170.061 170.061 218.75 110 218.75C49.939 218.75 1.25 170.061 1.25 110C1.25 86.7319 8.55652 65.174 21 47.4902L21.5957 46.6504C41.3336 19.1555 73.576 1.25 110 1.25Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <line
                  y1="229.395"
                  x2="220"
                  y2="229.395"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <rect
                  x="70.0889"
                  y="160.218"
                  width="79.8226"
                  height="18.7903"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <rect
                  x="70.0889"
                  y="41.7017"
                  width="79.8226"
                  height="18.7903"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M110 70.7983C87.9474 70.7983 70.0889 88.5187 70.0889 110.355C70.089 132.191 87.9474 149.912 110 149.912C132.052 149.912 149.911 132.191 149.911 110.355C149.911 88.5188 132.053 70.7984 110 70.7983Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

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
              Имабари, Эхиме — Мекка полотенец, которая продолжает производить
              их уже более 130 лет. На этой большой производственной площадке
              находится почти 200 фабрик, которые крутят пряжу, красят пряжу,
              изготавливают полотенца и т. д. Кроме того, район рядом с
              Внутренним морем Сэто богат природой и в последнее время хорошо
              известен как город, где мосты Симанами Кайдо пересекают пролив.
              Все больше людей наслаждаются здесь велоспортом.
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
                  Сейчас на производственной площадке находится почти 200
                  фабрик, которые крутят пряжу, красят пряжу, изготавливают
                  полотенца.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const CartModal = ({ isOpen, onClose, cartItems, onClearCart, onCheckout }) => {
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
            <div className="cart-title-section">
              <h2 className="cart-title">Корзина</h2>
              <span className="cart-count">{totalQuantity} товара</span>
            </div>
            <button className="clear-cart-btn" onClick={onClearCart}>
              Очистить корзину
            </button>
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

                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">
                      {item.price.toLocaleString()} ₽
                    </p>
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
            <p className="payment-status-subtitle">Оплачивать опять не нужно</p>

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
