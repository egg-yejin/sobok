// script-send.js
function getMate() {
  const qs = new URLSearchParams(location.search);
  let m = qs.get('mate') || '';
  if (!m) m = sessionStorage.getItem('selectedMate') || '';
  try { m = decodeURIComponent(m); } catch {}
  return m;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1) TO 자동 채우기
  const to = getMate();
  const toEl = document.getElementById('to-name');
  if (toEl) toEl.textContent = to || '-';

  // 2) 보내기 → 검증 → wait.html로
  const sendBtn = document.getElementById('start-btn');      // 기존 버튼 스타일 재사용
  const bodyEl  = document.getElementById('letter-textarea'); // 본문
  const fromEl  = document.getElementById('from-name');       // FROM

  if (!sendBtn) return;

  sendBtn.addEventListener('click', () => {
    const body = (bodyEl?.value || '').trim();
    const from = (fromEl?.value || '').trim();

    if (!body) { alert('편지 내용을 적어주세요!'); bodyEl?.focus(); return; }
    if (!from) { alert('누가 보내는 건지 이름을 적어주세요!'); fromEl?.focus(); return; }

    // 필요하면 저장해서 다음 화면/서버에서 쓰세요
    sessionStorage.setItem('letter_body', body);
    sessionStorage.setItem('letter_from', from);
    sessionStorage.setItem('selectedMate', to);

    // wait로 이동 (캐릭터도 쿼리로 전달)
    location.href = `wait.html?mate=${encodeURIComponent(to)}`;
  });
});
