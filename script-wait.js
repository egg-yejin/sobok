// script-wait.js
document.addEventListener('DOMContentLoaded', () => {
  const qs = new URLSearchParams(location.search);
  const mate = qs.get('mate') || sessionStorage.getItem('selectedMate') || '';

  const overlay = document.getElementById('fade-overlay');
  if (overlay) {
    // 기존 CSS 전환(0.5s)을 JS에서 5s로 덮어쓰기
    overlay.style.transition = 'opacity 5s ease';
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '0';          // 시작은 투명
    // 다음 프레임에서 서서히 어둡게
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });
  }

  // 5초 후 reply로 이동 (캐릭터도 전달)
  setTimeout(() => {
    const url = 'reply.html' + (mate ? `?mate=${encodeURIComponent(mate)}` : '');
    location.href = url;
  }, 5000);
});
