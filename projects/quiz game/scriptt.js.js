const questions = [

    {
      question:"What does HTML stand for?",
      answers: [
        {text:"Hyper Text Multi Language", correct: false},
        {text:"Hyper Text Multiple Language", correct: false},
        {text:"Hyper Text Markup Language", correct: true },
        {text:"Home Text Multi Language", correct: false},
      ]
    },
    {
      question:"Where in an HTML document is the correct place to refer to an external stylesheet?",
      answers: [
        {text:"At the end of the document", correct:false},
        {text:"In the <head> section", correct: true},
        {text:"At the top of the document", correct: false},
        {text:"In the <body> section", correct:false},
      ]
    },
   
]
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
 
function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button); 
  });
   
}