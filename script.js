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
                
                // --- МОДЕРНИЗАЦИЯ СТИЛЯ КОПИРОВАНИЯ (New Icy Blue) ---
                this.textContent = 'Скопировано!';
                this.style.background = '#a3f7ff'; 
                this.style.color = '#090d18'; 
                // ------------------------------------
                
                // Возвращаем обратно через 2 секунды
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.color = '';
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
            
            // Закрываем все открытые вопросы, кроме текущего
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Переключаем активность на текущем вопросе
            faqItem.classList.toggle('active');

        });
    });
    
    // 5. Анимация при прокрутке
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.step-card, .bonus-card, .slot-card, .review-card');
        
        reveals.forEach(element => {
            // Проверяем, находится ли элемент в поле зрения
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Начинаем анимацию за 150px до достижения
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                element.classList.remove('active'); // Сброс для повторной анимации
            }
        });
    }
    
    // Добавляем классы для анимации
    document.querySelectorAll('.step-card, .bonus-card, .slot-card, .review-card').forEach(card => {
        card.classList.add('reveal'); // Класс-маркер для наблюдателя
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Запускаем сразу
    
    // 6. Кнопки "Играть" в слотах
    document.querySelectorAll('.btn-slot').forEach(button => {
        button.addEventListener('click', function() {
            const slotName = this.closest('.slot-card').querySelector('h3').textContent;
            alert(`🎰 Игра "${slotName}" скоро будет доступна!\nСначала получи бонус и зарегистрируйся.`);
        });
    });
    
    // 7. Анимированные счетчики
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.textContent = Math.floor(progress * (end - start) + start).toLocaleString('en-US');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    function animateCounters() {
        document.querySelectorAll('.stat-number:not(.gradient-text)').forEach(stat => {
            // Парсим только числа
            const endValueText = stat.textContent.replace(/[^0-9]/g, '');
            const endValue = parseInt(endValueText);
            
            if (!isNaN(endValue)) {
                animateValue(stat, 0, endValue, 2000);
            }
        });
    }
    
    // 8. Live выплаты (обновление)
    const paymentsData = [
        { name: 'Александр К.', avatar: 'АК', amount: '+50,000₽', game: 'Aviator', time: '10 сек назад', type: 'success' },
        { name: 'Елена Г.', avatar: 'ЕГ', amount: '+7,500₽', game: 'Lucky Jet', time: '30 сек назад', type: 'success' },
        { name: 'Дмитрий С.', avatar: 'ДС', amount: '+15,750₽', game: 'Crazy Time', time: '8 мин назад', type: 'warning' },
        { name: 'Светлана В.', avatar: 'СВ', amount: '+96,200₽', game: 'Mega Fortune', time: '12 мин назад', type: 'success' },
        { name: 'Игорь П.', avatar: 'ИП', amount: '+3,100₽', game: 'Book of Dead', time: '15 мин назад', type: 'warning' },
    ];
    
    const livePaymentsList = document.getElementById('livePaymentsList');
    
    function initLivePayments() {
        if (!livePaymentsList) return;
        
        let paymentIndex = 0;
        
        function updatePayments() {
            // Удаляем старые
            livePaymentsList.innerHTML = '';
            
            // Добавляем новые
            for (let i = 0; i < 3; i++) {
                const data = paymentsData[(paymentIndex + i) % paymentsData.length];
                
                const paymentItem = document.createElement('div');
                paymentItem.classList.add('payment-item');
                paymentItem.classList.add(data.type); // success/warning
                
                paymentItem.innerHTML = `
                    <div class="payment-avatar">${data.avatar}</div>
                    <div class="payment-details">
                        <span class="payment-name">${data.name}</span>
                        <span class="payment-game">${data.game}</span>
                    </div>
                    <div class="payment-amount">${data.amount}</div>
                `;
                
                livePaymentsList.appendChild(paymentItem);
            }
            
            paymentIndex = (paymentIndex + 1) % paymentsData.length;
        }
        
        updatePayments();
        setInterval(updatePayments, 4000); // Обновляем каждые 4 секунды
    }
    
    
    // 9. Чат-виджет
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    
    if (!chatToggle || !chatWindow) return;
    
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Моделируем ответы
    const botAnswers = {
        'как получить бонус 500%?': `Чтобы получить бонус 500%, нужно: 1. Нажать "Получить бонус". 2. Зарегистрироваться на сайте 1WIN. 3. Ввести промокод WIN500 в специальное поле. 4. Внести первый депозит. Бонус начисляется автоматически!`,
        'нужна ли верификация?': `Для получения бонуса и начала игры верификация не нужна. Она может потребоваться при выводе крупных сумм, но для начала игры достаточно просто зарегистрироваться.`,
        'сколько времени вывод денег?': `Время вывода зависит от способа: • Электронные кошельки: 15-30 минут • Банковские карты: 1-24 часа • Наличные через систему: до 5 минут. Среднее время вывода: 17 минут. ⏱️`,
        'есть ли мобильное приложение?': `Да! Доступны приложения: • 📱 iOS: в App Store (по региону) • 🤖 Android: на сайте 1WIN • 💻 ПК: Windows и Mac версии. Все приложения имеют тот же функционал, что и сайт!`,
        // Добавляем ответы из FAQ
        'это официальный сайт 1win?': `Нет, это партнёрский промо-сайт. Мы предоставляем информацию и ссылки на официальный сайт 1WIN.`,
        'как активировать промокод?': `Промокод WIN500 нужно ввести в специальное поле во время регистрации на сайте 1WIN.`,
        'как отыграть бонус?': `Бонус нужно отыгрывать по условиям, указанным на официальном сайте. Обычно это определенный вейджер и время.`,
    };
    
    function sendMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user' : 'bot');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = isUser ? 'только что' : 'сейчас';
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        chatMessages.appendChild(messageDiv);
        
        // Скролл вниз
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getBotResponse(userMessage) {
        const normalizedMessage = userMessage.toLowerCase().trim();
        let response = botAnswers[normalizedMessage];
        
        if (!response) {
            // Поиск по ключевым словам
            const keywords = Object.keys(botAnswers);
            for (const key of keywords) {
                if (normalizedMessage.includes(key.replace(/[?]/g, ''))) {
                    response = botAnswers[key];
                    break;
                }
            }
        }
        
        return response || "Извините, я не знаю ответа на этот вопрос. Пожалуйста, попробуйте перефразировать или обратитесь в поддержку.";
    }
    
    function sendUserMessage() {
        const text = chatInput.value.trim();
        if (text === '') return;
        
        sendMessage(text, true);
        chatInput.value = '';
        
        // Ответ бота
        setTimeout(() => {
            const botResponse = getBotResponse(text);
            sendMessage(botResponse, false);
        }, 1000);
    }
    
    // Ответы на кнопки
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            sendMessage(question, true);
            
            setTimeout(() => {
                const answer = botAnswers[question] || "Извините, я не знаю ответа на этот вопрос. Обратитесь в поддержку.";
                sendMessage(answer, false);
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
});

// ===== ИНИЦИАЛИЗАЦИЯ ВСЕГО =====

document.addEventListener('DOMContentLoaded', function() {
    // Запускаем анимированные счетчики
    setTimeout(animateCounters, 1000);
    
    // Запускаем live выплаты
    setTimeout(initLivePayments, 2000);
    
    // Инициализируем чат
    setTimeout(initChatWidget, 3000);
});
