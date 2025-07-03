console.log('Hello World');
const questions = [
  {
    question: 'What is your name?',
    answers: [
      { text: 'Khaled', correct: false },
      { text: 'omar', correct: true },
      { text: 'ahmad', correct: false },
      { text: 'mohammad', correct: false },
    ],
  },
  {
    question: 'Where do you live?',
    answers: [
      { text: 'Khaled', correct: false },
      { text: 'omar', correct: false },
      { text: 'lebanon', correct: true },
      { text: 'mohammad', correct: false },
    ],
  },
  {
    question: 'What is your name?',
    answers: [
      { text: 'Khaled', correct: false },
      { text: 'omar', correct: false },
      { text: 'mark', correct: true },
      { text: 'mohammad', correct: false },
    ],
  },
  {
    question: 'What is an english name?',
    answers: [
      { text: 'Khaled', correct: false },
      { text: 'omar', correct: false },
      { text: 'ahmad', correct: false },
      { text: 'hal', correct: true },
    ],
  },
];
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
let currenQuestionIndex = 0;
let score = 0;

function StartQuiz() {
  currenQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currenQuestionIndex];
  let questionno = currenQuestionIndex + 1;
  questionElement.innerHTML = questionno + '. ' + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedbutton = e.target;
  const iscorrect = selectedbutton.dataset.correct === 'true';
  if (iscorrect) {
    selectedbutton.classList.add('correct');
    score++;
  } else {
    selectedbutton.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}
function showScore() {
  resetState();
  questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again !!';
  nextButton.style.display = 'block';
}
function handleNextButton() {
  currenQuestionIndex++;
  if (currenQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener('click', () => {
  if (currenQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    StartQuiz();
  }
});
StartQuiz();
