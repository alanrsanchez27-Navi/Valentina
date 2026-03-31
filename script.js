const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const questionText = document.getElementById("questionText");
const mainAnimation = document.getElementById("mainAnimation");
const mainContainer = document.getElementById("mainContainer");
const successContainer = document.getElementById("successContainer");
const buttonsContainer = document.getElementById("buttonsContainer");
const successAnimation = document.getElementById("successAnimation");

const noTexts = [
  "¿Estás segura? 🥺",
  "Prometo compensarte con muchos besitos 💔",
  "Codie y trabaje duro para que meperdones",
  "Si seguis poniendo que no lo vas a romper",
  "Última oportunidad para este pobre gatito 💖",
];

// REEMPLAZA estas URLs por Lotties de gatitos que sí te gusten
const sadAnimations = [
  "https://lottie.host/d3224e11-2ba1-40cd-8792-5037af601266/mp4EGjO6V7.json",
  "https://lottie.host/75d70a4a-1973-40e1-8c38-fe4a8620b125/RH1KpTLDpc.json",
  "https://lottie.host/024f6004-5cd8-43ee-9c56-e9f2a50a6203/sQylcJZzop.json",
  "https://lottie.host/55a5f901-6750-4991-8d38-6aa832a5ead2/FrcG2Yrdca.json",
  "URL_GATITO_TRISTE_5",
];

const happyAnimation =
  "https://lottie.host/578100a7-7e77-43bc-9ab2-1c3b8908ab18/VYFWZ3YO4a.json";

let noClickCount = 0;
let yesScale = 1;

const MAX_YES_SCALE_MOBILE = 1.65;
const MAX_YES_SCALE_DESKTOP = 1.9;

function getMaxScale() {
  return window.innerWidth <= 480
    ? MAX_YES_SCALE_MOBILE
    : MAX_YES_SCALE_DESKTOP;
}

function updateYesButton() {
  yesScale = Math.min(yesScale + 0.16, getMaxScale());
  yesBtn.style.transform = `translate(-115%, -50%) scale(${yesScale})`;

  yesBtn.classList.remove("bump");
  void yesBtn.offsetWidth;
  yesBtn.classList.add("bump");
}

function updateQuestionText(text) {
  questionText.classList.remove("fade-swap");
  void questionText.offsetWidth;
  questionText.textContent = text;
  questionText.classList.add("fade-swap");
}

function updateMainAnimation(src) {
  if (!src) return;
  mainAnimation.load(src);
  mainAnimation.setAttribute("src", src);
}

function moveNoButton() {
  const containerRect = buttonsContainer.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const padding = window.innerWidth <= 480 ? 10 : 14;

  const maxX = containerRect.width - btnWidth - padding;
  const maxY = containerRect.height - btnHeight - padding;

  const randomX = Math.max(padding, Math.random() * maxX);
  const randomY = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transform = "translate(0, 0)";
}

function createConfetti() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = Math.random() > 0.5 ? "💖" : "✨";
    heart.classList.add("heart-confetti");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2.5 + 2.5 + "s";
    heart.style.opacity = Math.random() * 0.4 + 0.6;
    heart.style.fontSize = Math.random() * 1.2 + 1 + "rem";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
}

function showSuccess() {
  mainContainer.classList.remove("is-visible");

  setTimeout(() => {
    successContainer.classList.add("is-visible");
    if (happyAnimation && successAnimation) {
      successAnimation.load(happyAnimation);
      successAnimation.setAttribute("src", happyAnimation);
    }
    createConfetti();
  }, 250);
}

function escapeNoButton() {
  noBtn.classList.remove("shiver");
  void noBtn.offsetWidth;
  noBtn.classList.add("shiver");

  setTimeout(() => {
    moveNoButton();
  }, 180);
}

noBtn.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount >= 5) {
    showSuccess();
    return;
  }

  updateQuestionText(noTexts[noClickCount - 1]);
  updateMainAnimation(sadAnimations[noClickCount - 1] || sadAnimations[0]);
  updateYesButton();
  escapeNoButton();
});

yesBtn.addEventListener("click", () => {
  showSuccess();
});

window.addEventListener("resize", () => {
  yesBtn.style.transform = `translate(-115%, -50%) scale(${yesScale})`;
});
