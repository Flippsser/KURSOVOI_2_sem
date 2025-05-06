document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переменных
    const burgerMenus = document.querySelectorAll('[id^="burger-menu"]');
    const movieCards = document.querySelectorAll('.movie-card');
    const bookingButtons = document.querySelectorAll('.movie__btn--book');
    const bookSubmitButton = document.querySelector('.booking__submit');
    const mainDetailsButton = document.querySelector('.main__btn');
    
    // Создаем мобильное меню
    const body = document.body;
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    mobileMenu.innerHTML = `
        <div class="mobile-menu__container">
            <div class="mobile-menu__close">&times;</div>
            <nav class="mobile-menu__nav">
                <a href="index.html" class="mobile-menu__link">Главная</a>
                <a href="posters.html" class="mobile-menu__link">Афиша</a>
                <a href="price.html" class="mobile-menu__link">Цены</a>
                <a href="about.html" class="mobile-menu__link">О Нас</a>
            </nav>
        </div>
    `;
    body.appendChild(mobileMenu);
    
    // Обработчик закрытия мобильного меню
    const menuCloseBtn = document.querySelector('.mobile-menu__close');
    menuCloseBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        body.classList.remove('lock');
    });
    
    // Обработчики для меню-бургера
    burgerMenus.forEach(burger => {
        burger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            body.classList.add('lock');
        });
    });
    
    // Обработчики для карточек фильмов
    if (movieCards) {
        // Сопоставление названия фильма и трейлера
        const movieTrailers = {
            'интерстеллар': 'https://www.youtube.com/watch?v=m2vijtILDuk',
            'чужой': 'https://www.youtube.com/watch?v=-BGDJGU-INg',
            '1 + 1': 'https://www.youtube.com/watch?v=hXLcGFp65gI',
            'Лёд 3': 'https://www.youtube.com/watch?v=JnI__lj4peQ',
            'Социальная сеть': 'https://www.youtube.com/watch?v=54izAMhnj0c',
            'Сто лет тому вперёд': 'https://www.youtube.com/watch?v=-0iEKdxvafo',
            'Гран Туризмо': 'https://www.youtube.com/watch?v=DudTSlEFwgY',
            'Вызов': 'https://www.youtube.com/watch?v=PKBKmaOFlsg',
            'Холоп. Великолепный век': 'https://www.youtube.com/watch?v=7uq0SNcAx8o',
            'Проект X: Дорвались': 'https://www.youtube.com/watch?v=FIZTw7iKtoA',
            'Парк юрского периода': 'https://www.youtube.com/watch?v=BDya2mYFupM',
            'Салют-7': 'https://www.youtube.com/watch?v=gUSJdqnlwNc'
        };
        movieCards.forEach(card => {
            card.addEventListener('click', () => {
                const movieTitle = card.querySelector('.movie-card__title').textContent;
                const movieImage = card.querySelector('img').getAttribute('src');
                // Сохраняем информацию о фильме в localStorage
                localStorage.setItem('selectedMovieTitle', movieTitle);
                localStorage.setItem('selectedMovieImage', movieImage);
                // Сохраняем трейлер
                if (movieTrailers[movieTitle]) {
                    localStorage.setItem('selectedMovieTrailer', movieTrailers[movieTitle]);
                } else {
                    localStorage.removeItem('selectedMovieTrailer');
                }
                // Перенаправляем на страницу фильма
                window.location.href = 'movie.html';
            });
        });
    }
    
    // Если это страница фильма, загружаем информацию о выбранном фильме
    if (document.getElementById('movie-page')) {
        const movieTitle = localStorage.getItem('selectedMovieTitle');
        const movieImage = localStorage.getItem('selectedMovieImage');
        
        if (movieTitle && movieImage) {
            const moviePageImage = document.querySelector('.movie__image img');
            
            moviePageImage.setAttribute('src', movieImage);
            moviePageImage.setAttribute('alt', movieTitle);
        }
    }
    
    // Обработчики для кнопок бронирования
    if (bookingButtons) {
        bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем всплытие события
                
                // Получаем информацию о фильме для бронирования
                const moviePage = document.getElementById('movie-page');
                const movieTitle = moviePage.querySelector('.movie__image img').getAttribute('alt');
                const movieImage = moviePage.querySelector('.movie__image img').getAttribute('src');
                
                // Сохраняем информацию о фильме в localStorage
                localStorage.setItem('bookingMovieTitle', movieTitle);
                localStorage.setItem('bookingMovieImage', movieImage);
                
                // Перенаправляем на страницу бронирования
                window.location.href = 'booking.html';
            });
        });
    }
    
    // Если это страница бронирования, загружаем информацию о фильме и генерируем места
    if (document.getElementById('booking-page')) {
        const movieTitle = localStorage.getItem('bookingMovieTitle');
        const movieImage = localStorage.getItem('bookingMovieImage');
        
        if (movieTitle && movieImage) {
            const bookingMovieImage = document.querySelector('.booking__movie-image img');
            const bookingMovieTitle = document.querySelector('.booking__movie-title');
            
            bookingMovieImage.setAttribute('src', movieImage);
            bookingMovieImage.setAttribute('alt', movieTitle);
            bookingMovieTitle.textContent = movieTitle;
        }
        
        // Генерируем места в зале
        generateSeats();
    }
    
    // Генерация мест в зале
    function generateSeats() {
        const seatsContainer = document.querySelector('.booking__seats-rows');
        if (!seatsContainer) return;
        
        seatsContainer.innerHTML = ''; // Очищаем контейнер
        
        // Генерируем 6 рядов по 13 мест
        for (let row = 1; row <= 6; row++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('booking__seats-row');
            rowElement.style.display = 'flex';
            rowElement.style.justifyContent = 'center';
            rowElement.style.gap = '10px';
            
            // Номер ряда
            const rowNumber = document.createElement('div');
            rowNumber.textContent = row;
            rowNumber.style.marginRight = '10px';
            rowNumber.style.width = '20px';
            rowNumber.style.textAlign = 'center';
            rowElement.appendChild(rowNumber);
            
            for (let seat = 1; seat <= 13; seat++) {
                const seatElement = document.createElement('div');
                seatElement.classList.add('booking__seat');
                
                // Рандомно определяем занятые места (25% вероятность)
                if (Math.random() < 0.25) {
                    seatElement.classList.add('booking__seat--occupied');
                } else {
                    seatElement.classList.add('booking__seat--free');
                    
                    // Обработчик для свободных мест
                    seatElement.addEventListener('click', () => {
                        seatElement.classList.toggle('booking__seat--selected');
                    });
                }
                
                // Добавляем атрибуты для идентификации места
                seatElement.setAttribute('data-row', row);
                seatElement.setAttribute('data-seat', seat);
                
                rowElement.appendChild(seatElement);
            }
            
            seatsContainer.appendChild(rowElement);
        }
    }
    
    // Обработчик для кнопки подтверждения бронирования
    if (bookSubmitButton) {
        bookSubmitButton.addEventListener('click', () => {
            // Собираем данные бронирования
            const selectedSeats = document.querySelectorAll('.booking__seat--selected');
            if (selectedSeats.length === 0) {
                alert('Пожалуйста, выберите хотя бы одно место');
                return;
            }

            // Исправленный выбор значений из dropdown
            const dropdownSpans = document.querySelectorAll('.booking__dropdown-selected span');
            const cinemaDropdown = dropdownSpans[1]; // второй dropdown — кинотеатр
            const timeDropdown = dropdownSpans[2];   // третий dropdown — время
            const movieTitle = document.querySelector('.booking__movie-title').textContent;

            localStorage.setItem('confirmationCinema', cinemaDropdown.textContent === 'Кинотеатр' ? 'Star Cinema' : cinemaDropdown.textContent);
            localStorage.setItem('confirmationTime', timeDropdown.textContent === 'время' ? '18:30' : timeDropdown.textContent);
            localStorage.setItem('confirmationMovie', movieTitle);

            // Перенаправляем на страницу подтверждения
            window.location.href = 'confirmation.html';
        });
    }
    
    // Если это страница подтверждения, загружаем данные бронирования
    if (document.getElementById('booking-confirmation-page')) {
        const cinema = localStorage.getItem('confirmationCinema');
        const time = localStorage.getItem('confirmationTime');
        const movie = localStorage.getItem('confirmationMovie');
        
        if (cinema) document.getElementById('confirmation-cinema').textContent = cinema;
        if (time) document.getElementById('confirmation-time').textContent = time;
        if (movie) document.getElementById('confirmation-movie').textContent = movie;
    }
    
    // Обработчик для кнопки "Подробнее" на главной странице
    if (mainDetailsButton) {
        mainDetailsButton.addEventListener('click', () => {
            // Всегда переходить на фильм 'Социальная сеть'
            localStorage.setItem('selectedMovieTitle', 'Социальная сеть');
            localStorage.setItem('selectedMovieImage', 'assets/images/social.jpg');
            window.location.href = 'movie.html';
        });
    }
    
    // Обработчики для лого - возврат на главную страницу
    const logoElements = document.querySelectorAll('.header__logo');
    if (logoElements) {
        logoElements.forEach(logo => {
            logo.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        });
    }
    
    // Добавляем обработчики для выпадающих списков
    document.addEventListener('click', function(e) {
        const dropdown = e.target.closest('.booking__dropdown-selected');
        if (!dropdown) return;

        // Удаляем все открытые dropdown-меню
        document.querySelectorAll('.booking__dropdown-content').forEach(el => el.remove());

        const parentDropdown = dropdown.closest('.booking__dropdown');
        // Определяем тип дропдауна по индексу секции
        const section = parentDropdown.closest('.booking__section');
        const allSections = Array.from(document.querySelectorAll('.booking__section'));
        const sectionIndex = allSections.indexOf(section);

        let options = [];
        if (sectionIndex === 0) { // Фильм
            options = [
                'интерстеллар',
                'чужой',
                '1 + 1',
                'Лёд 3',
                'Социальная сеть',
                'Сто лет тому вперёд',
                'Гран Туризмо',
                'Вызов',
                'Холоп. Великолепный век',
                'Проект X: Дорвались',
                'Парк юрского периода',
                'Салют-7'
            ];
        } else if (sectionIndex === 1) { // Кинотеатр
            options = ['Star Cinema Центральный', 'Star Cinema Западный', 'Star Cinema Южный'];
        } else if (sectionIndex === 2) { // Время
            options = ['10:00', '12:30', '15:00', '18:30', '21:00'];
        }

        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('booking__dropdown-content', 'booking__dropdown-options', 'active');

        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.textContent = option;
            optionElement.className = 'booking__dropdown-option';
            optionElement.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdown.querySelector('span').textContent = option;
                dropdownContent.remove();
                if (sectionIndex === 0) {
                    updateMovieImageOnSelect(option);
                }
            });
            dropdownContent.appendChild(optionElement);
        });

        parentDropdown.appendChild(dropdownContent);

        // Закрытие dropdown по клику вне его
        setTimeout(() => {
            function closeDropdown(e) {
                if (!dropdown.contains(e.target) && !dropdownContent.contains(e.target)) {
                    dropdownContent.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            }
            document.addEventListener('click', closeDropdown);
        }, 0);
    });
    
    // Функция для обновления изображения фильма при выборе из выпадающего списка
    function updateMovieImageOnSelect(movieTitle) {
        // Определяем изображение для выбранного фильма
        let imageSrc = '';
        if (movieTitle === 'интерстеллар') {
            imageSrc = 'assets/images/interstellar.jpg';
        } else if (movieTitle === 'чужой') {
            imageSrc = 'assets/images/alien.jpg';
        } else if (movieTitle === '1 + 1') {
            imageSrc = 'assets/images/oneplus.jpg';
        } else if (movieTitle === 'Лёд 3') {
            imageSrc = 'assets/images/ice3.jpg';
        } else if (movieTitle === 'Социальная сеть') {
            imageSrc = 'assets/images/social.jpg';
        } else if (movieTitle === 'Сто лет тому вперёд') {
            imageSrc = 'assets/images/hundred.jpg';
        } else if (movieTitle === 'Гран Туризмо') {
            imageSrc = 'assets/images/granturismo.jpg';
        } else if (movieTitle === 'Вызов') {
            imageSrc = 'assets/images/vyzov.jpg';
        } else if (movieTitle === 'Холоп. Великолепный век') {
            imageSrc = 'assets/images/holop.jpg';
        } else if (movieTitle === 'Проект X: Дорвались') {
            imageSrc = 'assets/images/projectx.jpg';
        } else if (movieTitle === 'Парк юрского периода') {
            imageSrc = 'assets/images/jurrasic.jpg';
        } else if (movieTitle === 'Салют-7') {
            imageSrc = 'assets/images/salyut.jpg';
        }
        if (imageSrc) {
            const bookingMovieImage = document.querySelector('.booking__movie-image img');
            const bookingMovieTitle = document.querySelector('.booking__movie-title');
            bookingMovieImage.setAttribute('src', imageSrc);
            bookingMovieTitle.textContent = movieTitle;
        }
    }

    // Динамическая генерация постеров из XML на странице афиши
    if (document.getElementById('poster-page')) {
        const xmlScript = document.getElementById('movie-posters-xml');
        const postersContainer = document.getElementById('posters-container');
        if (xmlScript && postersContainer) {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlScript.textContent, 'application/xml');
            const movies = Array.from(xml.querySelectorAll('movie'));
            // Группируем по 3 фильма в строку
            for (let i = 0; i < movies.length; i += 3) {
                const row = document.createElement('div');
                row.className = 'posters__row';
                movies.slice(i, i + 3).forEach(movie => {
                    const card = document.createElement('div');
                    card.className = 'movie-card';
                    card.innerHTML = `
                        <div class="movie-card__image">
                            <img src="${movie.querySelector('image').textContent}" alt="${movie.querySelector('title').textContent}">
                        </div>
                        <div class="movie-card__title">${movie.querySelector('title').textContent}</div>
                    `;
                    // Обработчик клика для перехода на страницу фильма
                    card.addEventListener('click', () => {
                        localStorage.setItem('selectedMovieTitle', movie.querySelector('title').textContent);
                        localStorage.setItem('selectedMovieImage', movie.querySelector('image').textContent);
                        const trailer = movie.querySelector('trailer') ? movie.querySelector('trailer').textContent : '';
                        localStorage.setItem('selectedMovieTrailer', trailer);
                        window.location.href = 'movie.html';
                    });
                    row.appendChild(card);
                });
                postersContainer.appendChild(row);
            }
        }
    }

    // На странице movie.html: кнопка 'Видео' открывает трейлер во всплывающем iframe
    if (document.getElementById('movie-page')) {
        const trailer = localStorage.getItem('selectedMovieTrailer');
        const videoBtn = document.querySelector('.movie__btn--video');
        if (videoBtn && trailer) {
            videoBtn.addEventListener('click', function() {
                // Если уже открыт трейлер — не добавлять второй раз
                if (document.getElementById('movie-trailer-modal')) return;
                // Создаём модальное окно с iframe
                const modal = document.createElement('div');
                modal.id = 'movie-trailer-modal';
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100vw';
                modal.style.height = '100vh';
                modal.style.background = 'rgba(0,0,0,0.85)';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.zIndex = '9999';
                modal.innerHTML = `
                    <div style="position:relative;max-width:90vw;max-height:80vh;width:800px;height:450px;">
                        <iframe src="${trailer.replace('watch?v=', 'embed/')}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay"></iframe>
                        <button id="close-trailer-modal" style="position:absolute;top:-40px;right:0;font-size:32px;background:none;border:none;color:#fff;cursor:pointer;">&times;</button>
                    </div>
                `;
                document.body.appendChild(modal);
                document.getElementById('close-trailer-modal').onclick = () => modal.remove();
                // Закрытие по клику вне iframe
                modal.addEventListener('click', e => {
                    if (e.target === modal) modal.remove();
                });
            });
        }
    }
});