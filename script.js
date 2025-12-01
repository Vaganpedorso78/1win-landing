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
  
  const t = translations[lang];
  
  document.querySelector('.hero__eyebrow').textContent = t.eyebrow;
  document.querySelector('.hero__title').innerHTML = t.title;
  document.querySelector('.hero__subtitle').textContent = t.subtitle;
  document.querySelector('.hero__promo-label').textContent = t.promoLabel;
  document.querySelector('.hero__promo-hint').textContent = t.promoHint;
  document.querySelector('#cta-main').textContent = t.cta1;
  document.querySelector('.scroll-to-steps').textContent = t.cta2;
  document.querySelector('.hero__tag').textContent = t.tag;
  document.querySelector('#steps .section__title').textContent = t.stepsTitle;
  document.querySelector('#steps .section__subtitle').textContent = t.stepsSubtitle;
  document.querySelector('.band__label').textContent = t.bandLabel;
  document.querySelector('.band__title').textContent = t.bandTitle;
  document.querySelector('.band__text').textContent = t.bandText;
  document.querySelector('#details .section__title').textContent = t.detailsTitle;
  document.querySelector('#reviews .section__title').textContent = t.reviewsTitle;
  document.querySelector('#reviews .section__subtitle').textContent = t.reviewsSubtitle;
  document.querySelector('#faq .section__title').textContent = t.faqTitle;
  document.querySelector('.sticky-cta__btn').textContent = t.stickyBtn;
  
  localStorage.setItem('siteLang', lang);
}

langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    switchLanguage(btn.dataset.lang);
  });
});

const savedLang = localStorage.getItem('siteLang') || 'ru';
switchLanguage(savedLang);
