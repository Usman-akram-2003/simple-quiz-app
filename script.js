const questions = [
    {
        Question: "Which is largest animal on earth?",
        Answers: [
            { text: "Elephant", correct: false },
            { text: "Girafee", correct: false },
            { text: "Rhino", correct: false },
            { text: "Blue Whale", correct: true }
        ]
    },
    {
        Question: "Which is founder of ottoman empire?",
        Answers: [
            { text: "Orhan", correct: false },
            { text: "Osman", correct: true },
            { text: "MehmetII", correct: false },
            { text: "SulemanI", correct: false }
        ]
    },
    {
        Question: "What is name of Earth's moon",
        Answers: [
            { text: "Luna", correct: true },
            { text: "Titan", correct: false },
            { text: "Pluto", correct: false },
            { text: "k-27", correct: false }
        ]
    },
    {
        Question: "Which is fast land animal on earth?",
        Answers: [
            { text: "Lion", correct: false },
            { text: "deer", correct: false },
            { text: "Cheetah", correct: true },
            { text: "Zebra", correct: false }
        ]
    }
];

const questionElement = $("#question");
const answerbtn = $("#answer-buttons");
const nextbtn = $("#next-btn");

let questionindex = 0;
let score = 0;

function startquiz() {
    questionindex = 0;
    score = 0;
    nextbtn.text("next");
    nextbtn.css("display", "none"); // hide next button initially
    showQuestion();
}

function showQuestion() {
    answerbtn.empty();
    let currentQuestion = questions[questionindex];
    let questionNo = questionindex + 1;
    questionElement.text(questionNo + "." + currentQuestion.Question);
    currentQuestion.Answers.forEach(answer => {
        const button = $("<button></button>");
        button.text(answer.text);
        button.addClass("btn");
        button.data("correct", answer.correct);
        answerbtn.append(button);
        button.click(selectAnswer);
    });
}

function selectAnswer(e) {
    const selectbtn = e.target;
    const isCorrect = $(selectbtn).data("correct") === true;

    if (isCorrect) {
        $(selectbtn).addClass("correct");
        score++;
    } else {
        $(selectbtn).addClass("incorrect");
    }

    answerbtn.children().each(function () {
        const button = $(this);
        if (button.data("correct") === true) {
            button.addClass("correct");
        }
        button.prop("disabled", true);
    });

    nextbtn.css("display", "block");
}

function handleNext() {
    questionindex++; // ✅ was incorrectly written before
    if (questionindex < questions.length) {
        showQuestion();
        nextbtn.css("display", "none");
    } else {
        showScore();
    }
}

function showScore() {
    answerbtn.empty();
    questionElement.text(`You got ${score} out of ${questions.length}!`);
    nextbtn.text("Play Again");
    nextbtn.css("display", "block");
    nextbtn.off("click").click(startquiz); // reset click to restart quiz
}

nextbtn.click(function () {
    if (questionindex < questions.length) {
        handleNext();
    } else {
        showQuestion();
    }
});

startquiz();

    