const quizArray = [
  {
    id: 1,
    question: "Hva brukes en dreiebenk til?",
    options: [
      "Sveising",
      "Bearbeiding av roterende materialer",
      "Maling",
      "Montering",
    ],
    correctAnswer: "Bearbeiding av roterende materialer",
  },
  {
    id: 2,
    question: "Hva er forskjellen på serie- og parallellkobling?",
    options: [
      "Serie gir samme spenning over alle komponenter",
      "Parallell gir samme strøm gjennom alle komponenter",
      "Serie deler spenningen mellom komponenter",
      "Ingen forskjell",
    ],
    correctAnswer: "Serie deler spenningen mellom komponenter",
  },
  {
    id: 3,
    question: "Hva er normal kroppstemperatur hos mennesker?",
    options: ["35°C", "37°C", "39°C", "40°C"],
    correctAnswer: "37°C",
  },
  {
    id: 4,
    question: "Hva betyr kondisjon?",
    options: [
      "Kroppens evne til å utføre langvarig arbeid",
      "Muskelstyrke",
      "Hurtighet",
      "Fleksibilitet",
    ],
    correctAnswer: "Kroppens evne til å utføre langvarig arbeid",
  },
  {
    id: 5,
    question: "Hva betyr opphavsrett?",
    options: [
      "Rett til å kopiere alt",
      "Rettigheter til eget kreativt arbeid",
      "Rett til gratis programvare",
      "Rett til reklame",
    ],
    correctAnswer: "Rettigheter til eget kreativt arbeid",
  },
  {
    id: 6,
    question: "Hva er demokrati?",
    options: ["Styre av en konge", "Folkestyre", "Militærstyre", "Diktatur"],
    correctAnswer: "Folkestyre",
  },
  {
    id: 7,
    question: "Hva er markedsføring?",
    options: [
      "Å produsere varer",
      "Å selge varer",
      "Å designe varer",
      "Å utvikle varer",
    ],
    correctAnswer: "Å selge varer",
  },
  {
    id: 8,
    question: "Hva brukes en mikrometer til?",
    options: [
      "Måle temperatur",
      "Måle svært små lengder nøyaktig",
      "Måle vekt",
      "Måle strøm",
    ],
    correctAnswer: "Måle svært små lengder nøyaktig",
  },
  {
    id: 9,
    question: "Hva er en kommune i Norge?",
    options: [
      "En type skole",
      "En administrativ enhet",
      "En type bedrift",
      "En type organisasjon",
    ],
    correctAnswer: "En administrativ enhet",
  },
  {
    id: 10,
    question: "Hva kan du gjøre for å bidra til trivsel på skolen?",
    options: [
      "Ignorere andre",
      "Være respektfull og hjelpsom",
      "Svare på spørsmål",
      "Lese bøker",
    ],
    correctAnswer: "Være respektfull og hjelpsom",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  const quizQuestion = document.getElementById("quizQuestion");
  const options = document.querySelectorAll(".option");
  const nextButton = document.getElementById("nextButton");

  const leaderboardContainer = document.getElementById("leaderboardContainer");
  const namePrompt = document.getElementById("namePrompt");
  const playerNameInput = document.getElementById("playerName");
  const submitNameBtn = document.getElementById("submitName");
  const highscoresDiv = document.getElementById("highscores");
  const highscoreList = document.getElementById("highscoreList");

  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOption = null;
  let answered = false;

  function loadQuiz() {
    const question = quizArray[currentQuestionIndex];
    quizQuestion.textContent = question.question;

    options.forEach((btn, index) => {
      btn.textContent = question.options[index];
      btn.className = "option";
      btn.onclick = () => selectOption(btn);
    });

    selectedOption = null;
    answered = false;
  }

  function selectOption(button) {
    if (answered) return;
    options.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedOption = button;
  }

  nextButton.onclick = () => {
    const currentQuestion = quizArray[currentQuestionIndex];

    if (!answered) {
      if (!selectedOption) return;
      answered = true;

      options.forEach((btn) => {
        if (btn.textContent === currentQuestion.correctAnswer) {
          btn.classList.add("correct");
        } else if (btn === selectedOption) {
          btn.classList.add("wrong");
        }
      });

      if (selectedOption.textContent === currentQuestion.correctAnswer) score++;
    } else {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizArray.length) {
        loadQuiz();
      } else {
        quizQuestion.textContent = `Ferdig! Din score: ${score}/${quizArray.length}`;
        document.querySelector(".quizOptions").style.display = "none";
        nextButton.style.display = "none";
        leaderboardContainer.style.display = "block";
      }
    }
  };

  // Leaderboard submission
  submitNameBtn.onclick = () => {
    const name = playerNameInput.value.trim();
    if (!name) return alert("Skriv inn et navn!");

    let storedScores = JSON.parse(localStorage.getItem("highscores") || "[]");
    storedScores.push({ name: name, score: score });
    storedScores.sort((a, b) => b.score - a.score);
    storedScores = storedScores.slice(0, 5);
    localStorage.setItem("highscores", JSON.stringify(storedScores));

    namePrompt.style.display = "none";
    highscoresDiv.style.display = "block";
    highscoreList.innerHTML = "";
    storedScores.forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = `${entry.name}: ${entry.score}`;
      highscoreList.appendChild(li);
    });
  };

  loadQuiz();
});
