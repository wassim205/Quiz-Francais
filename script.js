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

//start quiz
const START = document.getElementById("startQuiz");
const Paragraph = document.getElementById("paragraphIntro");
START.addEventListener("click", function () {
  START.remove();
  Paragraph.remove();
  showQuestion(currentQuestionIndex);
});

// Function to shuffle the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(questions);

let currentQuestionIndex = 0;

// show questions
function showQuestion(index) {
  const questionContainer = document.getElementById("questionContainer");
  questionContainer.textContent = questions[index].question;

  const Qanswers = document.getElementById("answerContainer");
  Qanswers.innerHTML = "";
  const answerButtons = questions[index].answers.map((answer, answerIndex) => {
    const answerElement = document.createElement("button");
    answerElement.textContent = `${answerIndex + 1}. ${answer}`;
    answerElement.classList.add("answers-button");
    return answerElement;
  });

  answerButtons.forEach((button, answerIndex) => {
    button.addEventListener("click", () =>
      checkAnswer(answerIndex, button, answerButtons)
    );
    Qanswers.appendChild(button);
  });
}

function checkAnswer(answerIndex, buttonElement, buttons) {
  const correctAnswerIndex = questions[currentQuestionIndex].answers.indexOf(
    questions[currentQuestionIndex].correct
  );

  if (answerIndex === correctAnswerIndex) {
    buttonElement.style.backgroundColor = "green";
  } else {
    buttonElement.style.backgroundColor = "red";
    buttons[correctAnswerIndex].style.backgroundColor = "green";
  }
  disableButtons(buttons);
}

// Function to disable all buttons
function disableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = true; // Disable each button
  });
}
