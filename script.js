// Smooth scroll to sections
document.querySelectorAll('a[href^="#"], .scroll-to-steps').forEach((el) => {
  el.addEventListener('click', (e) => {
    const href = el.getAttribute('href');
    const isStepsBtn = el.classList.contains('scroll-to-steps');

    const targetId = isStepsBtn
      ? 'steps'
      : href && href.startsWith('#')
      ? href.slice(1)
      : null;

    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: 'smooth'
    });
  });
});

// Burger menu
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
    });
  });
}

// Countdown 15:00
(function startCountdown() {
  const display = document.getElementById('countdown');
  if (!display) return;

  let totalSeconds = 15 * 60;

  function updateCountdown() {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}`;

    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      display.textContent = '00:00';
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// Live stats (онлайн + остаток бонуса)
(function liveStats() {
  const onlineEl = document.getElementById('kpi-online');
  const progressEl = document.getElementById('hero-progress');
  const leftLabelEl = document.getElementById('hero-left-label');

  if (!onlineEl || !progressEl || !leftLabelEl) return;

  function formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function update() {
    const baseOnline = 900;
    const online = baseOnline + Math.floor(Math.random() * 600);
    onlineEl.textContent = formatNumber(online);

    const left = 60 + Math.floor(Math.random() * 25); // 60–85%
    progressEl.style.width = left + '%';
    leftLabelEl.textContent = `Осталось ${left}%`;
  }

  update();
  setInterval(update, 9000);
})();

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-item__question');
  const answer = item.querySelector('.faq-item__answer');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('faq-item--open');

    document.querySelectorAll('.faq-item').forEach((i) => {
      i.classList.remove('faq-item--open');
      const ans = i.querySelector('.faq-item__answer');
      if (ans) ans.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('faq-item--open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Copy promo code helper
function bindPromoCopy(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);

  if (!input || !btn) return;

  btn.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;

    function setCopiedState() {
      const original = btn.textContent;
      btn.textContent = 'Скопировано';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value)
        .then(setCopiedState)
        .catch(() => {
          input.select();
          document.execCommand('copy');
          setCopiedState();
        });
    } else {
      input.select();
      document.execCommand('copy');
      setCopiedState();
    }
  });
}

bindPromoCopy('promo-main', 'promo-main-copy');
bindPromoCopy('promo-band', 'promo-band-copy');

// Reveal on scroll (IntersectionObserver)
(function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const show = (el) => el.classList.add('reveal--visible');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
  } else {
    // fallback
    elements.forEach(show);
  }
})();

// Money Piggy Bank
(function initPiggyBank() {
  const piggyTotal = document.getElementById('piggy-total');
  const piggyBtn = document.getElementById('piggy-btn');
  const moneyRain = document.querySelector('.money-rain');
  
  if (!piggyTotal || !piggyBtn) return;
  
  let totalAmount = 1247850; // Начальная сумма
  let todayAmount = 0;
  const todayWins = [18500, 12300, 25000, 15750, 9800, 32500, 14200];
  
  // Функция форматирования числа
  function formatNumber(num, isEnglish = false) {
    if (isEnglish) {
      return '$' + num.toLocaleString('en-US');
    }
    return num.toLocaleString('ru-RU') + '₽';
  }
  
  // Обновить отображение
  function updateDisplay() {
    const isEnglish = document.querySelector('html').lang === 'en' || 
                     window.location.pathname.includes('en.html');
    
    piggyTotal.textContent = formatNumber(totalAmount, isEnglish);
    
    // Обновить лейбл
    const label = document.querySelector('.piggy-label');
    if (label) {
      label.textContent = isEnglish ? 'Won on site' : 'Выиграно на сайте';
    }
  }
  
  // Добавить случайный выигрыш
  function addRandomWin() {
    const winAmount = todayWins[Math.floor(Math.random() * todayWins.length)];
    totalAmount += winAmount;
    todayAmount += winAmount;
    
    // Анимация дождя из денег
    if (moneyRain) {
      moneyRain.classList.add('active');
      setTimeout(() => {
        moneyRain.classList.remove('active');
      }, 2000);
    }
    
    // Обновить отображение с анимацией
    piggyTotal.style.transform = 'scale(1.2)';
    piggyTotal.style.color = '#22d3ee';
    
    setTimeout(() => {
      updateDisplay();
      piggyTotal.style.transform = 'scale(1)';
      piggyTotal.style.color = '';
    }, 300);
    
    // Сохранить в localStorage
    localStorage.setItem('piggyTotal', totalAmount);
    localStorage.setItem('lastUpdate', Date.now());
  }
  
  // Проверка на скролл
  let lastScroll = 0;
  let scrollWins = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const scrollDiff = currentScroll - lastScroll;
    
    // Добавляем выигрыш каждые 500px скролла (макс 3 раза)
    if (scrollDiff > 500 && scrollWins < 3) {
      addRandomWin();
      scrollWins++;
      lastScroll = currentScroll;
    }
  });
  
  // Клик по кнопке
  piggyBtn.addEventListener('click', () => {
    addRandomWin();
    
    // Показать сегодняшние выигрыши
    const isEnglish = document.querySelector('html').lang === 'en' || 
                     window.location.pathname.includes('en.html');
    
    alert(isEnglish 
      ? `💰 Today won: ${formatNumber(todayAmount, true)}\n🏆 Total on site: ${formatNumber(totalAmount, true)}`
      : `💰 Сегодня выиграно: ${formatNumber(todayAmount)}\n🏆 Всего на сайте: ${formatNumber(totalAmount)}`
    );
  });
  
  // Загрузить сохранённые данные
  const savedTotal = localStorage.getItem('piggyTotal');
  const lastUpdate = localStorage.getItem('lastUpdate');
  const now = Date.now();
  
  if (savedTotal && lastUpdate) {
    const daysPassed = Math.floor((now - parseInt(lastUpdate)) / (1000 * 60 * 60 * 24));
    
    // Если прошло больше дня, сбросить сегодняшние выигрыши
    if (daysPassed >= 1) {
      todayAmount = 0;
    }
    
    totalAmount = parseInt(savedTotal);
  }
  
  // Обновлять каждые 2 минуты
  setInterval(addRandomWin, 120000);
  
  // Инициализация
  updateDisplay();
})();
