const questions = [
  {
    question: "꿈 속을 헤매다 들어온 낯선 오두막,\n 안내 데스크에는 아무도 보이지 않는다.",
    choices: ["누군가 나타날 때까지 기다린다", "상점을 구경하며 기다린다"]
  },
  {
    question: "주위를 둘러보니 편지가 여기저기 쌓여있다.\n여긴.. 우체국인가?\n그 때, 구석에서 갑자기 무슨 소리가 들린다.",
    choices: ["어디서 난 소리인지 찾아본다", "무서우니 못 들은 척 한다"]
  },
  {
    question: "바닥에 낯선 이의 편지가 떨어져 있다.\n뭐지? 누가 흘린 건가?",
    choices: ["‘안에 무슨 이야기가 써 있을까?’\n조심스럽게 열어본다", "‘왠지 중요한 물건 같아 보여..’\n책상 위에 올려둔다"]
  },
  {
    question: "테이블 위에 놓인 따듯한 차와 편지지 한 장,\n마치 날 위해 준비된 듯 한다.",
    choices: ["‘심심해서 할 것도 없는데..’\n편지지 위에 뭔가 적어 본다", "‘날이 너무 추우니까..’\n차를 한모금 마셔 본다"]
  },
  {
    question: "종이 울리며 열리는 오두막 한 켠의 작은 문,\n눈 위로 찍힌 발자국이 어딘가로 이어진다",
    choices: ["‘나 말고 누가 있었던 걸까?’\n발자국을 따라가본다", "‘으윽.. 너무 추운데?’\n재빨리 문을 닫는다"]
  }
];

let current = 0;
const answers = [];

const questionText = document.getElementById("question-text");
const choiceA = document.getElementById("choice-a");
const choiceB = document.getElementById("choice-b");
const prevBtn = document.getElementById("prev-btn");
const progress = document.getElementById("progress-bar");

const fadeOverlay = document.getElementById("fade-overlay");

function renderQuestion() {
  // 1. 어둡게 만들기
  fadeOverlay.style.opacity = "1";

  setTimeout(() => {
    // 2. 질문/선택지 변경
    const q = questions[current];

    // 줄 단위로 나누기 + <span>으로 감싸기
    const lines = q.question.split('\n');
    questionText.innerHTML = lines.map((line, idx) => {
      return `<span class="fade-line delay-${idx}">${line}</span>`;
    }).join("<br>");

    // 선택지
    choiceA.innerHTML = q.choices[0].replace(/\n/g, "<br>");
    choiceB.innerHTML = q.choices[1].replace(/\n/g, "<br>");

    progress.style.width = `${(current / (questions.length)) * 100}%`;
    prevBtn.style.display = current > 0 ? "inline-block" : "none";

    // 3. 다시 밝게 만들기
    fadeOverlay.style.opacity = "0";
  }, 300); // 어두워지는 시간만큼 기다렸다가!
}


function selectAnswer(answer) {
  // 클릭 반응
  (answer === 'a' ? choiceA : choiceB).classList.add("clicked");

  // 저장
  answers[current] = answer;

  // 애니메이션 후 다음 질문
  setTimeout(() => {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    } else {
      // 결과 조합 문자열 만들고 이동
      const resultKey = answers.join('');
      window.location.href = `result.html?result=${resultKey}`;
    }
  }, 300);
}

// 이벤트 연결
choiceA.addEventListener("click", () => selectAnswer('a'));
choiceB.addEventListener("click", () => selectAnswer('b'));
prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

renderQuestion();
