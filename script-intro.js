
document.addEventListener("DOMContentLoaded", () => {
  const introText = document.querySelector(".intro-text");
  const paragraphs = introText?.querySelectorAll(".fade-in");

  if (paragraphs && paragraphs.length > 0) {
    paragraphs.forEach(p => p.classList.add("fade-in-start"));
  }
});


const nextBtn = document.getElementById('next-btn');
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextBtn.classList.add('clicked');
    setTimeout(() => {
      window.location.href = 'test.html';
    }, 300);
  });
}
