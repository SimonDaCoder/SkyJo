let Spieler = 6;
let Namen = ['Hannes', 'Papa', 'Mama', 'Simon'];
let scores = new Array(Spieler).fill(0);
let round = 0;
let spieleranderreihe = 0;

function newGame() {
  Spieler = 0;
  Namen = [];
  window.location = "setup.html";
}

function newRound() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  document.getElementById("popupHeader").innerHTML = "Spieler: " + Namen[spieleranderreihe];
}

function AddScore() {
  const scoretoadd = parseInt(document.getElementById("popupEingabe").value);

  if (isNaN(scoretoadd)) {
    alert("Bitte eine gültige Zahl eingeben!");
    return;
  }

  document.getElementById("popupEingabe").value = "";

  if (spieleranderreihe < Spieler - 1) {
    scores[spieleranderreihe] += scoretoadd;
    spieleranderreihe += 1;
    document.getElementById("popupHeader").innerHTML = "Spieler: " + Namen[spieleranderreihe];
  } else {
    scores[spieleranderreihe] += scoretoadd;
    spieleranderreihe = 0;
    document.getElementById("popup").style.display = "none";
    setScores();
  }

}

function setScores() {
  round += 1;
  document.getElementById("Scorerow_" + round).classList.remove("Unset");
  for (let i = 0; i < Spieler; i++) {
    document.getElementById("Score_" + (round) + "_" + (i + 1)).innerHTML = scores[i];
  }
}



function loadScoreboard() {
  const table = document.getElementById("scoreboard");
  const namenrow = document.getElementById("Names");

  for (let i = 0; i < Spieler; i++) {
    const th = document.createElement("th");
    th.id = "Name_" + (i + 1);
    th.innerHTML = Namen[i];
    namenrow.appendChild(th);
  }

  for (let i = 0; i < 10; i++) {
    const tr = document.createElement("tr");
    tr.id = "Scorerow_" + (i + 1);
    table.appendChild(tr);
    tr.classList.add("Unset");
    for (let j = 0; j < Spieler; j++) {
      const td = document.createElement("td");
      td.innerHTML = i + 1;
      td.id = "Score_" + (i + 1) + "_" + (j + 1);
      tr.appendChild(td);
    }
  }
}

loadScoreboard();