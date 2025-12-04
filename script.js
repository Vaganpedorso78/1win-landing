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

// ===== SOCIAL PROOF FUNCTIONALITY =====

// Анимированный счетчик чисел
function animateCounters() {
    const counters = document.querySelectorAll('.proof-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.includes('%') ? '%' : 
                      counter.textContent.includes('+') ? '+' : '';
        
        let start = 0;
        const duration = 2000; // 2 секунды
        const increment = target / (duration / 16); // 60fps
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                let displayValue = suffix === '%' ? 
                    Math.floor(start * 10) / 10 : // для процентов один знак после запятой
                    Math.floor(start).toLocaleString();
                
                counter.textContent = displayValue + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + suffix;
            }
        };
        
        // Запускаем анимацию при появлении в viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Live выплаты
function initLivePayments() {
    const feed = document.getElementById('paymentsFeed');
    if (!feed) return;
    
    const users = [
        { name: 'Александр П.', avatar: 'АП', amount: '+42,850₽', game: 'Gates of Olympus', time: '2 мин назад', type: 'success' },
        { name: 'Мария К.', avatar: 'МК', amount: '+28,300₽', game: 'Sweet Bonanza', time: '5 мин назад', type: 'success' },
        { name: 'Дмитрий С.', avatar: 'ДС', amount: '+15,750₽', game: 'Crazy Time', time: '8 мин назад', type: 'warning' },
        { name: 'Светлана В.', avatar: 'СВ', amount: '+96,200₽', game: 'Mega Wheel', time: '12 мин назад', type: 'success' },
        { name: 'Артем Л.', avatar: 'АЛ', amount: '+33,400₽', game: 'Dice', time: '15 мин назад', type: 'warning' },
        { name: 'Екатерина М.', avatar: 'ЕМ', amount: '+18,900₽', game: 'Mines', time: '18 мин назад', type: 'success' },
        { name: 'Иван Г.', avatar: 'ИГ', amount: '+57,600₽', game: 'Plinko', time: '22 мин назад', type: 'danger' },
        { name: 'Ольга С.', avatar: 'ОС', amount: '+12,350₽', game: 'Aviator', time: '25 мин назад', type: 'success' }
    ];
    
    // Первоначальное заполнение
    users.slice(0, 4).forEach(user => {
        addPaymentItem(user);
    });
    
    // Добавляем новые выплаты каждые 10-20 секунд
    let index = 4;
    setInterval(() => {
        if (index < users.length) {
            addPaymentItem(users[index]);
            index++;
            if (index >= users.length) index = 0;
        }
    }, Math.random() * 10000 + 10000); // 10-20 секунд
}

function addPaymentItem(user) {
    const feed = document.getElementById('paymentsFeed');
    if (!feed) return;
    
    const payment = document.createElement('div');
    payment.className = `payment-item ${user.type}`;
    payment.innerHTML = `
        <div class="payment-user">
            <div class="user-avatar">${user.avatar}</div>
            <div class="payment-info">
                <div class="payment-name">${user.name}</div>
                <div class="payment-game">${user.game}</div>
            </div>
        </div>
        <div class="payment-right">
            <div class="payment-amount">${user.amount}</div>
            <div class="payment-time">${user.time}</div>
        </div>
    `;
    
    feed.prepend(payment);
    
    // Ограничиваем до 6 последних выплат
    if (feed.children.length > 6) {
        feed.removeChild(feed.lastChild);
    }
    
    // Анимация появления
    setTimeout(() => {
        payment.style.animation = 'slideIn 0.5s ease';
    }, 10);
}

// ===== CHAT WIDGET FUNCTIONALITY =====

