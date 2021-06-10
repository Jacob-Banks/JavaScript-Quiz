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
