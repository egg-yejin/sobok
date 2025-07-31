// 히어로 문구 사라지기
const heroTrigger = document.querySelector('.hero-trigger');
if (heroTrigger) {
  const hero = document.getElementById('hero');
  const observer = new IntersectionObserver(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        hero.style.opacity = '0';
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.6 }
  );
  observer.observe(heroTrigger);
}

// 설명 fade-in 애니메이션
const description = document.querySelector('.description-section');
const fadeIns = document.querySelectorAll('.fade-in');

if (description && fadeIns.length > 0) {
  const descObserver = new IntersectionObserver(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        fadeIns.forEach(el => el.classList.add('fade-in-start'));
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.4 }
  );
  descObserver.observe(description);
}

// 시작하기 버튼
const startBtn = document.getElementById('start-btn');
const fadeOverlay = document.getElementById('fade-overlay');

if (startBtn) {
  startBtn.addEventListener('click', () => {
  fadeOverlay.style.opacity = '1';
  fadeOverlay.addEventListener('transitionend', () => {
    window.location.href = 'intro.html';
  }, { once: true });

  });
}


