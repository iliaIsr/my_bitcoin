import React from 'react';
import './Loader.css'; // Создайте файл стилей для крутилки

export const Loader = () => {
    return (
        <div className="loader">
            {/* Здесь можно использовать CSS-анимацию или изображение для крутилки */}
            <div className="spinner"></div>
        </div>
    );
};
