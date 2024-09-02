
const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');

const questions = [
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Central Print Unit", "Computer Personal Unit", "Central Processor Unit"],
        correctAnswer: "Central Processing Unit"
    },
    {
        question: "Which of these is an operating system?",
        options: ["Python", "JavaScript", "Linux", "HTML"],
        correctAnswer: "Linux"
    },
    {
        question: "What is the full form of RAM?",
        options: ["Read Access Memory", "Random Access Memory", "Read Active Memory", "Random Access Module"],
        correctAnswer: "Random Access Memory"
    },
    {
        question: "Which company developed the Java programming language?",
        options: ["Microsoft", "Sun Microsystems", "IBM", "Apple"],
        correctAnswer: "Sun Microsystems"
    },
    {
        question: "What does HTTP stand for?",
        options: ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "HyperText Transport Protocol", "HyperText Transfer Procedure"],
        correctAnswer: "HyperText Transfer Protocol"
    },
    {
        question: "Which of these is a web browser?",
        options: ["Word", "Excel", "Chrome", "Photoshop"],
        correctAnswer: "Chrome"
    },
    {
        question: "What is the main function of an operating system?",
        options: ["To manage hardware resources", "To compile code", "To create graphics", "To connect to the internet"],
        correctAnswer: "To manage hardware resources"
    },
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        options: ["C", "C++", "Java", "Python"],
        correctAnswer: "C"
    },
    {
        question: "What does GUI stand for?",
        options: ["Graphical User Interface", "Graphical Unified Interface", "General User Interface", "General Unified Interface"],
        correctAnswer: "Graphical User Interface"
    },
    {
        question: "What is the primary purpose of an antivirus software?",
        options: ["To enhance graphics", "To protect against malware", "To improve system speed", "To manage files"],
        correctAnswer: "To protect against malware"
    }
];

let currentQuestionIndex = 0;
let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = questions.length;


function loadQuestion(){
    const data = questions[currentQuestionIndex];
    _result.innerHTML = "";
    showQuestion(data);
}


function eventListeners(){
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});

function showQuestion(data){
    _checkBtn.disabled = false;
    correctAnswer = data.correctAnswer;
    let optionsList = data.options;
   
    optionsList = optionsList.sort(() => Math.random() - 0.5);

    _question.innerHTML = `${data.question}`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${String.fromCharCode(97 + index)}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}

function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}


function checkAnswer(){
    _checkBtn.disabled = true;
    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if(selectedAnswer === HTMLDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }
}


function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount(){
    askedCount++;
    setCount();
    if(askedCount === totalQuestion){
        _result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        currentQuestionIndex++;
        setTimeout(function(){
            loadQuestion();
        }, 300);
    }
}

function setCount(){
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function restartQuiz(){
    currentQuestionIndex = 0;
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}
