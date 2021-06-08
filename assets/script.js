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
  document.getElementById("btn").style.display = "none";
  document.getElementById("sub").style.display = "none";
  timerScore();
  document.getElementById("what").innerHTML = questions[index];
  createOl();
  index++;
}

function nextquestion(li) {
  setBorder(li);
  if (index > answers.length - 1) {
    exit();
  } else {
    document.getElementById("what").innerHTML = questions[index];
    document.getElementById("li0").innerHTML = `1. ${answers[index][0][0]}`;
    document.getElementById("li1").innerHTML = `2. ${answers[index][1][0]}`;
    document.getElementById("li2").innerHTML = `3. ${answers[index][2][0]}`;
    document.getElementById("li3").innerHTML = `4. ${answers[index][3][0]}`;
  }
  index++;
}

function timerScore() {
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
  document.getElementById("what").innerHTML = "All done";
  document.getElementById("Ol").style.display = "none";
  document.getElementById("sub").style.display = "block";
  document.getElementById("sub").innerHTML = `Your score is ${timer}`;
  clearInterval(score);
  document.getElementById("timer").style.display = "none";
  createForm();
}

function setBorder(li) {
  quiz.style.borderBottom = "solid grey 1px";
  document.getElementById("arr").style.display = "block";
  if (answers[index - 1][li][1] === "right") {
    document.getElementById("arr").innerHTML = "correct";
  } else {
    document.getElementById("arr").innerHTML = "wrong";
    timer = timer - 10;
  }
}

function resetBorder() {
  quiz.style.border = "none";
  document.getElementById("arr").style.display = "none";
}

function createOl() {
  const x = document.createElement("OL");
  x.setAttribute("id", "Ol");
  quiz.appendChild(x);

  for (i = 0; i < answers[0].length; i++) {
    const li = document.createElement("li");
    li.setAttribute("id", `li${i}`);
    li.setAttribute("class", "btn");
    let text = document.createTextNode(`${i + 1}. ${answers[0][i][0]}`);
    li.appendChild(text);
    document.getElementById("Ol").appendChild(li);
  }

  const para = document.createElement("p");
  const body = document.body;
  para.setAttribute("id", `arr`);
  body.appendChild(para);

  let list1 = document.querySelector("#li0");
  let list2 = document.querySelector("#li1");
  let list3 = document.querySelector("#li2");
  let list4 = document.querySelector("#li3");
  const border = document.querySelectorAll(".btn");

  border.forEach((el) =>
    el.addEventListener("mouseover", (event) => {
      resetBorder();
    })
  );
  list1.addEventListener("click", () => nextquestion(0));
  list2.addEventListener("click", () => nextquestion(1));
  list3.addEventListener("click", () => nextquestion(2));
  list4.addEventListener("click", () => nextquestion(3));
}

function highScores() {
  document.getElementById("form").style.display = "none";
  document.getElementById("btn").style.display = "none";
  if (index > 0) {
    document.getElementById("Ol").style.display = "none";
    resetBorder();
  }
  document.getElementById("sub").style.display = "none";
  document.getElementById("what").innerHTML = "High Scores";

  var testScores = JSON.parse(localStorage.getItem("testScores"));
  if (testScores == null) testScores = [];
  const x = document.createElement("OL");
  x.setAttribute("id", "Ol2");
  quiz.appendChild(x);
  var tml = "";
  for (var i = 0; i < testScores.length; i++) {
    tml += "<li>" + testScores[i] + "</li>";
  }
  document.getElementById("Ol2").innerHTML = tml;
  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("id", "highButton1");
  button.setAttribute("class", "btn");
  document.getElementById("Ol2").appendChild(button);

  let text = document.createTextNode("Go Back");
  document.getElementById("highButton1").appendChild(text);
  document
    .getElementById("highButton1")
    .addEventListener("click", () => location.reload());
}

function createForm() {
  const x = document.createElement("form");
  x.setAttribute("id", "form");
  quiz.appendChild(x);

  const y = document.createElement("input");
  y.setAttribute("type", "text");
  y.setAttribute("id", "formInput");
  y.setAttribute("placeholder", "asdf");
  document.getElementById("form").appendChild(y);

  const button = document.createElement("button");

  button.setAttribute("id", "formButton");
  button.setAttribute("class", "btn");
  button.setAttribute("type", "button");
  document.getElementById("form").appendChild(button);

  let text = document.createTextNode("submit");
  document.getElementById("formButton").appendChild(text);

  let wtf = document.querySelector("#formButton");
  wtf.addEventListener("click", () => addEntry());
}

function addEntry() {
  // Parse the JSON stored in allEntriesP
  var testScores = JSON.parse(localStorage.getItem("testScores"));
  if (testScores == null) testScores = [];
  var value = document.getElementById("formInput").value;
  scoreValue = ` ${timer}` + "  " + `${value} `;

  localStorage.setItem("scoreValue", JSON.stringify(scoreValue));
  // Save allEntries back to local storage
  testScores.push(scoreValue);
  localStorage.setItem("testScores", JSON.stringify(testScores));
  highScores();
}

start.addEventListener("click", () => startQuiz(answers));
high.addEventListener("click", () => highScores());
