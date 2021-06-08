let timer = 100;
let score = "e";
let start = document.getElementById("btn");
let quiz = document.getElementById("quiz");
let testScores = [];
let high = document.getElementById("high");
let index = 0;

const questions = [
  "aaaaaaaaaaa",
  "bbbbbbbbbbbb",
  "ccccccccccc",
  "ddddddddddd",
  "eeeeeeeeeeeeee",
];
let answers = [
  [
    ["aiiiiiiiiiiiiiiiiiiii", "wrong"],
    ["biiiiiiiiiiiiiiiiiiii", "wrong"],
    ["ciiiiiiiiiiiiiiiiiiii", "wrong"],
    ["duuuuuuuuuuuuuuuuuuuuuwwwwwwww", "right"],
  ],
  [
    ["eiiiiiiiiiiiiiiiiiiii", "wrong"],
    ["fiiiiiiiiiiiiiiiiiiii", "wrong"],
    ["giiiiiiiiiiiiiiiiiiii", "wrong"],
    ["huuuuuuuuuuuuuuuuuuuuuwwwwwwww", "right"],
  ],
  [
    ["iiiiiiiiiiiiiiiiiiiii", "wrong"],
    ["jiiiiiiiiiiiiiiiiiiii", "wrong"],
    ["kiiiiiiiiiiiiiiiiiiii", "wrong"],
    ["luuuuuuuuuuuuuuuuuuuuuwwwwwwww", "right"],
  ],
  [
    ["piiiiiiiiiiiiiiiiiiii", "wrong"],
    ["oiiiiiiiiiiiiiiiiiiii", "wrong"],
    ["niiiiiiiiiiiiiiiiiiii", "wrong"],
    ["muuuuuuuuuuuuuuuuuuuuuwwwwwwww", "right"],
  ],
  [
    ["qiiiiiiiiiiiiiiiiiiii", "wrong"],
    ["riiiiiiiiiiiiiiiiiiii", "wrong"],
    ["siiiiiiiiiiiiiiiiiiii", "wrong"],
    ["tuuuuuuuuuuuuuuuuuuuuuwwwwwwww", "right"],
  ],
];
function startQuiz(myArray) {
  //randomize answer order
  for (var i = 0; i < myArray.length; i++) {
    k = myArray[i].length;
    while (k--) {
      j = Math.floor(Math.random() * (myArray.length - 1));
      tempk = myArray[i][k];
      tempj = myArray[i][j];
      myArray[i][k] = tempj;
      myArray[i][j] = tempk;
    }
  }
  //hide unsed elements
  document.getElementById("btn").style.display = "none";
  document.getElementById("sub").style.display = "none";

  //start the timer
  timerScore();
  //display the question
  document.getElementById("headline").innerHTML = questions[index];
  //display the possible answers
  createOl();
  //increase counter
  index++;
}

function nextquestion(li) {
  //add result of last question
  setBorder(li);
  //exit if questions are done
  if (index > answers.length - 1) {
    exit();
  } else {
    //display new question and possible anwsers
    document.getElementById("headline").innerHTML = questions[index];
    document.getElementById("li0").innerHTML = `1. ${answers[index][0][0]}`;
    document.getElementById("li1").innerHTML = `2. ${answers[index][1][0]}`;
    document.getElementById("li2").innerHTML = `3. ${answers[index][2][0]}`;
    document.getElementById("li3").innerHTML = `4. ${answers[index][3][0]}`;
  }
  //increse counter
  index++;
}

function timerScore() {
  //time countdown
  score = setInterval(function () {
    if (timer <= 0) {
      clearInterval(score);
      document.getElementById("timer").innerHTML = "Failed";
    } else {
      document.getElementById("timer").innerHTML = "score " + timer;
    }
    timer -= 1;
  }, 1000);
}

function exit() {
  // change headline
  document.getElementById("headline").innerHTML = "All done";
  //hide unsued elements
  document.getElementById("Ol").style.display = "none";
  // display user score
  document.getElementById("sub").style.display = "block";
  document.getElementById("sub").innerHTML = `Your score is ${timer}`;

  // stop timer
  clearInterval(score);

  //removes timer
  document.getElementById("timer").style.display = "none";

  //add submit initials and score form
  createForm();
}

// sets border adds wheter previous q was right or wrong subtracts score for wrong entry
function setBorder(li) {
  quiz.style.borderBottom = "solid grey 1px";
  document.getElementById("result").style.display = "block";
  if (answers[index - 1][li][1] === "right") {
    document.getElementById("result").innerHTML = "correct";
  } else {
    document.getElementById("result").innerHTML = "wrong";
    timer = timer - 10;
  }
}

