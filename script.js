
let C = 0;
let currentQuestion = 0;
let name = "";

const questions = [
  "당신의 이름을 입력하세요:",
  "Q1) 사람들이 많은 장소에 가면 긴장됩니까?",
  "Q2) 종종 특별한 음식을 먹지 않았음에도 배가 아픈 경험을 합니까?",
  "Q3) 삼성라이온즈를 좋아합니까?",
  "Q4) 방 안에서 큰 소리를 내지 못합니까?",
  "Q5) 똥을 쌀 때 눈물이 납니까? (배가 아프지 않아도)"
];

const startScreen = document.getElementById("start-screen");
const app = document.getElementById("app");
const questionBox = document.getElementById("question-box");
const answerBox = document.getElementById("answer-box");
const bgmAudio = document.getElementById("bgm-audio");

function startTest() {
  startScreen.style.display = "none";
  app.style.display = "block";
  bgmAudio.play();
  showQuestion();
}

function showQuestion() {
  if (currentQuestion === 0) {
    questionBox.innerHTML = questions[0];
    answerBox.innerHTML = `<input id="nameInput" type="text"><br><button onclick="nextQuestion()">확인</button>`;
  } else {
    questionBox.innerHTML = questions[currentQuestion];
    answerBox.innerHTML = `
      <button onclick="selectAnswer(2)">네</button>
      <button onclick="selectAnswer(1)">아니오</button>
    `;
  }
}

function nextQuestion() {
  if (currentQuestion === 0) {
    name = document.getElementById("nameInput").value;
    if (name.trim() === "") {
      alert("이름을 입력하세요!");
      return;
    }
  }
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function selectAnswer(score) {
  C += score;
  nextQuestion();
}

function showResult() {
  let resultText = "";
  let percentage = 0;
  let imageSrc = "";

  if (C <= 5) {
    percentage = "0%";
    resultText = `아직은 정상인 ${name}님! 하지만 최서진의 기운이 살짝 느껴진다… 조심하세요.`;
    imageSrc = "0.png";
  } else if (C <= 7) {
    percentage = "35%";
    resultText = `간혹 쓸데없는 드립, 이상한 춤을 추는 ${name}님! 서진이랑 눈 마주치지 마세요.`;
    imageSrc = "35.png";
  } else if (C <= 9) {
    percentage = "75%";
    resultText = `이미 절반은 최서진! 친구들이 ${name}님을 서서히 피하기 시작했어요…`;
    imageSrc = "75.png";
  } else {
    percentage = "100%";
    resultText = `당신은 이제 완전체 최서진, ${name}님!! 아무도 당신을 말릴 수 없습니다.`;
    imageSrc = "100.png";
  }

  questionBox.innerHTML = `${name}님의 점수는 ${C}점 입니다.<br>최서진병 ${percentage}`;
  answerBox.innerHTML = `
    <p>${resultText}</p>
    <img src="\${imageSrc}" alt="결과 이미지">
  `;
}