function initChatWidget() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const optionButtons = document.querySelectorAll('.option-btn');
    
    if (!chatToggle) return;
    
    // База знаний вопрос-ответ
    const knowledgeBase = {
        'Как получить бонус 500%?': `Для получения бонуса 500%:
1. Нажмите кнопку "Получить бонус"
2. Зарегистрируйтесь на сайте 1WIN
3. Введите промокод WIN500 при регистрации
4. Пополните счет на любую сумму
5. Бонус зачислится автоматически! 🎁`,
        
        'Нужна ли верификация?': `Верификация требуется только при:
• Выводе крупных сумм (от 50,000₽)
• Подозрении на мультиаккаунтинг
• Запросе службы безопасности

Обычно для первых выводов до 15,000₽ верификация не требуется. 📋`,
        
        'Сколько времени вывод денег?': `Время вывода зависит от метода:
• Криптовалюта (BTC, ETH): 5-15 минут ⚡
• Электронные кошельки: 15-30 минут
• Банковские карты: 1-24 часа
• Наличные через систему: до 5 минут

Среднее время вывода: 17 минут. ⏱️`,
        
        'Есть ли мобильное приложение?': `Да! Доступны приложения:
• 📱 iOS: в App Store (по региону)
• 🤖 Android: на сайте 1WIN
• 💻 ПК: Windows и Mac версии

Все приложения имеют тот же функционал, что и сайт!`
    };
    
    // Открытие/закрытие чата
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        // Убираем уведомление при открытии
        const notification = chatToggle.querySelector('.chat-notification');
        if (notification) notification.style.display = 'none';
    });
    
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
    
    // Закрытие при клике вне чата
    document.addEventListener('click', (e) => {
        if (!chatToggle.contains(e.target) && !chatWindow.contains(e.target)) {
            chatWindow.classList.remove('active');
        }
    });
    
    // Отправка сообщения
    function sendMessage(text, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const time = new Date().toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Анимация появления
        setTimeout(() => {
            messageDiv.style.animation = 'messageAppear 0.3s ease';
        }, 10);
    }
    
    // Отправка сообщения пользователем
    function sendUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        sendMessage(text, true);
        chatInput.value = '';
        
        // Имитация ответа бота
        setTimeout(() => {
            let response = "Я понял ваш вопрос! К сожалению, сейчас я могу отвечать только на предопределенные вопросы. Пожалуйста, выберите один из вариантов выше или обратитесь в поддержку через Telegram канал. 🤖";
            
            // Проверяем базу знаний
            const lowerText = text.toLowerCase();
            for (const [question, answer] of Object.entries(knowledgeBase)) {
                if (lowerText.includes(question.toLowerCase().split(' ')[0])) {
                    response = answer;
                    break;
                }
            }
            
            sendMessage(response, false);
        }, 1000);
    }
    
    // Обработка кнопок быстрых вопросов
    optionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            sendMessage(question, true);
            
            setTimeout(() => {
                sendMessage(knowledgeBase[question] || "Извините, я не знаю ответа на этот вопрос. Обратитесь в поддержку.", false);
            }, 800);
        });
    });
    
    // Отправка по Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendUserMessage();
        }
    });
    
    // Отправка по клику
    chatSend.addEventListener('click', sendUserMessage);
    
    // Автоматическое приветствие при открытии
    let firstOpen = true;
    chatToggle.addEventListener('click', () => {
        if (firstOpen && chatWindow.classList.contains('active')) {
            setTimeout(() => {
                sendMessage("Не стесняйтесь задавать вопросы! Я здесь, чтобы помочь вам с регистрацией, бонусами и игровым процессом. 🎮", false);
            }, 500);
            firstOpen = false;
        }
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ ВСЕГО =====

document.addEventListener('DOMContentLoaded', function() {
    // Запускаем анимированные счетчики
    setTimeout(animateCounters, 1000);
    
    // Запускаем live выплаты
    setTimeout(initLivePayments, 2000);
    
    // Инициализируем чат
    setTimeout(initChatWidget, 3000);
    
    // Автооткрытие чата через 30 секунд
    setTimeout(() => {
        const chatToggle = document.getElementById('chatToggle');
        if (chatToggle && Math.random() > 0.5) { // 50% шанс
            chatToggle.click();
        }
    }, 30000);
});
