const start = document.getElementById("btn");
const quiz = document.getElementById("quiz");
const high = document.getElementById("high");
let index = 0; //which question
let timer = 99;
let score = "";
let testScores = [];

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

function timerScore() {
  //time countdown
  score = setInterval(function () {
    // when time runs out stop the timer go to highsscores
    if (timer <= 0) {
      clearInterval(score);
      document.getElementById("timer").innerHTML = "Failed";
      newpage();
    } else {
      // if time is left show time
      document.getElementById("timer").innerHTML = "Score " + timer;
    }
    timer -= 1; // deduct time
  }, 1000); // every second
}

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
  //hide unused elements
  start.style.display = "none";
  document.getElementById("sub").style.display = "none";

  //start the timer/score
  timerScore();
  //display the question
  document.getElementById("headline").innerHTML = questions[index];
  //display the possible answers
  createOl();
  //increase counter
  index++;
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
  // create the right/wrong notifier container
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
  //remove border and previous result on mouse over
  border.forEach((el) =>
    el.addEventListener("mouseover", (event) => {
      resetBorder();
    })
  );
  // add listeners for which li was clicked, launch neext question pass which li
  list1.addEventListener("click", () => nextquestion(0));
  list2.addEventListener("click", () => nextquestion(1));
  list3.addEventListener("click", () => nextquestion(2));
  list4.addEventListener("click", () => nextquestion(3));
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
// sets border adds whether previous q was right or wrong subtracts score for wrong entry
function setBorder(li) {
  quiz.style.borderBottom = "solid grey 1px";
  document.getElementById("result").style.display = "block";
  if (answers[index - 1][li][1] === "right") {
    document.getElementById("result").innerHTML = "Correct!";
  } else {
    document.getElementById("result").innerHTML = "Wrong ;(";
    timer = timer - 10;
  }
}

//removes border and previous result on mouse over li
function resetBorder() {
  quiz.style.border = "none";
  document.getElementById("result").style.display = "none";
}

function exit() {
  // change headline
  document.getElementById("headline").innerHTML = "All done!";
  // display user score
  document.getElementById("sub").style.display = "block";
  document.getElementById("sub").innerHTML = `Your score is ${timer}`;
  //add submit initials and score form
  createForm();

  //hide unsued elements
  document.getElementById("Ol").style.display = "none";
  document.getElementById("timer").style.display = "none";
  // stop timer
  clearInterval(score);
}

function createForm() {
  //create the  submit your name + score form
  const x = document.createElement("form");
  x.setAttribute("id", "form");
  quiz.appendChild(x);

  // add input field
  const y = document.createElement("input");
  y.setAttribute("type", "text");
  y.setAttribute("id", "formInput");
  y.setAttribute("placeholder", "asdf");
  y.setAttribute("maxlength", "5");
  document.getElementById("form").appendChild(y);

  //add a submit button
  const button = document.createElement("button");
  button.setAttribute("id", "formButton");
  button.setAttribute("class", "btn");
  button.setAttribute("type", "button");
  document.getElementById("form").appendChild(button);

  let text = document.createTextNode("submit");
  document.getElementById("formButton").appendChild(text);

  // make the button launch add score which fills highscores and adds this entry
  let addInfo = document.querySelector("#formButton");
  addInfo.addEventListener("click", () => addScore()); //

  //stop  enter key submit
  let form = document.getElementById("form");
  function handleForm(event) {
    event.preventDefault();
  }
  form.addEventListener("submit", handleForm);
} //end of form

function newpage() {
  location.href = "highscores.html";
}

function addScore() {
  //get previous scores
  testScores = JSON.parse(localStorage.getItem("testScores"));
  if (testScores == null) testScores = [];

  //get  and set current quiz score
  let user = document.getElementById("formInput").value;
  if (user === "") {
    user = "A Shy Person";
  }
  const score = timer;
  const scoreValue = [score, user];

  // place score in high score array
  testScores.push(scoreValue);
  //sort scores
  testScores.sort(function (a, b) {
    return b[0] - a[0];
  });
  // limit length
  if (testScores.length > 10) {
    testScores.pop();
  }
  // send scores to storage
  localStorage.setItem("testScores", JSON.stringify(testScores));

  //fill high score page
  newpage();
}

function highScores() {
  // get the saved high scores
  testScores = JSON.parse(localStorage.getItem("testScores"));
  if (testScores == null) testScores = [];

  //create and add li(s)aka scores
  let aScore = "";
  for (let i = 0; i < testScores.length; i++) {
    aScore += "<li>" + testScores[i][0] + " " + testScores[i][1] + "</li>";
  }
  document.getElementById("order").innerHTML = aScore;
} //end of highscores

//clears local storage
function clearHigh() {
  window.localStorage.clear();
  highScores();
}

// start call to action
start.addEventListener("click", () => startQuiz(answers));
// view high scores call to action
high.addEventListener("click", () => newpage());
