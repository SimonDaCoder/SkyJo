let Spieler;
let Namen = [];
let scores;
let round = 0;
let spieleranderreihe = 0;

function newGame() {
  round = 0;
  Spieler = 0;
  Namen = [];
  scores = [];
  document.getElementById("scoreboard").innerHTML = "";
  document.getElementById('seite2').scrollIntoView({ behavior: 'smooth' });
}

function newRound() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  document.getElementById("popupHeader").innerHTML = "Spieler: " + Namen[spieleranderreihe];

  console.log("Neue Runde hat gestartet!");
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
    let letzterSpieler = spieleranderreihe === 0 ? Spieler - 1 : spieleranderreihe - 1;
    console.log(scoretoadd + " Punkte wurden eingetragen für Spieler " + Namen[letzterSpieler]);
  } else {
    scores[spieleranderreihe] += scoretoadd;
    spieleranderreihe = 0;
    document.getElementById("popup").style.display = "none";
    let letzterSpieler = spieleranderreihe === 0 ? Spieler - 1 : spieleranderreihe - 1;
    console.log(scoretoadd + " Punkte wurden eingetragen für Spieler " + Namen[letzterSpieler]);
    setScores();
  }

}

function setScores() {
  round += 1;
  document.getElementById("Scorerow_" + round).classList.remove("Unset");
  for (let i = 0; i < Spieler; i++) {
    document.getElementById("Score_" + (round) + "_" + (i + 1)).innerHTML = scores[i];
  }

  console.log("Punkte für Runde " + round + " eingetragen.");
}



function loadScoreboard() {
  const table = document.getElementById("scoreboard");
  const namenrow = table.appendChild(document.createElement("tr"));
  namenrow.id = "Names";

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








//setup

function PlayerOption() {
  Spieler = document.getElementById("Spielercount").value;
  let namediv = document.getElementById("Spieleroptionen");
  document.getElementById("SpielercountText").innerHTML = Spieler;
  document.getElementById("SpielercountTextm").innerHTML = parseInt(Spieler) - 1;
  document.getElementById("SpielercountTextp").innerHTML = parseInt(Spieler) + 1;


  namediv.innerHTML = "";

  for (let i = 0; i < Spieler; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Spieler " + (i + 1);
    namediv.appendChild(input);
    const br = document.createElement("br");
    namediv.appendChild(br);
  }
}

function GetNames() {
  Namen = [];
  Spieler = parseInt(document.getElementById("Spielercount").value);
  let namediv = document.getElementById("Spieleroptionen");
  let inputs = namediv.querySelectorAll("input");

  inputs.forEach(input => {
    if (input.value !== "") {
      Namen.push(input.value);
    }
    else {
      alert("Bitte alle Namen eingeben!");
      return;
    }
  });


  document.getElementById('main').scrollIntoView({ behavior: 'smooth' });

  console.log(Spieler + " Spieler wurden eingetragen");
  console.log("Die Namen der Spieler sind: " + Namen);

  scores = Array.from({ length: Spieler }, () => 0);
  loadScoreboard();
}

