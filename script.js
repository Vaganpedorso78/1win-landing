// Основные функции для нового дизайна 1WIN PULSE
document.addEventListener('DOMContentLoaded', function() {
    console.log('1WIN PULSE • Modern Design 2025');
    
    // ===== ОСНОВНЫЕ ФУНКЦИИ =====
    
    // Анимация счетчиков
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();
            const startValue = 0;
            
            const updateCounter = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + easeOutQuart * (target - startValue));
                
                counter.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Запуск при появлении в viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(updateCounter);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Копирование промокода
    function initCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const code = this.getAttribute('data-copy') || 'WIN500';
                
                // Показываем состояние копирования
                const copyText = this.querySelector('.copy-text');
                const originalText = copyText.textContent;
                
                // Используем современный API
                navigator.clipboard.writeText(code).then(() => {
                    // Успешное копирование
                    copyText.textContent = 'Скопировано!';
                    this.style.background = 'var(--accent-green)';
                    this.style.borderColor = 'var(--accent-green)';
                    
                    // Анимация иконки
                    const icon = this.querySelector('.copy-icon');
                    icon.textContent = '✓';
                    icon.style.transform = 'scale(1.2)';
                    
                    // Возвращаем исходное состояние через 2 секунды
                    setTimeout(() => {
                        copyText.textContent = originalText;
                        this.style.background = '';
                        this.style.borderColor = '';
                        icon.textContent = '⎘';
                        icon.style.transform = '';
                    }, 2000);
                    
                }).catch(err => {
                    // Fallback для старых браузеров
                    console.log('Clipboard API не поддерживается, используем fallback');
                    const tempInput = document.createElement('input');
                    tempInput.value = code;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                    
                    // Показываем успех
                    copyText.textContent = 'Скопировано!';
                    setTimeout(() => {
                        copyText.textContent = originalText;
                    }, 2000);
                });
            });
        });
    }
    
    // Мобильное меню
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
                
                // Анимация бургера
                const spans = this.querySelectorAll('span');
                if (this.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                    spans[1].style.transform = 'rotate(-45deg) translate(1px, -1px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.transform = 'none';
                }
                
                // Блокируем скролл при открытом меню
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Закрытие меню при клике на ссылку
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.transform = 'none';
                    document.body.style.overflow = '';
                });
            });
            
            // Закрытие меню при клике вне его
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.transform = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    // Параллакс эффект
    function initParallax() {
        const circles = document.querySelectorAll('.bg-circle');
        
        if (!circles.length) return;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            circles.forEach((circle, index) => {
                const speed = index === 0 ? 0.2 : 0.1;
                const yPos = -(scrollY * speed);
                const opacity = 0.1 + (scrollY / windowHeight * 0.1);
                
                circle.style.transform = `translateY(${yPos}px)`;
                circle.style.opacity = Math.min(opacity, 0.2);
            });
        });
    }
    
    // Анимация появления элементов
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        if (!reveals.length) {
            // Добавляем класс reveal к элементам
            document.querySelectorAll('.step-card, .feature-card, .slot-card, .review-card, .faq-item').forEach(el => {
                el.classList.add('reveal');
            });
        }
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Задержка для ступенчатого появления
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.style.transitionDelay = '0s';
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
    }
    
    // FAQ аккордеон
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрываем все открытые
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                
                // Открываем/закрываем текущий
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                }
            });
        });
    }
    
    // Интерактивные кнопки
    function initInteractiveButtons() {
        document.querySelectorAll('.btn').forEach(button => {
            // Эффект нажатия
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(2px) scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
            
            // Эффект наведения для outline кнопок
            if (button.classList.contains('btn-outline') || button.classList.contains('btn-slot')) {
                button.addEventListener('mouseenter', function() {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.borderColor = '';
                });
            }
        });
    }
    
    // Плавная прокрутка
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#!') return;
                
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Обновляем URL без перезагрузки
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    // Стики CTA кнопка
    function initStickyCTA() {
        const stickyCTA = document.querySelector('.sticky-cta');
        if (!stickyCTA) return;
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Показываем стики кнопку после прокрутки 50% экрана и если пользователь не внизу страницы
            if (scrollPosition > windowHeight * 0.5 && 
                scrollPosition < documentHeight - windowHeight * 1.5) {
                stickyCTA.style.display = 'block';
                setTimeout(() => {
                    stickyCTA.style.opacity = '1';
                    stickyCTA.style.transform = 'translateY(0)';
                }, 10);
            } else {
                stickyCTA.style.opacity = '0';
                stickyCTA.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (stickyCTA.style.opacity === '0') {
                        stickyCTA.style.display = 'none';
                    }
                }, 300);
            }
        });
    }
    
    // Таймер (если нужен)
    function initTimer() {
        const timerElements = document.querySelectorAll('.timer');
        if (!timerElements.length) return;
        
        // Устанавливаем время на 15 минут
        let time = 15 * 60; // 15 минут в секундах
        
        function updateTimer() {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            
            timerElements.forEach(timer => {
                timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            });
            
            if (time > 0) {
                time--;
            } else {
                clearInterval(timerInterval);
                timerElements.forEach(timer => {
                    timer.textContent = '00:00';
                    timer.style.color = 'var(--accent-red)';
                });
            }
        }
        
        // Обновляем каждую секунду
        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer(); // Первоначальный вызов
    }
    
    // Чат виджет (упрощенная версия)
    function initChatWidget() {
        const chatTrigger = document.querySelector('.chat-trigger');
        const chatContainer = document.querySelector('.chat-container');
        
        if (!chatTrigger || !chatContainer) return;
        
        let chatOpen = false;
        
        chatTrigger.addEventListener('click', () => {
            chatOpen = !chatOpen;
            
            if (chatOpen) {
                // Создаем содержимое чата
                chatContainer.innerHTML = `
                    <div class="chat-window">
                        <div class="chat-header">
                            <div class="chat-title">
                                <div class="chat-avatar">🤖</div>
                                <div>
                                    <h4>Помощник 1WIN</h4>
                                    <p class="chat-status">Онлайн</p>
                                </div>
                            </div>
                            <button class="chat-close">×</button>
                        </div>
                        <div class="chat-messages">
                            <div class="message bot">
                                <div class="message-content">
                                    Привет! Чем могу помочь с бонусом или регистрацией?
                                </div>
                            </div>
                        </div>
                        <div class="chat-input">
                            <input type="text" placeholder="Напишите сообщение...">
                            <button class="send-btn">→</button>
                        </div>
                    </div>
                `;
                
                chatContainer.style.display = 'block';
                setTimeout(() => {
                    chatContainer.style.opacity = '1';
                    chatContainer.style.transform = 'translateY(0) scale(1)';
                }, 10);
                
                // Закрытие чата
                const closeBtn = chatContainer.querySelector('.chat-close');
                closeBtn.addEventListener('click', () => {
                    chatOpen = false;
                    chatContainer.style.opacity = '0';
                    chatContainer.style.transform = 'translateY(20px) scale(0.9)';
                    setTimeout(() => {
                        chatContainer.style.display = 'none';
                    }, 300);
                });
                
            } else {
                chatContainer.style.opacity = '0';
                chatContainer.style.transform = 'translateY(20px) scale(0.9)';
                setTimeout(() => {
                    chatContainer.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Автозакрытие меню при ресайзе
    function handleResize() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    }
    
    // ===== ИНИЦИАЛИЗАЦИЯ =====
    function init() {
        console.log('Инициализация нового дизайна...');
        
        // Запускаем все функции
        initMobileMenu();
        initCopyButtons();
        initParallax();
        initRevealAnimations();
        initFAQ();
        initInteractiveButtons();
        initSmoothScroll();
        initStickyCTA();
        initTimer();
        initChatWidget();
        
        // Запускаем анимации счетчиков с задержкой
        setTimeout(animateCounters, 1000);
        
        // Обработчик ресайза
        window.addEventListener('resize', handleResize);
        
        // Устанавливаем задержки для элементов
        document.querySelectorAll('.step-card').forEach((card, index) => {
            card.dataset.delay = index * 100;
        });
        
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.dataset.delay = index * 50;
        });
        
        // Добавляем класс loaded для плавного появления
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }
    
    // Запускаем инициализацию
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
});

// Глобальные функции
window.addEventListener('load', function() {
    // Показываем анимацию загрузки
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1000);
});
