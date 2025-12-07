// Когда страница загружена
document.addEventListener('DOMContentLoaded', function() {
    console.log('1WIN Modern Site Loaded');
    
    // ===== СНЕЖИНКИ =====
    createSnowflakes();
    
    // ===== ПАРАЛЛАКС ЭФФЕКТ =====
    createParallaxLayers();
    
    // ===== ПРОГРЕСС БАР ПРОКРУТКИ =====
    createScrollProgress();
    
    // 1. Копирование промокода
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const promoInput = this.closest('.promo-input-group').querySelector('.promo-input') ||
                             this.closest('.cta-promo').querySelector('.cta-input');
            const promoCode = promoInput.value;
            
            navigator.clipboard.writeText(promoCode).then(() => {
                const originalText = this.textContent;
                this.textContent = '✅ Copied!';
                this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                this.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.transform = '';
                }, 2000);
            }).catch(err => {
                promoInput.select();
                document.execCommand('copy');
                
                const originalText = this.textContent;
                this.textContent = '✅ Copied!';
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
                    timer.textContent = '00:00';
                    timer.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                    return;
                }
            }
            
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
        });
    }
    
    setInterval(updateTimer, 1000);
    
    // 3. Бургер меню
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    
    if (burgerMenu && nav) {
        burgerMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
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
            
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // 5. Анимация при прокрутке
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Добавляем классы для анимации
    document.querySelectorAll('.step-card, .bonus-card, .review-card').forEach(card => {
        card.classList.add('reveal');
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // 6. Эффект наведения на карточки
    document.querySelectorAll('.step-card, .bonus-card, .review-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // 7. Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 8. Эффект хедера при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// ===== СОЗДАНИЕ СНЕЖИНОК =====
function createSnowflakes() {
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.className = 'snowflakes';
    document.body.appendChild(snowflakesContainer);
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        const size = Math.random() * 5 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.top = `-${size}px`;
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Анимация падения
        snowflake.style.animation = `
            fall ${Math.random() * 10 + 10}s linear infinite,
            sway ${Math.random() * 5 + 5}s ease-in-out infinite
        `;
        
        snowflakesContainer.appendChild(snowflake);
    }
}

// ===== СОЗДАНИЕ ПАРАЛЛАКС СЛОЕВ =====
function createParallaxLayers() {
    const symbols = ['🎰', '🎲', '💰', '🎯', '🎁', '✨'];
    
    for (let i = 1; i <= 3; i++) {
        const layer = document.createElement('div');
        layer.className = `parallax-layer layer-${i}`;
        layer.style.opacity = 0.1 / i;
        layer.style.fontSize = `${30 * i}px`;
        
        // Добавляем символы в слой
        for (let j = 0; j < 5; j++) {
            const symbol = document.createElement('div');
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            symbol.style.position = 'absolute';
            symbol.style.left = `${Math.random() * 100}vw`;
            symbol.style.top = `${Math.random() * 100}vh`;
            symbol.style.opacity = 0.1;
            layer.appendChild(symbol);
        }
        
        document.body.appendChild(layer);
    }
}

// ===== ПРОГРЕСС БАР СКРОЛЛА =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
    });
}

// ===== ЧАТ ВИДЖЕТ =====
function initChatWidget() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatToggle) return;
    
    const knowledgeBase = {
        'How to get 500% bonus?': `To get 500% bonus:
1. Click "Get Bonus" button
2. Register on 1WIN website
3. Enter promo code WIN500 during registration
4. Make your first deposit
5. Bonus will be credited automatically! 🎁`,
        
        'Is verification needed?': `Verification is required only for:
• Large withdrawals (from $500)
• Suspicious activity
• Security requests

Usually for first withdrawals up to $200, verification is not required. 📋`,
        
        'Withdrawal time?': `Withdrawal time depends on method:
• Cryptocurrency (BTC, ETH): 5-15 minutes ⚡
• E-wallets: 15-30 minutes
• Bank cards: 1-24 hours
• Cash systems: up to 5 minutes

Average withdrawal time: 17 minutes. ⏱️`,
        
        'Mobile app?': `Yes! Available apps:
• 📱 iOS: in App Store
• 🤖 Android: on 1WIN website
• 💻 PC: Windows and Mac versions

All apps have same functionality as website!`
    };
    
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        const notification = chatToggle.querySelector('.chat-notification');
        if (notification) notification.style.display = 'none';
    });
    
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!chatToggle.contains(e.target) && !chatWindow.contains(e.target)) {
            chatWindow.classList.remove('active');
        }
    });
    
    function sendMessage(text, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const time = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            messageDiv.style.animation = 'messageAppear 0.3s ease';
        }, 10);
    }
    
    function sendUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        sendMessage(text, true);
        chatInput.value = '';
        
        setTimeout(() => {
            let response = "I understood your question! Unfortunately, I can only answer predefined questions. Please choose one of the options above or contact support via Telegram. 🤖";
            
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
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            sendMessage(question, true);
            
            setTimeout(() => {
                sendMessage(knowledgeBase[question] || "Sorry, I don't know the answer. Contact support.", false);
            }, 800);
        });
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendUserMessage();
        }
    });
    
    chatSend.addEventListener('click', sendUserMessage);
    
    let firstOpen = true;
    chatToggle.addEventListener('click', () => {
        if (firstOpen && chatWindow.classList.contains('active')) {
            setTimeout(() => {
                sendMessage("Welcome to 1WIN Assistant! 🎄 Ask me about bonuses, registration, or games. I'm here to help! 🎮", false);
            }, 500);
            firstOpen = false;
        }
    });
}

// ===== ИНИЦИАЛИЗАЦИЯ ВСЕГО =====
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем чат
    setTimeout(initChatWidget, 1000);
    
    // Автооткрытие чата через 30 секунд
    setTimeout(() => {
        const chatToggle = document.getElementById('chatToggle');
        if (chatToggle && Math.random() > 0.5) {
            chatToggle.click();
        }
    }, 30000);
    
    // Анимация при загрузке
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});
