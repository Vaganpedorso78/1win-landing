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

// Simple language switcher
const langBtns = document.querySelectorAll('.lang-btn');

const translations = {
  ru: {
    eyebrow: 'Партнёрское промо-предложение 1win',
    title: 'До <span class="hero__accent">500% на первый депозит</span> для новых игроков 1win',
    subtitle: 'Современная платформа 1win с бонусом до 500% на старт. Короткая регистрация, промокод и быстрый депозит — всё в одном месте.',
    promoLabel: 'Промокод 1win',
    promoHint: 'Скопируй промокод, введи его при регистрации и следуй инструкциям ниже.',
    cta1: 'Перейти на 1win',
    cta2: 'Как это работает',
    tag: '18+ Только для совершеннолетних',
    stepsTitle: '3 шага, чтобы забрать бонус 1win',
    stepsSubtitle: 'Минимум текста — максимум конкретики. Следуй по таймлайну.',
    bandLabel: 'Промокод 1win',
    bandTitle: 'Закрепи за собой бонус до 500%',
    bandText: 'Скопируй промокод, затем нажми на кнопку — промо останется в буфере и ты сразу сможешь вставить его на странице регистрации 1win.',
    detailsTitle: 'Что важно знать про бонус 1win',
    reviewsTitle: 'Мнения игроков из сети',
    reviewsSubtitle: 'Собрали типичные отзывы о 1win и стартовом бонусе через промо.',
    faqTitle: 'FAQ по 1win и бонусу',
    stickyBtn: 'Забрать бонус 1win'
  },
  en: {
    eyebrow: '1win Partner Promo Offer',
    title: 'Up to <span class="hero__accent">500% on first deposit</span> for new 1win players',
    subtitle: 'Modern 1win platform with up to 500% welcome bonus. Quick registration, promo code and fast deposit — all in one place.',
    promoLabel: '1win Promo Code',
    promoHint: 'Copy the promo code, enter it during registration and follow the instructions below.',
    cta1: 'Go to 1win',
    cta2: 'How it works',
    tag: '18+ For adults only',
    stepsTitle: '3 steps to get 1win bonus',
    stepsSubtitle: 'Minimum text — maximum specifics. Follow the timeline.',
    bandLabel: '1win Promo Code',
    bandTitle: 'Secure up to 500% bonus for yourself',
    bandText: 'Copy the promo code, then click the button — the promo will remain in the buffer and you can immediately paste it on the 1win registration page.',
    detailsTitle: 'What you should know about 1win bonus',
    reviewsTitle: 'Player opinions from the web',
    reviewsSubtitle: 'Collected typical reviews about 1win and welcome bonus via promo.',
    faqTitle: 'FAQ about 1win and bonus',
    stickyBtn: 'Get 1win bonus'
  }
};

