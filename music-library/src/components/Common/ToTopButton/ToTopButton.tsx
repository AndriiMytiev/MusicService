import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

export const ToTopButton = observer(() => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const yOffset = window.pageYOffset;

    // Встановлюємо видимість кнопки в залежності від значення yOffset
    setIsVisible(yOffset > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Додає плавність прокрутки
    });
  };

  useEffect(() => {
    // Додаємо прослуховувач подій для визначення, коли прокручується сторінка
    window.addEventListener("scroll", handleScroll);

    // Видаляємо прослуховувач подій під час знешкодження компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`ToTopButton ${isVisible ? "visible" : ""}`}>
      <p onClick={scrollToTop}>↑</p>
    </div>
  );
});
