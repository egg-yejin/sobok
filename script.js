// 히어로 문구 사라지기
const hero = document.getElementById('hero');
const firstParagraph = document.querySelector('.description p');

const observer = new IntersectionObserver(
  ([entry], observer) => {
    if (entry.isIntersecting) {
      hero.style.opacity = '0';
      observer.unobserve(entry.target); // 👉 한 번 트리거 후 중지
    }
  },
  {
    root: null,
    threshold: 0.6,
  }
);

observer.observe(firstParagraph);


// 설명 부분 진입 시, 애니메이션 시작
const description = document.querySelector('.description');
const fadeIns = document.querySelectorAll('.fade-in');

const descObserver = new IntersectionObserver(
  ([entry], observer) => {
    if (entry.isIntersecting) {
      fadeIns.forEach(el => el.classList.add('fade-in-start'));
      observer.unobserve(entry.target); // 애니메이션 1회만 실행
    }
  },
  {
    root: null,
    threshold: 0.4, // 화면 40%쯤 들어왔을 때
  }
);

descObserver.observe(description);


// 시작하기 버튼 클릭 시 색 반전 + intro 이동
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  startBtn.classList.add('clicked');
  setTimeout(() => {
    window.location.href = 'intro.html';
  }, 300); // 전환 시각 고려
});

// 링크 복사 버튼
const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('https://egg-yejin.github.io/sobok/');
    alert('링크가 복사되었어요!');
  } catch (err) {
    alert('복사에 실패했어요 😢');
  }
});

// 공유하기 버튼
const shareBtn = document.getElementById('share-btn');
shareBtn.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: '소복 - 비밀 편지 상점',
        text: '익명 편지 서비스, 소복에서 마음을 나눠보세요.',
        url: 'https://egg-yejin.github.io/sobok/'
      });
    } catch (err) {
      alert('공유가 취소되었어요.');
    }
  } else {
    alert('공유 기능이 이 기기에서 지원되지 않아요 😢');
  }
});
