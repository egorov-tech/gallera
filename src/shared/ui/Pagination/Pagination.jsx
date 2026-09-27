import React from 'react';
import './Pagination.css';

/**
 * Компонент пагинации
 * @param {Object} props - Свойства компонента
 * @param {number} props.currentPage - Текущая страница
 * @param {number} props.totalPages - Общее количество страниц
 * @param {Function} props.onPageChange - Обработчик изменения страницы
 */
export const Pagination = ({ currentPage, totalPages = 5, onPageChange }) => {
    return (
        <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
                <li 
                    key={index} 
                    className={currentPage === index + 1 ? 'active' : ''} 
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </li>
            ))}
        </ul>
    );
};
