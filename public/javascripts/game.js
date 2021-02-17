//Constantes para mandar a pantalla varios elementos
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

//Variables necesarias para el quuz
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

//Todas las preguntas que se presentaran en el quiz
let questions = [
    {
        question: '¿Como se diice el verbo "mirar" en ingles?',
        choice1: 'observe',
        choice2: 'look',
        choice3: 'lok',
        choice4: 'watchar',
        answer: 2,
    },
    {
        question:
            "¿Comó se dice Domingo en ingles?",
        choice1: "Sunday",
        choice2: "Monday",
        choice3: "Fryday",
        choice4: "Saturday",
        answer: 1,
    },
    {
        question: "¿Que significa 'Rubber' en español?",
        choice1: "Regla",
        choice2: "Lapiz",
        choice3: "Goma",
        choice4: "Rubio",
        answer: 3,
    },
    {
        question: "Where do you usually eat lunch?",
        choice1: "At 12",
        choice2: "With Jane",
        choice3: "Sandwich",
        choice4: "In the Cafeteria",
        answer: 4,
    },
    {
        question: "How long did you study for last night?",
        choice1: "With Bob",
        choice2: "English",
        choice3: "For three hours",
        choice4: "In my room",
        answer: 3,
    },
    {
        question: "How do you often play tennis?",
        choice1: "Almost every day",
        choice2: "For two hours",
        choice3: "With John",
        choice4: "On Tuesday",
        answer: 1,
    },
    {
        question: "How often do you write letters?",
        choice1: "On Mondays",
        choice2: "I wrote them often",
        choice3: "I write letters once a month",
        choice4: "I don't like to write",
        answer: 2,
    },
    {
        question: "My mother's cocking is great?",
        choice1: "My mother's cooking is great",
        choice2: "My mother has the best cook",
        choice3: "My mother is the best cock",
        choice4: "My mother cooks better than others",
        answer: 1,
    },
    {
        question: "She can hardly see it",
        choice1: "It is hard to see her",
        choice2: "She is hard with it",
        choice3: "She cannot see it very well",
        choice4: "She sees very hard",
        answer: 3,
    },
    {
        question: "How do you get to the school?",
        choice1: "With the train",
        choice2: "In train",
        choice3: "Riding bycicle",
        choice4: "By train",
        answer: 4,
    },
]

//Se definen los puntos y numero de preguntas
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

//Funcion para empezar juego
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

//Funcion para conseguir la siguiente pregunta
//Y guardar el resultado
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
	//al terminar el custinario te rederige a la siguiente pagina
        return window.location.assign('/end')
    };

    //Va incrementado la barra de preguntas
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    //Revuelve las preguntas de manera aleatoria
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question


    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

//Toma nuestea opcion y la evalua
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

//Funcion para el incrementar la puntuacion
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

