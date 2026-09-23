document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector(".start_btn button");
    const quizBox = document.querySelector(".quiz_box");
    const resultBox = document.querySelector(".result_box");
    const optionList = document.querySelector(".option_list");
    const nextBtn = document.querySelector(".next_btn");
    const overlay = document.querySelector(".overlay");
    if (!startBtn || !quizBox || !resultBox || !optionList || !nextBtn || !overlay) return;

    const questions = [
        { question: "Quelle balise HTML est utilisée pour insérer une image ?", options: ["img", "image", "picture", "src"], answer: "img" },
        { question: "Quelle propriété CSS est utilisée pour changer la couleur de fond d'une page ?", options: ["background-color", "color", "bg-color", "background"], answer: "background-color" },
        { question: "Quel est l'élément utilisé pour déclarer une fonction en JavaScript ?", options: ["function", "fun", "def", "method"], answer: "function" },
        { question: "Que signifie l'acronyme CSS ?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
        { question: "Quelle méthode JavaScript est utilisée pour sélectionner un élément par son ID ?", options: ["getElementById()", "getElementsByClassName()", "querySelector()", "getElementByTagName()"], answer: "getElementById()" },
        { question: "Quel est le bon format pour lier un fichier CSS externe à une page HTML ?", options: ['link rel="stylesheet" href="style.css"', 'style src="style.css"', 'css src="style.css"', 'link ref="stylesheet" src="style.css"'], answer: 'link rel="stylesheet" href="style.css"' },
        { question: "Quel est le bon format pour ajouter un commentaire en JavaScript ?", options: ["// Commentaire", "!-- Commentaire --", "/ Commentaire /", "# Commentaire"], answer: "// Commentaire" }
    ];
    let current = 0, score = 0, answered = false;
    const render = () => {
        answered = false;
        const question = questions[current];
        document.querySelector(".que_text").textContent = (current + 1) + ". " + question.question;
        optionList.innerHTML = "";
        question.options.forEach((text) => {
            const button = document.createElement("button");
            button.type = "button"; button.className = "option"; button.textContent = text;
            button.addEventListener("click", () => select(button, question.answer));
            optionList.appendChild(button);
        });
        nextBtn.style.display = "none";
    };
    const select = (button, answer) => {
        if (answered) return;
        answered = true;
        const correct = button.textContent === answer;
        if (correct) score++;
        optionList.querySelectorAll(".option").forEach((item) => {
            item.disabled = true;
            item.classList.add(item.textContent === answer ? "correct" : (item === button ? "incorrect" : "disabled"));
        });
        nextBtn.style.display = "block";
    };
    startBtn.addEventListener("click", () => { startBtn.style.display = "none"; quizBox.style.display = "block"; render(); });
    nextBtn.addEventListener("click", () => {
        if (++current < questions.length) render();
        else { resultBox.querySelector(".score_text").textContent = "Vous avez obtenu " + score + " sur " + questions.length + " bonnes réponses."; resultBox.style.display = "block"; overlay.style.display = "block"; }
    });
    resultBox.querySelector(".restart").addEventListener("click", () => { current = 0; score = 0; resultBox.style.display = "none"; overlay.style.display = "none"; render(); });
    resultBox.querySelector(".quit").addEventListener("click", () => window.location.reload());
});
