let currentIndex = [0, 0];
function showSlide(carouselIndex) {
    const carousel = document.querySelectorAll('.carousel-images')[carouselIndex];
    const slides = carousel.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    currentIndex[carouselIndex] = (currentIndex[carouselIndex] + totalSlides) % totalSlides;

    const offset = -currentIndex[carouselIndex] * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlide(carouselIndex) {
    currentIndex[carouselIndex]++;
    showSlide(carouselIndex);
}

function prevSlide(carouselIndex) {
    currentIndex[carouselIndex]--;
    showSlide(carouselIndex);
}

let currentQuestionIndex = 0;
let userScore = 0;

const questions = [
    {
        numb: 1,
        question: "Quelle balise HTML est utilisée pour insérer une image ?",
        options: ["img", "image", "picture", "src"],
        answer: "<img>"
    },
    {
        numb: 2,
        question: "Quelle propriété CSS est utilisée pour changer la couleur de fond d'une page ?",
        options: ["background-color", "color", "bg-color", "background"],
        answer: "background-color"
    },
    {
        numb: 3,
        question: "Quel est l'élément utilisé pour déclarer une fonction en JavaScript ?",
        options: ["function", "fun", "def", "method"],
        answer: "function"
    },
    {
        numb: 4,
        question: "Que signifie l'acronyme CSS ?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        numb: 5,
        question: "Quelle méthode JavaScript est utilisée pour sélectionner un élément par son ID ?",
        options: ["getElementById()", "getElementsByClassName()", "querySelector()", "getElementByTagName()"],
        answer: "getElementById()"
    },
    {
        numb: 6,
        question: "Quel est le bon format pour lier un fichier CSS externe à une page HTML ?",
        options: ['link rel="stylesheet" href="style.css"', 'style src="style.css"', 'css src="style.css"', 'link ref="stylesheet" src="style.css"'],
        answer: '<link rel="stylesheet" href="style.css">'
    },
    {
        numb: 7,
        question: "Quel est le bon format pour ajouter un commentaire en JavaScript ?",
        options: ["// Commentaire", "!-- Commentaire --", "/ Commentaire /", "# Commentaire"],
        answer: "// Commentaire"
    }
];

// Récupérer les éléments du DOM
const startBtn = document.querySelector(".start_btn button");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const nextBtn = document.querySelector(".next_btn");
const restartQuiz = resultBox.querySelector(".restart");
const quitQuiz = resultBox.querySelector(".quit");
const overlay = document.querySelector('.overlay');

// Démarrer le quiz
startBtn.addEventListener("click", () => {
    quizBox.style.display = "block";
    startBtn.style.display = "none";
    showQuestion(currentQuestionIndex);
    nextBtn.style.display = "none";
});

function showQuestion(index) {
    const questionText = document.querySelector(".que_text");
    const question = questions[index];
    questionText.innerHTML = `<span>${question.numb}. ${question.question}</span>`;
    optionList.innerHTML = question.options.map(option => `<div class="option"><span>${option}</span></div>`).join('');
    const options = optionList.querySelectorAll(".option");

    // Ajouter un gestionnaire de clic pour chaque option
    options.forEach(option => {
        option.addEventListener("click", () => handleOptionClick(option, question.answer));
    });
}

// Gérer le clic sur une option
let selectedOption = null; // Variable pour garder la trace de l'option sélectionnée

function handleOptionClick(option, correctAnswer) {
    // Si une option a déjà été sélectionnée, on retire la couleur grise
    if (selectedOption !== null) {
        selectedOption.classList.remove("selected");
    }

    // Mettre en gris l'option sélectionnée
    option.classList.add("selected");

    // Vérifier la réponse et ajuster le score
    if (option.innerText === correctAnswer) {
        userScore++;
    }

    // Mettre à jour l'option sélectionnée
    selectedOption = option;

    // Afficher le bouton "Suivant"
    nextBtn.style.display = "block";
}

// Passer à la question suivante
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        nextBtn.style.display = "none";
    } else {
        showResult();
    }
});

// Afficher le résultat sous forme de pop-up
function showResult() {
    resultBox.style.display = "block";
    overlay.style.display = "block"; // Afficher l'overlay
    const scoreText = resultBox.querySelector(".score_text");
    scoreText.innerHTML = `<span>Vous avez obtenu ${userScore} sur ${questions.length} bonnes réponses.</span>`;
}

// Redémarrer le quiz
restartQuiz.addEventListener("click", () => {
    resultBox.style.display = "none";
    overlay.style.display = "none";  // Masquer l'overlay
    quizBox.style.display = "block";
    currentQuestionIndex = 0;
    userScore = 0;
    selectedOption = null;  // Réinitialiser l'option sélectionnée
    showQuestion(currentQuestionIndex);
    nextBtn.style.display = "none";
});

// Quitter le quiz
quitQuiz.addEventListener("click", () => {
    window.location.reload();
});
