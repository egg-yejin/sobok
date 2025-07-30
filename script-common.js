// 링크 복사 버튼
const copyBtn = document.getElementById('copy-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('https://egg-yejin.github.io/sobok/');
      alert('링크가 복사되었어요!');
    } catch (err) {
      alert('복사에 실패했어요 😢');
    }
  });
}

// 공유하기 버튼
const shareBtn = document.getElementById('share-btn');
if (shareBtn && navigator.share) {
  shareBtn.addEventListener('click', async () => {
    try {
      await navigator.share({
        title: '소복 - 비밀 편지 상점',
        text: '익명 편지 서비스, 소복에서 마음을 나눠보세요.',
        url: 'https://egg-yejin.github.io/sobok/',
      });
    } catch (err) {
      alert('공유가 취소되었어요.');
    }
  });
}
