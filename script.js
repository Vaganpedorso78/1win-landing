// Когда страница загружена
document.addEventListener('DOMContentLoaded', function() {
    console.log('1WIN сайт загружен');
    
    // 1. Копирование промокода
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const promoInput = this.closest('.promo-input-group').querySelector('.promo-input') ||
                             this.closest('.cta-promo').querySelector('.cta-input');
            const promoCode = promoInput.value;
            
            // Копируем в буфер обмена
            navigator.clipboard.writeText(promoCode).then(() => {
                // Показываем подтверждение
                const originalText = this.textContent;
                this.textContent = 'Скопировано!';
                this.style.background = '#10b981';
                
                // Возвращаем обратно через 2 секунды
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования:', err);
                // Fallback для старых браузеров
                promoInput.select();
                document.execCommand('copy');
                
                const originalText = this.textContent;
                this.textContent = 'Скопировано!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
    
    // 2. Таймер обратного отсчета
    function updateTimer() {
        const timerElements = document.querySelectorAll('.timer');
        timerElements.forEach(timer => {
            let time = timer.textContent.split(':');
            let minutes = parseInt(time[0]);
            let seconds = parseInt(time[1]);
            
            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    // Таймер завершен
                    timer.textContent = '00:00';
                    return;
                }
            }
            
            // Форматируем время
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
        });
    }
    
    // Запускаем таймер каждую секунду
    setInterval(updateTimer, 1000);
    
    // 3. Бургер меню для мобильных
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    
    if (burgerMenu && nav) {
        burgerMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Анимация бургера
            const spans = this.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const spans = burgerMenu.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // 4. FAQ аккордеон
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Закрываем все открытые вопросы
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Если текущий вопрос не был открыт - открываем его
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // 5. Анимация при прокрутке
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.step-card, .bonus-card, .slot-card, .review-card');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Добавляем классы для анимации
    document.querySelectorAll('.step-card, .bonus-card, .slot-card, .review-card').forEach(card => {
        card.classList.add('reveal');
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Запускаем сразу
    
    // 6. Кнопки "Играть" в слотах
    document.querySelectorAll('.btn-slot').forEach(button => {
        button.addEventListener('click', function() {
            const slotName = this.closest('.slot-card').querySelector('h3').textContent;
            alert(`🎰 Игра "${slotName}" скоро будет доступна!\nСначала получи бонус и зарегистрируйся на 1WIN.`);
        });
    });
    
    // 7. Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 8. Обновление статистики (фейковая)
    function updateStats() {
        const onlineElement = document.querySelector('.stat-number:first-child');
        if (onlineElement) {
            const current = parseInt(onlineElement.textContent.replace(',', ''));
            const change = Math.floor(Math.random() * 100) - 50; // От -50 до +50
            const newValue = Math.max(1000, current + change);
            onlineElement.textContent = newValue.toLocaleString();
        }
    }
    
    // Обновляем статистику каждые 10 секунд
    setInterval(updateStats, 10000);
    
    // 9. Эффект наведения на карточки
    document.querySelectorAll('.slot-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