//removes border
function resetBorder() {
  quiz.style.border = "none";
  document.getElementById("result").style.display = "none";
}

function createOl() {
  //create ol to display answers
  const x = document.createElement("OL");
  x.setAttribute("id", "Ol");
  quiz.appendChild(x);

  // fill the list from ansewrs array
  for (i = 0; i < answers[0].length; i++) {
    const li = document.createElement("li");
    li.setAttribute("id", `li${i}`);
    li.setAttribute("class", "btn");
    let text = document.createTextNode(`${i + 1}. ${answers[0][i][0]}`);
    li.appendChild(text);
    document.getElementById("Ol").appendChild(li);
  }
  // create the right/wrong notifyer container
  const para = document.createElement("p");
  const body = document.body;
  para.setAttribute("id", `result`);
  body.appendChild(para);

  // add event listener idetifiers for li
  let list1 = document.querySelector("#li0");
  let list2 = document.querySelector("#li1");
  let list3 = document.querySelector("#li2");
  let list4 = document.querySelector("#li3");
  // identifier on all list items for border removal
  const border = document.querySelectorAll(".btn");
  //remove border on mouse over
  border.forEach((el) =>
    el.addEventListener("mouseover", (event) => {
      resetBorder();
    })
  );
  // add listeners for which li was clicked launch neext question
  list1.addEventListener("click", () => nextquestion(0));
  list2.addEventListener("click", () => nextquestion(1));
  list3.addEventListener("click", () => nextquestion(2));
  list4.addEventListener("click", () => nextquestion(3));
}

function highScores() {
  //get rid of submit score form
  if (index > 5) {
    document.getElementById("form").style.display = "none";
    document.getElementById("btn").style.display = "none";
  }
  // get rid of answer ol
  if (index > 0) {
    document.getElementById("Ol").style.display = "none";
    resetBorder();
  }
  //get rid of subtitle
  document.getElementById("sub").style.display = "none";

  //set the new headline
  document.getElementById("headline").innerHTML = "High Scores";

  // get the saved high scores
  var testScores = JSON.parse(localStorage.getItem("testScores"));
  if (testScores == null) testScores = [];

  // create a list that displays high scores
  const x = document.createElement("OL");
  x.setAttribute("id", "Ol2");
  quiz.appendChild(x);
  var aScore = "";
  for (var i = 0; i < testScores.length; i++) {
    aScore += "<li>" + testScores[i] + "</li>";
  }
  document.getElementById("Ol2").innerHTML = aScore;

  // create start again button
  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("id", "highButton1");
  button.setAttribute("class", "btn");
  document.getElementById("Ol2").appendChild(button);

  let text = document.createTextNode("Go Back");
  document.getElementById("highButton1").appendChild(text);

  // make go back button refresh page
  document
    .getElementById("highButton1")
    .addEventListener("click", () => location.reload());
}

function createForm() {
  //creat the form
  const x = document.createElement("form");
  x.setAttribute("id", "form");
  quiz.appendChild(x);

  // add input field
  const y = document.createElement("input");
  y.setAttribute("type", "text");
  y.setAttribute("id", "formInput");
  y.setAttribute("placeholder", "asdf");
  document.getElementById("form").appendChild(y);

  //add a submit button
  const button = document.createElement("button");

  button.setAttribute("id", "formButton");
  button.setAttribute("class", "btn");
  button.setAttribute("type", "button");
  document.getElementById("form").appendChild(button);

  let text = document.createTextNode("submit");
  document.getElementById("formButton").appendChild(text);

  // make button to launch add entry which fills highscores and adds this entry
  let wtf = document.querySelector("#formButton");
  wtf.addEventListener("click", () => addEntry());
}

function addEntry() {
  // get previous scores
  var testScores = JSON.parse(localStorage.getItem("testScores"));
  if (testScores == null) testScores = [];
  //set the current score and user
  var value = document.getElementById("formInput").value;
  scoreValue = ` ${timer}` + "  " + `${value} `;
  // Save  back to local storage
  localStorage.setItem("scoreValue", JSON.stringify(scoreValue));
  // place score in high score array
  testScores.push(scoreValue);
  localStorage.setItem("testScores", JSON.stringify(testScores));
  //launch high score page
  highScores();
}

start.addEventListener("click", () => startQuiz(answers));
high.addEventListener("click", () => highScores());
