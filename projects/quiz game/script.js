const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      {text: "Hyper Text Multi Language", correct: false},
      {text: "Hyper Text Multiple Language", correct: false},
      {text: "Hyper Text Markup Language", correct: true},
      {text: "Home Text Multi Language", correct: false},
    ]
  },
  {
    question: "Which HTML tag is used to define an internal stylesheet?",
    answers: [
      {text: "<style>", correct: true},
      {text: "<styles>", correct: false},
      {text: "css", correct: false},
      {text: "script", correct: false},
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      {text: "Creative Style Sheets", correct: false},
      {text: "colorful Style Sheets", correct: false},
      {text: "Computer Style Sheets", correct: false},
      {text: "Cascading Style Sheets", correct: true},
    ]
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  nextButton.style.display = 'block';
  showQuestion();
}

function showQuestion(){
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
  answerButton.innerHTML = '';
  
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer));
    answerButton.appendChild(button);
  });
}

function selectAnswer(answer) {
  if (answer.correct) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  answerButton.innerHTML = '';
  nextButton.style.display = 'none'; // Hide the next button when done
}

document.getElementById("start-btn").addEventListener('click', startQuiz);
