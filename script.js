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
let score = 0; // Initialize score
const totalQuestions = questions.length; // Total number of questions
// show questions
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

  const nextButton = document.getElementById("next-button");
  if (nextButton) {
    nextButton.style.display = "block";
  }

  updateStatus(); // Update status display when showing a question
}

function checkAnswer(buttonElement, buttons) {
  const answerIndex = parseInt(buttonElement.dataset.answerIndex);
  const correctAnswerIndex = questions[currentQuestionIndex].answers.indexOf(
    questions[currentQuestionIndex].correct
  );

  if (answerIndex === correctAnswerIndex) {
    buttonElement.style.backgroundColor = "green";
    score++; // Increment score for correct answer
  } else {
    buttonElement.style.backgroundColor = "red";
    buttons[correctAnswerIndex].style.backgroundColor = "green";
  }
  disableButtons(buttons);
  showNextButton();
  updateStatus(); // Update status display after answering
}

function disableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
  });
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
        const level = calculateLevel(score);
        alert(
          `Quiz completed! Your score: ${score}/${totalQuestions}. Estimated level: ${level}`
        );
      }
      nextButton.style.display = "none";
    });

    answerContainer.appendChild(nextButton);
  }

  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = "block";
  } else {
    const level = calculateLevel(score);
    alert(
      `Quiz completed! Your score: ${score}/${totalQuestions}. Estimated level: ${level}`
    );
  }
}

function calculateLevel(score) {
  if (score <= 2) return "Niveau A1";
  if (score <= 5) return "Niveau A2";
  if (score <= 7) return "Niveau B1";
  if (score === 8) return "Niveau B2";
  if (score === 9) return "Niveau C1";
  if (score === 10) return "Niveau C2";
  return "Niveau inconnu";
}

function updateStatus() {
  const statusContainer = document.getElementById("statusContainer");
  statusContainer.textContent = `Question Number: ${
    currentQuestionIndex + 1
  } / ${totalQuestions}`;
}
