const nextBtn = document.getElementById('next-btn');
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextBtn.classList.add('clicked');
    setTimeout(() => {
      window.location.href = 'test.html';
    }, 300);
  });
}
