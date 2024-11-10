// questions
const questions = [
  {
    question: "Quelle est la capitale de la France ?",
    answers: ["Lyon", "Marseille", "Paris", "Toulouse"],
    correct: "Paris",
  },
  {
    question:
      "Quel mot complète cette phrase : 'Je ______ aller à la bibliothèque pour étudier.'",
    answers: ["peux", "veux", "vais", "dois"],
    correct: "vais",
  },
  {
    question: "Quel est le synonyme de 'rapide' ?",
    answers: ["lent", "vite", "calme", "petit"],
    correct: "vite",
  },
  {
    question: "Quel mot signifie 'envoyer une lettre' ?",
    answers: ["écrire", "poster", "recevoir", "répondre"],
    correct: "poster",
  },
  {
    question: "Comment dit-on 'to live' en français ?",
    answers: ["vivre", "manger", "chanter", "courir"],
    correct: "vivre",
  },
  {
    question:
      "Choisissez la bonne phrase : 'Il _____ français depuis deux ans.'",
    answers: ["apprend", "apprendre", "apprends", "appris"],
    correct: "apprend",
  },
  {
    question: "Complétez : 'Elle a acheté une robe _____.'",
    answers: ["verte", "vert", "verts", "verre"],
    correct: "verte",
  },
  {
    question: "Quel mot est opposé à 'grand' ?",
    answers: ["petit", "haut", "large", "gros"],
    correct: "petit",
  },
  {
    question: "Que signifie 'beau' ?",
    answers: ["nice", "ugly", "beautiful", "lazy"],
    correct: "beautiful",
  },
  {
    question: "Choisissez le bon mot : 'Elle aime _____ des romans.'",
    answers: ["lire", "lis", "lit", "lirez"],
    correct: "lire",
  },
];

const START = document.getElementById("startQuiz");
const Paragraph = document.getElementById("paragraphIntro");
const restartButtonContainer = document.getElementById(
  "restart-buttonContainer"
);
const statusContainer = document.getElementById("statusContainer");
const resultContainer = document.getElementById("resultContainer");
const resultParagraph = document.getElementById("resultParagraph");
const timerDisplay = document.getElementById("timer");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");
const nextButtonContainer = document.getElementById("next-buttonContainer");

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;
let timerIntervalId = null;

START.addEventListener("click", startQuiz);

function startQuiz() {
  // Reset all states
  currentQuestionIndex = 0;
  score = 0;
  clearUI();

  console.log("Quiz started"); // Debugging line

  // Hide start elements and show quiz elements
  START.style.display = "none";
  Paragraph.style.display = "none";
  statusContainer.style.display = "block";
  questionContainer.style.display = "block";
  answerContainer.style.display = "block";

  // Start the quiz
  shuffleArray(questions);
  showQuestion(currentQuestionIndex);
}

function clearUI() {
  // Clear all containers
  resultContainer.style.display = "none";
  nextButtonContainer.innerHTML = "";
  answerContainer.innerHTML = "";
  clearTimer();
}

function clearTimer() {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
  if (timerDisplay) { // Ensure timerDisplay is defined
    timerDisplay.textContent = ""; // Clear the timer display
  }
}

function showQuestion(index) {
  clearUI();

  console.log(`Showing question ${index}`); // Debugging line
  console.log(questions[index]); // Debugging line

  // Display question
  questionContainer.textContent = questions[index].question;

  // Create answer buttons
  const answerButtons = questions[index].answers.map((answer, answerIndex) => {
    const button = document.createElement("button");
    button.textContent = `${answerIndex + 1}. ${answer}`;
    button.classList.add("answers-button");
    button.dataset.answerIndex = answerIndex;
    return button;
  });

  // Add event listeners and append buttons
  answerButtons.forEach((button) => {
    button.addEventListener("click", () => checkAnswer(button, answerButtons));
    answerContainer.appendChild(button);
  });

  updateStatus();
  startTimer();
}

function startTimer() {
  let counter = 20;
  timerDisplay.textContent = `Time remaining: ${counter} seconds`;

  timerIntervalId = setInterval(() => {
    counter--;

    if (counter <= 0) {
      clearTimer();
      const buttons = document.querySelectorAll(".answers-button");
      disableButtons(buttons);
      showNextButton();
    }
  }, 1000);
}

function checkAnswer(selectedButton, allButtons) {
  clearTimer();

  const selectedIndex = parseInt(selectedButton.dataset.answerIndex);
  const correctAnswerIndex = questions[currentQuestionIndex].answers.indexOf(
    questions[currentQuestionIndex].correct
  );

  if (selectedIndex === correctAnswerIndex) {
    selectedButton.style.backgroundColor = "green";
    score++;
  } else {
    selectedButton.style.backgroundColor = "red";
    allButtons[correctAnswerIndex].style.backgroundColor = "green";
  }

  disableButtons(allButtons);
  showNextButton();
  updateStatus();
}

function showNextButton() {
  nextButtonContainer.innerHTML = ""; // Clear previous button

  if (currentQuestionIndex >= questions.length - 1) {
    displayResults();
    return;
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.classList.add("next-button");
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  });

  nextButtonContainer.appendChild(nextButton);
}

function displayResults() {
  clearUI();

  const level = calculateLevel(score);
  resultParagraph.textContent = `Quiz completed! Your score: ${score}/${totalQuestions}. Estimated level: ${level}`;
  resultParagraph.classList.add("resultParagraph");

  localStorage.setItem("quizScore", score);
  resultContainer.style.display = "block";
  questionContainer.style.display = "none";
  answerContainer.style.display = "none";

  showRestartButton();
}

function showRestartButton() {
  restartButtonContainer.innerHTML = "";
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.classList.add("restart-button");
  restartButton.addEventListener("click", startQuiz);
  restartButtonContainer.appendChild(restartButton);
}

// Helper functions remain the same
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function calculateLevel(score) {
  const levels = [
    { min: 0, max: 2, level: "Niveau A1" },
    { min: 3, max: 5, level: "Niveau A2" },
    { min: 6, max: 7, level: "Niveau B1" },
    { min: 8, max: 8, level: "Niveau B2" },
    { min: 9, max: 9, level: "Niveau C1" },
    { min: 10, max: 10, level: "Niveau C2" },
  ];

  const level = levels.find(
    (level) => score >= level.min && score <= level.max
  );
  return level ? level.level : "Niveau inconnu";
}

function updateStatus() {
  statusContainer.textContent = `Question Number: ${
    currentQuestionIndex + 1
  } / ${totalQuestions}`;
}

function disableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

// Load previous score on page load
window.addEventListener("load", function () {
  const storedScore = localStorage.getItem("quizScore");
  if (storedScore) {
    resultParagraph.textContent = `Your previous score: ${storedScore}/${totalQuestions}. Estimated level: ${calculateLevel(
      parseInt(storedScore)
    )}`;
    resultParagraph.classList.add("resultParagraph");
    resultContainer.style.display = "block";
  }
});