function switchLanguage(lang) {
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  document.querySelectorAll('[data-ru][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  
  const translations = {
  ru: {
    // Навигация уже через data-атрибуты
    eyebrow: 'Партнёрское промо-предложение 1win',
    title: 'До <span class="hero__accent">500% на первый депозит</span> для новых игроков 1win',
    subtitle: 'Современная платформа 1win с бонусом до 500% на старт. Короткая регистрация, промокод и быстрый депозит — всё в одном месте.',
    promoLabel: 'Промокод 1win',
    promoHint: 'Скопируй промокод, введи его при регистрации и следуй инструкциям ниже.',
    cta1: 'Перейти на 1win',
    cta2: 'Как это работает',
    tag: '18+ Только для совершеннолетних',
    timerText: 'Акция активна ещё:',
    
    // Правая панель
    statsLabel: 'Live статистика',
    online: 'Сейчас на 1win',
    avgBonus: 'Средний бонус',
    max: 'Максимум',
    offer: 'Спецпредложение',
    left: 'Осталось',
    hint: 'Данные по активной акции 1win обновляются в реальном времени.',
    quickTitle: 'Быстрый старт',
    quickItems: ['Регистрация: 1–2 минуты', 'Промокод: активирует бонус', 'Пополнение: популярные платёжные методы', 'Вывод: от нескольких минут'],
    scroll: 'Листай вниз',
    
    // Шаги
    stepsTitle: '3 шага, чтобы забрать бонус 1win',
    stepsSubtitle: 'Минимум текста — максимум конкретики. Следуй по таймлайну.',
    step1: 'Шаг 1',
    step1Title: 'Перейди по кнопке на 1win',
    step1Text: 'Нажми «Перейти на 1win», чтобы открыть официальную страницу регистрации с актуальной акцией под твой регион.',
    step2: 'Шаг 2',
    step2Title: 'Введи промокод при регистрации',
    step2Text: 'Скопируй промокод с этого сайта и вставь его в поле промокода/акции на 1win — так ты привязываешь к себе бонус.',
    step3: 'Шаг 3',
    step3Title: 'Сделай первый депозит',
    step3Text: 'Пополни счёт удобным способом. В рамках текущей акции 1win начисляет до 500% бонусом к твоей сумме.',
    
    // Баннер
    bandLabel: 'Промокод 1win',
    bandTitle: 'Закрепи за собой бонус до 500%',
    bandText: 'Скопируй промокод, затем нажми на кнопку — промо останется в буфере и ты сразу сможешь вставить его на странице регистрации 1win.',
    bandCopy: 'Копировать',
    bandNote: 'Нажимая на кнопку, ты попадаешь на официальный сайт 1win по партнёрской ссылке.',
    bandBtn: 'Перейти на 1win',
    
    // Фичи
    detailsTitle: 'Что важно знать про бонус 1win',
    feature1Tag: 'Бонус',
    feature1Title: 'До 500% к депозиту',
    feature1Text: 'Размер бонуса зависит от суммы пополнения и условий акции. Ты видишь актуальные цифры уже на стороне 1win при регистрации.',
    feature2Tag: 'Прозрачность',
    feature2Title: 'Условия на стороне 1win',
    feature2Text: 'Все нюансы по отыгрышу, коэффициентам, лимитам и ограничениям указаны прямо на официальном сайте 1win. Мы их не меняем.',
    feature3Tag: 'Скорость',
    feature3Title: 'Регистрация и вывод',
    feature3Text: 'Обычно регистрация занимает 1–2 минуты, а вывод при соблюдении условий — от нескольких минут до часа, в зависимости от метода.',
    feature4Tag: 'Ответственность',
    feature4Title: 'Азартные игры = риск',
    feature4Text: 'Не относись к 1win как к источнику дохода. Это азартная игра. Используй только те деньги, которые не жалко потерять, и ставь личные лимиты.',
    
    // Отзывы
    reviewsTitle: 'Мнения игроков из сети',
    reviewsSubtitle: 'Собрали типичные отзывы о 1win и стартовом бонусе через промо.',
    
    // FAQ
    faqTitle: 'FAQ по 1win и бонусе',
    faq1: 'Это официальный сайт 1win?',
    faq1a: 'Нет. Это промо-лендинг партнёра. Мы не принимаем платежи и не проводим игры. Все депозиты, ставки и бонусы проходят уже на официальном сайте 1win.',
    faq2: 'Бонус 500% выдается всем?',
    faq2a: 'Размер бонуса зависит от текущей акции на 1win, суммы депозита, региона и промокода. Актуальные условия всегда указаны на сайте 1win в момент регистрации.',
    faq3: 'Нужна ли верификация?',
    faq3a: 'Обычно верификация требуется при выводе крупных сумм или по запросу 1win. Конкретные требования смотри в разделе «Помощь» / «Правила» на сайте 1win.',
    faq4: 'Какие риски?',
    faq4a: 'Азартные игры — это всегда риск потери денег. Не используй для депозита последние деньги, не занимай в долг, ставь личные лимиты и относись к 1win как к развлечению, а не к заработку.',
    
    // Кнопки
    copyBtn: 'Скопировать',
    copiedBtn: 'Скопировано',
    stickyBtn: 'Забрать бонус 1win',
    headerBtn: 'Забрать бонус',
    
    // Футер
    footerLogo: '1win Pulse',
    footerText: 'Этот сайт не является 1win, казино или букмекерской конторой. Мы не принимаем ставки и не организуем азартные игры. Здесь размещена промо-информация и ссылки на официальный сайт 1win.',
    footerWarning: '18+ Азартные игры могут вызывать зависимость. Играйте ответственно.',
    footerLink: 'Вернуться наверх'
  },
  en: {
    eyebrow: '1win Partner Promo Offer',
    title: 'Up to <span class="hero__accent">500% on first deposit</span> for new 1win players',
    subtitle: 'Modern 1win platform with up to 500% welcome bonus. Quick registration, promo code and fast deposit — all in one place.',
    promoLabel: '1win Promo Code',
    promoHint: 'Copy the promo code, enter it during registration and follow the instructions below.',
    cta1: 'Go to 1win',
    cta2: 'How it works',
    tag: '18+ For adults only',
    timerText: 'Promotion active for:',
    
    // Right panel
    statsLabel: 'Live statistics',
    online: 'Online now on 1win',
    avgBonus: 'Average bonus',
    max: 'Maximum',
    offer: 'Special offer',
    left: 'Left',
    hint: 'Data on the current 1win promotion is updated in real time.',
    quickTitle: 'Quick start',
    quickItems: ['Registration: 1–2 minutes', 'Promo code: activates bonus', 'Deposit: popular payment methods', 'Withdrawal: from a few minutes'],
    scroll: 'Scroll down',
    
    // Steps
    stepsTitle: '3 steps to get 1win bonus',
    stepsSubtitle: 'Minimum text — maximum specifics. Follow the timeline.',
    step1: 'Step 1',
    step1Title: 'Go to 1win via the button',
    step1Text: 'Click "Go to 1win" to open the official registration page with the current promotion for your region.',
    step2: 'Step 2',
    step2Title: 'Enter promo code during registration',
    step2Text: 'Copy the promo code from this site and paste it into the promo code/offer field on 1win — this links the bonus to you.',
    step3: 'Step 3',
    step3Title: 'Make your first deposit',
    step3Text: 'Top up your account using a convenient method. Under the current promotion, 1win awards up to 500% as a bonus to your amount.',
    
    // Banner
    bandLabel: '1win Promo Code',
    bandTitle: 'Secure up to 500% bonus for yourself',
    bandText: 'Copy the promo code, then click the button — the promo will remain in the buffer and you can immediately paste it on the 1win registration page.',
    bandCopy: 'Copy',
    bandNote: 'By clicking the button, you go to the official 1win website via a partner link.',
    bandBtn: 'Go to 1win',
    
    // Features
    detailsTitle: 'What you should know about 1win bonus',
    feature1Tag: 'Bonus',
    feature1Title: 'Up to 500% to deposit',
    feature1Text: 'The bonus amount depends on the deposit amount and promotion terms. You see actual numbers on the 1win side during registration.',
    feature2Tag: 'Transparency',
    feature2Title: 'Terms on 1win side',
    feature2Text: 'All nuances regarding wagering, odds, limits and restrictions are specified directly on the official 1win website. We do not change them.',
    feature3Tag: 'Speed',
    feature3Title: 'Registration and withdrawal',
    feature3Text: 'Registration usually takes 1–2 minutes, and withdrawal under conditions — from a few minutes to an hour, depending on the method.',
    feature4Tag: 'Responsibility',
    feature4Title: 'Gambling = risk',
    feature4Text: 'Do not treat 1win as a source of income. This is gambling. Use only money you can afford to lose and set personal limits.',
    
    // Reviews
    reviewsTitle: 'Player opinions from the web',
    reviewsSubtitle: 'Collected typical reviews about 1win and welcome bonus via promo.',
    
    // FAQ
    faqTitle: 'FAQ about 1win and bonus',
    faq1: 'Is this the official 1win website?',
    faq1a: 'No. This is a partner promo landing. We do not accept payments or conduct games. All deposits, bets and bonuses take place on the official 1win website.',
    faq2: 'Is the 500% bonus given to everyone?',
    faq2a: 'The bonus amount depends on the current 1win promotion, deposit amount, region and promo code. Current conditions are always indicated on the 1win website at the time of registration.',
    faq3: 'Is verification needed?',
    faq3a: 'Verification is usually required when withdrawing large amounts or upon 1win request. See specific requirements in the "Help" / "Rules" section on the 1win website.',
    faq4: 'What are the risks?',
    faq4a: 'Gambling always carries the risk of losing money. Do not use last money for deposit, do not borrow, set personal limits and treat 1win as entertainment, not as earnings.',
    
    // Buttons
    copyBtn: 'Copy',
    copiedBtn: 'Copied',
    stickyBtn: 'Get 1win bonus',
    headerBtn: 'Get bonus',
    
    // Footer
    footerLogo: '1win Pulse',
    footerText: 'This site is not 1win, casino or bookmaker. We do not accept bets or organize gambling. Promo information and links to the official 1win website are placed here.',
    footerWarning: '18+ Gambling can be addictive. Play responsibly.',
    footerLink: 'Back to top'
  }
};
}

langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    switchLanguage(btn.dataset.lang);
  });
});

const savedLang = localStorage.getItem('siteLang') || 'ru';
switchLanguage(savedLang);

