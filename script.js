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

// Start quiz
const START = document.getElementById("startQuiz");
const Paragraph = document.getElementById("paragraphIntro");
const restartButtonContainer = document.getElementById(
  "restart-buttonContainer"
);
const statusContainer = document.getElementById("statusContainer");
let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;

START.addEventListener("click", function () {
  START.style.display = "none";
  Paragraph.style.display = "none";
  statusContainer.style.display = "block";
  shuffleArray(questions);
  showQuestion(currentQuestionIndex);
});

function shuffleArray(array) {
  // Shuffle logic remains unchanged...
}

function showQuestion(index) {
  const questionContainer = document.getElementById("questionContainer");
  questionContainer.textContent = questions[index].question;

  const answerContainer = document.getElementById("answerContainer");
  answerContainer.innerHTML = "";
  const answerButtons = questions[index].answers.map((answer, answerIndex) => {
    const answerElement = document.createElement("button");
    answerElement.textContent = `${answerIndex + 1}. ${answer}`;
    answerElement.classList.add("answers-button");
    answerElement.dataset.answerIndex = answerIndex;
    return answerElement;
  });

  answerButtons.forEach((button) => {
    button.addEventListener("click", () => checkAnswer(button, answerButtons));
    answerContainer.appendChild(button);
  });

  updateStatus();
  timing(); // Start the timer when the question is displayed
}

function checkAnswer(buttonElement, buttons) {
  const answerIndex = parseInt(buttonElement.dataset.answerIndex);
  const correctAnswerIndex = questions[currentQuestionIndex].answers.indexOf(
    questions[currentQuestionIndex].correct
  );

  if (answerIndex === correctAnswerIndex) {
    buttonElement.style.backgroundColor = "green";
    score++;
  } else {
    buttonElement.style.backgroundColor = "red";
    buttons[correctAnswerIndex].style.backgroundColor = "green";
  }
  disableButtons(buttons);
  showNextButton();
  updateStatus();
}

function disableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function displayResults() {
  const resultContainer = document.getElementById("resultContainer");
  const resultParagraph = document.getElementById("resultParagraph");
  const level = calculateLevel(score);

  resultParagraph.textContent = `Quiz completed! Your score: ${score}/${totalQuestions}. Estimated level: ${level}`;
  localStorage.setItem("quizScore", score);
  resultContainer.style.display = "block";
  document.getElementById("questionContainer").style.display = "none";
  document.getElementById("answerContainer").style.display = "none";
  showRestartButton();
}

function showRestartButton() {
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.classList.add("restart-button");
  restartButton.addEventListener("click", restartQuiz);
  restartButtonContainer.appendChild(restartButton);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  restartButtonContainer.innerHTML = "";
  const answerContainer = document.getElementById("answerContainer");
  const buttons = answerContainer.getElementsByTagName("button");
  for (let button of buttons) {
    button.style.backgroundColor = "";
    button.disabled = false;
  }

  document.getElementById("resultContainer").style.display = "none";
  document.getElementById("questionContainer").style.display = "block";
  document.getElementById("answerContainer").style.display = "block";
  statusContainer.style.display = "block";

  shuffleArray(questions);
  showQuestion(currentQuestionIndex);
}

function showNextButton() {
  const answerContainer = document.getElementById("next-buttonContainer");

  let nextButton = document.getElementById("next-button");
  if (!nextButton) {
    nextButton = document.createElement("button");
    nextButton.id = "next-button";
    nextButton.textContent = "Next";
    nextButton.classList.add("next-button");

    nextButton.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
      } else {
        displayResults();
      }
      nextButton.style.display = "none";
    });

    answerContainer.appendChild(nextButton);
  }

  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = "block";
  } else {
    displayResults();
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
  const statusContainer = document.getElementById("statusContainer");
  statusContainer.textContent = `Question Number: ${
    currentQuestionIndex + 1
  } / ${totalQuestions}`;
}

function timing() {
  let counter = 20;
  document.getElementById(
    "timer"
  ).textContent = `Time remaining: ${counter} seconds`;
  let intervalId = setInterval(() => {
    counter--;
    document.getElementById(
      "timer"
    ).textContent = `Time remaining: ${counter} seconds`;
    if (counter <= 0) {
      clearInterval(intervalId);
      disableButtons(document.querySelectorAll(".answers-button"));
      showNextButton();
    }
  }, 1000);
}

statusContainer.style.display = "none";

window.addEventListener("load", function () {
  const storedScore = localStorage.getItem("quizScore");
  if (storedScore) {
    const resultContainer = document.getElementById("resultContainer");
    const resultParagraph = document.getElementById("resultParagraph");
    resultParagraph.textContent = `Your score: ${storedScore}/${totalQuestions}. And your level is : ${calculateLevel(
      storedScore
    )}`;
    resultContainer.style.display = "block";
    resultParagraph.classList.add("resultParagraph");
  }
});
