let timer = 100;
let btn = document.getElementById("btn");
let z = 0;
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
function startQuiz() {
  document.getElementById("btn").style.display = "none";
  document.getElementById("sub").style.display = "none";
  document.getElementById("timer").style.display = "block";
  timerScore();
  document.getElementById("what").innerHTML = questions[z];
  createOl();
  z++;
}
function createOl() {
  var x = document.createElement("OL");
  x.setAttribute("id", "Ol");
  document.getElementById("quiz").appendChild(x);
  for (i = 0; i < answers[0].length; i++) {
    var li = document.createElement("li");
    li.setAttribute("id", `li${i}`);
    var text = document.createTextNode(answers[0][i][0]);
    li.appendChild(text);
    document.getElementById("Ol").appendChild(li);
  }
  var para = document.createElement("p");
  para.setAttribute("id", `arr`);
  document.getElementById("quiz").appendChild(para);

  let list1 = document.querySelector("#li0");
  let list2 = document.querySelector("#li1");
  let list3 = document.querySelector("#li2");
  let list4 = document.querySelector("#li3");

  list1.addEventListener("click", () => nextquestion(0));
  list2.addEventListener("click", () => nextquestion(1));
  list3.addEventListener("click", () => nextquestion(2));
  list4.addEventListener("click", () => nextquestion(3));
}
function nextquestion(li) {
  if (z > 0) {
    if (answers[z - 1][li][1] === "right") {
      document.getElementById("arr").innerHTML = "correct";
      console.log(answers[z - 1][li][0]);
    } else {
      document.getElementById("arr").innerHTML = "wrong";
      console.log(answers[z - 1][li][0]);
      timer = timer - 10;
    }
  }
  if (z > answers.length - 1) {
    exit();
  } else {
    document.getElementById("what").innerHTML = questions[z];
    document.getElementById("li0").innerHTML = answers[z][0][0];
    document.getElementById("li1").innerHTML = answers[z][1][0];
    document.getElementById("li2").innerHTML = answers[z][2][0];
    document.getElementById("li3").innerHTML = answers[z][3][0];
  }
  z++;
}

function timerScore() {
  var score = setInterval(function () {
    if (timer <= 0) {
      clearInterval(score);
      document.getElementById("timer").innerHTML = "Failed";
    } else {
      document.getElementById("timer").innerHTML = timer;
    }
    timer -= 1;
  }, 1000);
}
function exit() {
  document.getElementById("what").innerHTML = "All done";
  document.getElementById("Ol").style.display = "none";
  document.getElementById("sub").style.display = "block";
  document.getElementById("sub").innerHTML = `Your score is ${timer}`;
  document.getElementById("timer").style.display = "none";
}

btn.addEventListener("click", () => startQuiz());
