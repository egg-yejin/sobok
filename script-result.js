// script-result.js
document.addEventListener('DOMContentLoaded', () => {
  // 버튼 참조 (오타 대비: slect-btn 도 허용)
  const selectBtn = document.getElementById('select-btn');
  const sendBtn   = document.getElementById('send-btn');

  // 전환용 오버레이 (있으면 페이드 후 이동)
  const overlay = document.getElementById('fade-overlay');
  const go = (url) => {
    if (overlay) {
      overlay.style.pointerEvents = 'auto';
      overlay.style.opacity = '1';           // CSS에 0.5s transition 설정되어 있음
      setTimeout(() => { window.location.href = url; }, 500);
    } else {
      window.location.href = url;
    }
  };

  if (selectBtn) selectBtn.addEventListener('click', () => go('select.html'));
  if (sendBtn)   sendBtn.addEventListener('click',   () => go('send.html'));
});

// 1) 조합 → 캐릭터 매핑
const SCORES = {
  aaaaa:"달비", aaaab:"포포", aaaba:"달비", aaabb:"토야",
  aabaa:"포포", aabab:"토야", aabba:"달비", aabbb:"냐르",
  abaaa:"포포", abaab:"토야", ababa:"달비", ababb:"냐르",
  abbaa:"타키", abbab:"모모", abbba:"타키", abbbb:"모모",
  baaaa:"포포", baaab:"토야", baaba:"냐르", baabb:"냐르",
  babaa:"타키", babab:"모모", babba:"타키", babbb:"모모",
  bbaaa:"토야", bbaab:"포포", bbaba:"냐르", bbabb:"냐르",
  bbbaa:"타키", bbbab:"모모", bbbba:"타키", bbbbb:"모모",
};

// 2) 캐릭터별 표시 데이터 
const CHAR_DATA = {
  "토야": {
    label: "토야",
    img: "assets/character/toya.png",
    main: "“모두 행복했으면 좋겠어~!”",
    detail: "따뜻한 말로 주변을 밝게 하는 당신에게는\n사랑스러운 토끼 토야가 딱 맞는 메이트예요!"
  },
  "모모": {
    label: "모모",
    img: "assets/character/momo.png",
    main: "“재밌는 게 최고라구!”",
    detail: "웃음 가득한 하루를 꿈꾸는 당신에게는\n수다쟁이 개구리 모모가 딱 맞는 메이트예요!"
  },
  "타키": {
    label: "타키",
    img: "assets/character/taki.png",
    main: "“에구, 또 까먹었네~”",
    detail: "예상 못 한 행동으로 웃음을 주는 당신에게는\n엉뚱한 너구리 타키가 딱 맞는 메이트예요!"
  },
  "달비": {
    label: "달비",
    img: "assets/character/dalbi.png",
    main: "“조용히 바라보는 게 좋아…”",
    detail: "서두르지 않고 주변을 살피는 당신에게는\n차분한 곰인형 달비가 딱 맞는 메이트예요!"
  },
  "냐르": {
    label: "냐르",
    img: "assets/character/nyar.png",
    main: "“깔끔해야 마음이 놓여요.”",
    detail: "낯선 자리에서도 흐트러짐 없는 당신에게는\n도도한 고양이 냐르가 딱 맞는 메이트예요!"
  },
  "포포": {
    label: "포포",
    img: "assets/character/popo.png",
    main: "“따뜻함은 최고의 환영 인사랍니다!”",
    detail: "사람을 잘 챙기는 당신에게는\n다정한 코요테 포포가 딱 맞는 메이트예요!"
  }
};

// 3) test → result 전달값 읽기
//    (우선순위: ?result= / ?p= / ?code= / 저장소 폴백)
function readMateOrPattern() {
  const qs = new URLSearchParams(location.search);
  const mate = qs.get('mate') || qs.get('char') || qs.get('character');
  if (mate) return mate;                 // 직접 선택 우선

  // ↓ 기존 패턴 읽기 로직 재사용
  let p = qs.get("result") || qs.get("p") || qs.get("code");
  if (!p) p = sessionStorage.getItem("resultPattern")
        || localStorage.getItem("resultPattern")
        || sessionStorage.getItem("answerPattern")
        || localStorage.getItem("answerPattern");
  if (!p) {
    for (const k of ["answers","choices","resultAnswers"]) {
      try {
        const arr = JSON.parse(sessionStorage.getItem(k) || localStorage.getItem(k) || "null");
        if (Array.isArray(arr) && arr.every(ch => ch === "a" || ch === "b")) { p = arr.join(""); break; }
      } catch {}
    }
  }
  return /^[ab]{5}$/.test(p || "") ? SCORES[p] : null; // 패턴→캐릭터명
}

// 4) 도우미: 한 요소에 .fade-line & 지연 적용
const addFade = (el, delaySec=0) => {
  if (!el) return;
  el.classList.add("fade-line");
  el.style.animationDelay = `${delaySec}s`;
};

// 5) DOM 반영 (.fade-line만 활용)
//   - main: 줄단위(네가 test에서 쓰던 방식 그대로)
//   - detail: 한 덩어리(줄바꿈은 <br>로)
function applyCharacter(name) {
  const data = CHAR_DATA[name] || CHAR_DATA["토야"];

  const nameEl   = document.querySelector(".character-name");
  const imgWrap  = document.querySelector(".character-img");
  const imgEl    = imgWrap?.querySelector("img") || (imgWrap && imgWrap.appendChild(document.createElement("img")));
  const mainEl   = document.querySelector(".character-description-main");
  const detailEl = document.querySelector(".character-description-detail");

  // 텍스트/이미지 교체
  if (nameEl) nameEl.textContent = data.label;
  if (imgEl) { imgEl.src = data.img; imgEl.alt = data.label; }

  // 메인: 줄단위로 span.fade-line + <br>
  if (mainEl) {
    const lines = data.main.split("\n");
    mainEl.innerHTML = lines.map((line, idx) =>
      `<span class="fade-line" style="animation-delay:${0.10 * idx}s">${line}</span>`
    ).join("<br>");
  }

  // 디테일: 한 덩어리(span.fade-line 1개). 줄바꿈은 <br>로 치환
  if (detailEl) {
    detailEl.innerHTML =
      `<span class="fade-line" style="animation-delay:${0.4}s">${data.detail.replace(/\n/g, "<br>")}</span>`;
  }

  // 이름/이미지 컨테이너에도 순차 지연 부여(원하면 생략 가능)
  addFade(nameEl, 0.05);
  addFade(imgWrap, 0.18);

  // 버튼 영역도 동일 방식으로
  const actions = document.querySelector(".result-action-section");
  addFade(actions, 0.55);
}

document.addEventListener("DOMContentLoaded", () => {
  const charName = readMateOrPattern() || "토야";
  applyCharacter(charName);

  sessionStorage.setItem('selectedMate', charName);

  // 타이틀/카드 섹션도 .fade-line로
  const titleSec = document.querySelector(".result-title-section");
  const card     = document.querySelector(".character-section");
  addFade(titleSec, 0.0);
  addFade(card, 0.12);

  // (선택) 버튼 이동
  const selectBtn = document.getElementById('select-btn');
  const sendBtn   = document.getElementById('send-btn');
  if (selectBtn) selectBtn.addEventListener('click', () => location.href = 'select.html');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const url = `send.html?mate=${encodeURIComponent(charName)}`;
      window.location.href = url;
    });
  }
});