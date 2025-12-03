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

