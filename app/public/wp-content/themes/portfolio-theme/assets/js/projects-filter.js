/**
 * Alina Trefelova Portfolio
 * © 2026 Alina Trefelova. All rights reserved.
 * Author: Alina Trefelova / ATcode
 * 
 * Скрипт фильтрации проектов. Отвечает за живой поиск по технологиям,
 * фильтрацию по категориям (кнопки фильтра) и динамическое обновление порядковых номеров карточек проектов.
 */

document.addEventListener('DOMContentLoaded', () => {
    init_projects_filter();
});

/**
 * Инициализирует функционал фильтрации и поиска проектов на странице.
 * 
 * @returns {void}
 */
function init_projects_filter() {
    const search_form = document.querySelector('.hero-search-form');
    const search_input = document.querySelector('.hero-search-input');
    const filter_btns = document.querySelectorAll('.hero-filters .filter-btn');
    const project_cards = document.querySelectorAll('.project-card');
    const empty_section = document.querySelector('.empty-page-section');
    const projects_section = document.querySelector('.projects-grid');

    let active_filter_value = 'all';
    let search_query = '';

    if (search_form) {
        search_form.addEventListener('submit', (e) => e.preventDefault());
    }

    filter_btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const current_active = document.querySelector('.hero-filters .filter-btn.active');
            if (current_active) {
                current_active.classList.remove('active');
            }

            btn.classList.add('active');

            active_filter_value = (btn.getAttribute('data-filter') || 'all').toLowerCase();

            filter_projects();
        });
    });

    if (search_input) {
        search_input.addEventListener('input', (e) => {
            search_query = e.target.value.toLowerCase().trim();
            filter_projects();
        });
    }

    /**
     * Фильтрует карточки проектов на основе выбранной категории и поискового запроса.
     * 
     * @returns {void}
     */
    function filter_projects() {
        project_cards.forEach(card => {
            const card_tech = (card.getAttribute('data-tech') || '').toLowerCase();
            const card_type = (card.getAttribute('data-type') || '').toLowerCase();

            const matches_filter = (active_filter_value === 'all') || 
                                  card_type.includes(active_filter_value) || 
                                  card_tech.includes(active_filter_value);

            const matches_search = !search_query || card_tech.includes(search_query);

            if (matches_filter && matches_search) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }
        });

        update_card_numbers();
    }

    /**
     * Динамически обновляет порядковые номера видимых карточек проектов
     * управляет отображением сноски сетки и empty-страницей.
     * 
     * @returns {void}
     */
    function update_card_numbers() {
        const visible_cards = document.querySelectorAll('.project-card:not(.is-hidden)');

        const note_element = document.querySelector('.projects-grid-note');
        if (note_element) {
            if (visible_cards.length < 2) {
                note_element.style.display = 'none';
            } else {
                note_element.style.display = '';
            }
        }

        if (empty_section) {
            if (visible_cards.length === 0) {
                empty_section.classList.remove('is-hidden');
                projects_section.classList.add('is-hidden');
            } else {
                empty_section.classList.add('is-hidden');
                projects_section.classList.remove('is-hidden');
            }
        }

        visible_cards.forEach((card, index) => {
            const formatted_number = String(index + 1).padStart(2, '0');
            
            const number_span = card.querySelector('.project-card-number span');
            
            if (number_span) {
                const underline_svg = number_span.querySelector('.number-underline');
                
                number_span.innerHTML = formatted_number;
                if (underline_svg) {
                    number_span.appendChild(underline_svg);
                }
            }
        });
    }

    update_card_numbers();
}
