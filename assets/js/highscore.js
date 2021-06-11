let failed = "";
let h3 = document.getElementById("h3");
function highScores() {
  // get the saved high scores
  testScores = JSON.parse(localStorage.getItem("testScores"));
  if (testScores == null) testScores = [];

  //create and add li(s)aka scores
  let aScore = "";
  for (let i = 0; i < testScores.length; i++) {
    aScore +=
      "<li>" +
      `${i + 1} .` +
      " " +
      testScores[i][0] +
      ": " +
      testScores[i][1] +
      "</li>";
  }
  document.getElementById("order").innerHTML = aScore;
  displayFailed();
  localStorage.removeItem("testResult");
} //end of highscores

function displayFailed() {
  failed = localStorage.getItem("testResult");

  if (failed === null) {
    h3.innerHTML =
      "You've completed this quiz: check to see if you made the highscores!!!";
  } else {
    h3.innerHTML = `${failed}`;
  }
}
//clears local storage
function clearHigh() {
  window.localStorage.clear();
  failed = "To take the quiz click Go Back";
  localStorage.setItem("testResult", failed);
  highScores();
}
