let playerModel = {
  currentChallenge: {
    words: [],
    type: "",
    wordsI: 0,
    challengeI: 0,
    wordCompleted: false,
    totalPoints: 0,
    totalWords: 3
  },
  challengesCompleted: [],
  currentCPS: 20,
  challengeStarted: false,
  currentTime: 0,
  guesses: [],
  currentWord: "",
  placeHolder: [],
  wordLen: 0,
}

let jokeCounter = 1;

let player = playerModel;

let timer = null;

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


const getWord = (min = 5, max = 5) => RiTa.randomWord({ minLength: min, maxLength: max });

const constructChallenge = (type) => {

  switch (type) {
    case "word":
      player.currentChallenge.words.push(getWord());
      player.currentChallenge.type = "word";
      break;
    case "challenge":
      for (let i = 0; i < 3; i++) {
        let num = 5 + i;
        player.currentChallenge.words.push(getWord(num, num));
      }
      player.currentChallenge.type = "challenge";
      break;
  }

  // player.currentChallenge = challenge;

}
const wait = (delay, ...args) => new Promise(resolve => setTimeout(resolve, delay, ...args));

const timerFunc = async (callback, time, ...arg) => {

  await wait(time);
  await callback(...arg);
}

const startTimer = () => timer = setInterval(() => {

  if (player.currentTime > 0) {
    let extraZero = player.currentTime < 10 ? "0" : "";
    updateTimerDsiplay("" + extraZero + player.currentTime);
    player.currentTime--;
  } else {
    updateTimerDsiplay("00");
    timesUp();
  }

}, 1000);


const timesUp = () => {

  clearInterval(timer);

  let w = handleWordRan(player.currentWord);

  timer = null;
  document.getElementById("message2div").innerHTML = "<h3>The word was: " + w + "</h3>";
  gameOver("Times up! You have failed!!!");
}

const updateTimerDsiplay = (sec, min = 0) => {
  document.getElementById("time").innerHTML = "" + sec;
}

const displayGame = () => {
  document.getElementById("startMenu").style.display = "none";
  document.getElementById("gameContent").style.display = "flex";
}
const displayMainMenu = () => {
  document.getElementById("startMenu").style.display = "flex";
  document.getElementById("gameContent").style.display = "none";
}

const displayMessage = (message) => document.getElementById("message").innerHTML = message;


const updateWordDisplay = (index, letter) => {
  document.getElementById("letter" + (index + 1)).innerHTML = letter;
}

const createPH = () => {
  let w = handleWordRan(player.currentWord);
  document.getElementById("words").innerHTML = "";
  for (let i = 0; i < w.length; i++) {
    player.placeHolder.push("");
  }

  for (let i = 0; i < w.length; i++) {
    const input = document.createElement("input");
    //input.innerHTML = "";
    input.id = "letter" + (i + 1);
    input.className = "letterBox";
    input.oninput = showLetter;
    input.onfocus = focusedInput;
    input.maxLength = 1;
    input.autocomplete = "off";
    // input.disabled = i === 0 ? false : true;
    document.getElementById("words").appendChild(input);
  }

}

const focusedInput = (e) => {
  let num = parseInt(e.target.id.charAt(e.target.id.length - 1));
  player.currentChallenge.wordsI = num;
}

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const handleJoke = (e, guess) => {

  let modNum = jokeCounter % 5;
  let modNum2 = jokeCounter % 3;


  if (modNum2 === 0) {
    jokeCounter++;
    document.getElementById(e.target.id).value = letters[generateRandomNumber(0, (letters.length - 1))];
  } else if (modNum === 0) {
    jokeCounter++;
    document.getElementById(e.target.id).value = letters[generateRandomNumber(0, (letters.length - 1))];
  } else {
    jokeCounter++;
  }
  // else
  // if (jokeCounter === 25) {
  //   jokeCounter++;
  //   document.getElementById(e.target.id).value = letters[generateRandomNumber(0, (letters.length - 1))];
  //   alert("Just Stop Bro!");
  // } else 
  // if (jokeCounter === 30) {
  //   jokeCounter++;
  //   document.getElementById(e.target.id).value = letters[generateRandomNumber(0, (letters.length - 1))];
  //   alert("Ok the jokes over!");
  // } else if (jokeCounter > 30 && modNum === 0 || modNum2 === 0) {

  //   jokeCounter++;
  //   document.getElementById(e.target.id).value = letters[generateRandomNumer(0, (letters.length - 1))];
  // } else
  // if (jokeCounter > 30) {
  //   jokeCounter++;
  // } else {
  //   jokeCounter++;
  // }
}


const handleWordRan = (word) => {

  let str = "";

  let num = 5 + player.currentChallenge.challengeI;

  switch (num) {
    case 5:
      str = word.charAt(4) + "" + word.charAt(9) + "" + word.charAt(13) + "" + word.charAt(17) + "" + word.charAt(22)
      break;
    case 6:
      str = word.charAt(3) + "" + word.charAt(7) + "" + word.charAt(11) + "" + word.charAt(16) + "" + word.charAt(21) + "" + word.charAt(23)
      break;
    case 7:
      str = word.charAt(3) + "" + word.charAt(6) + "" + word.charAt(10) + "" + word.charAt(15) + "" + word.charAt(18) + "" + word.charAt(22) + "" + word.charAt(24)
      break;
  }

  return str;

}

const handleRamNum = (word) => {
  let str = "";
  let num = 5 + player.currentChallenge.challengeI;
  for (let j = letters.length - 1; j > 0; j--) {
    let rand = [Math.floor(Math.random() * letters.length)];
    [letters[j], letters[rand]] = [letters[rand], letters[j]];
  }

  for (let i = 0; i < letters.length; i++) {

    if (num === 5) {
      if (i === 4) {
        letters[i] = word.charAt(0);
      } else if (i === 9) {
        letters[i] = word.charAt(1);
      } else if (i === 13) {
        letters[i] = word.charAt(2);
      } else if (i === 17) {
        letters[i] = word.charAt(3);
      } else if (i === 22) {
        letters[i] = word.charAt(4);
      }

    } else if (num === 6) {
      if (i === 3) {
        letters[i] = word.charAt(0);
      } else if (i === 7) {
        letters[i] = word.charAt(1);
      } else if (i === 11) {
        letters[i] = word.charAt(2);
      } else if (i === 16) {
        letters[i] = word.charAt(3);
      } else if (i === 21) {
        letters[i] = word.charAt(4);
      } else if (i === 23) {
        letters[i] = word.charAt(5);
      }
    } else if (num === 7) {
      if (i === 3) {
        letters[i] = word.charAt(0);
      } else if (i === 6) {
        letters[i] = word.charAt(1);
      } else if (i === 10) {
        letters[i] = word.charAt(2);
      } else if (i === 15) {
        letters[i] = word.charAt(3);
      } else if (i === 18) {
        letters[i] = word.charAt(4);
      } else if (i === 22) {
        letters[i] = word.charAt(5);
      } else if (i === 24) {
        letters[i] = word.charAt(6);
      }
    }


  }

  letters.map((x) => {
    str += x;
  })

  return str;

}


const showLetter = (e) => {

  document.getElementById(e.target.id).style.backgroundColor = "#f0f8ff";

  if (e.inputType === "deleteContentBackward") return;

  //handleJoke(e, document.getElementById(e.target.id).value);

  let strArray = e.target.id.split("");

  let endChar = parseInt(strArray[strArray.length - 1])

  if (endChar === player.wordLen) return;
  let inputs = document.getElementsByClassName("letterBox");

  let num = getWithinRange(player.currentChallenge.wordsI + 1, inputs.length);

  if (num > 0) {
    player.currentChallenge.wordsI = num;
    handleInputFocus(num);
  }


  // if (endChar < player.wordLen - 1 && player.placeHolder[endChar] != "") incr++;

  // document.getElementById("letter" + incr).focus();

}

const getWithinRange = (start, end, type = "incr") => {
  let num = 0;

  switch (type) {
    case "decr":
      for (let i = start - 1; i > -1; i--) {
        let input = document.getElementById("letter" + (i + 1))

        if (player.placeHolder[i - 1] === "") {
          num = i;
          break;
        }
      }
      break;
    default:
      for (let i = start - 1; i < end; i++) {
        let input = document.getElementById("letter" + (i + 1))
        if (input.value === "" || player.placeHolder[i] === "") {
          num = i + 1;
          break;
        } else { continue }
      }
  }

  return num;
}

const handleInputFocus = (currentPos) => {

  // for (let i = currentPos; i < player.wordLen; i++) {
  //if (player.placeHolder[i] === "") {
  document.getElementById("letter" + currentPos).focus();
  //document.getElementById("letter" + (i + 1)).setSelectionRange(0, 0)
  //break;
  //}
  // }

}

const strToArr = (str) => {

  let words = [];

  for (let i = 0; i < str.length; i++) {
    words.push(str[i]);
  }

  return words;

}

const getInputs = () => {
  let str = "";
  for (let i = 0; i < player.wordLen; i++) {
    str += document.getElementById("letter" + (i + 1)).value;
  }

  return str;
}

const clearInputs = () => {

  for (let i = 0; i < player.placeHolder.length; i++) {
    if (player.currentChallenge.wordCompleted || player.placeHolder[i] === "") {
      document.getElementById("letter" + (i + 1)).value = "";
      document.getElementById("letter" + (i + 1)).style.backgroundColor = "#f0f8ff"
    }
  }
}

const handlePoints = () => {
  player.currentChallenge.totalPoints += player.wordLen;
  document.getElementById("score").innerHTML = "" + player.currentChallenge.totalPoints;
}

const handlePlayerAttempt = () => {

  let guess = getInputs();


  if (guess.length != player.wordLen) return;




  let w = handleWordRan(player.currentWord);
  let correctMess = "";
  let inCorrectMess = "";
  let outCorrectMess = "";
  for (let i = 0; i < guess.length; i++) {

    guess[i].toLowerCase();

    let guessedCorrect = player.placeHolder.filter((x) => x === guess[i]);
    let letterAmount = strToArr(w).filter((x) => x === guess[i]);
    let guessOutOfPlace = document.getElementById("guessOutOfPlace").textContent;
    let guessedIncorrectSpot = strToArr(guessOutOfPlace).filter((x) => x === guess[i]);
    // let leftOver = letterAmount.length - (guessedCorrect.length + guessedIncorrectSpot.length);

    if (letterAmount.length > 0) {
      if (guess[i] === w[i]) {
        updateWordDisplay(i, guess[i]);
        // document.getElementById("letter" + (i + 1)).innerHTML = guess[i];
        document.getElementById("letter" + (i + 1)).style.backgroundColor = "blue";
        player.placeHolder[i] = guess[i];
        correctMess += correctMess.length === 0 ? guess[i] : ", " + guess[i];
        // player.currentChallenge.wordCompleted = true;

      } else if ((letterAmount.length - guessedCorrect.length) > 0 && guessedIncorrectSpot.length < (letterAmount.length - guessedCorrect.length)) {
        let str = guessOutOfPlace.length === 0 ? guess[i] : " | " + guess[i];
        document.getElementById("guessOutOfPlace").innerHTML += str;
        outCorrectMess += outCorrectMess.length === 0 ? guess[i] : ", " + guess[i];
      }
    } else {
      let guessesIncorrect = document.getElementById("guessIncorrect").textContent;
      inCorrectMess += inCorrectMess.length === 0 ? guess[i] : ", " + guess[i];
      if (guessesIncorrect.search(guess[i]) < 0) {
        let str = guessesIncorrect.length === 0 ? guess[i] : " | " + guess[i];
        document.getElementById("guessIncorrect").innerHTML += str;
      }
    }

  }

  let newMessage = "";

  if (correctMess != "") {
    newMessage += "You got " + correctMess + " correct | ";
  } else {
    newMessage += "You got none correct | ";
  }
  if (inCorrectMess != "") {
    newMessage += "You got " + inCorrectMess + " incorrect | ";
  } else {
    newMessage += "You got none incorrect | ";
  }
  if (outCorrectMess != "") {
    newMessage += "You got " + outCorrectMess + " out of place";
  } else {
    newMessage += "You got none out of place";
  }

  if (guess === w) {
    clearInterval(timer);
    displayMessage("Success! You guessed the word");
    handlePoints();
    document.getElementById("guessIncorrect").innerHTML = "";
    document.getElementById("guessOutOfPlace").innerHTML = "";
    player.currentChallenge.wordCompleted = true;
    addCorrectWord();
    if (player.currentChallenge.challengeI === player.currentChallenge.totalWords - 1) {
      gameOver("You have completed the challenge!!!")
    } else {
      document.getElementById("guess").style.display = "none";
      timerFunc(() => {
        displayMessage("Next word incomming!");
        document.getElementById("words").innerHTML = "";
        timerFunc(() => {
          intermission();
        }, 1000)
      }, 2000)
    }

  } else {
    displayMessage(newMessage);

    clearInputs();
    let num = player.placeHolder.findIndex((x) => x === "");
    player.currentChallenge.wordsI = num;
    if (num === -1) {
      num = 0;
    }
    document.getElementById("letter" + (num + 1)).focus();
  }
  let OOP = document.getElementById("guessOutOfPlace").textContent;
  if (OOP.length > 0) handleOutOfPLace()
  //document.getElementById("message").innerHTML = message;

}

const handleOutOfPLace = () => {
  let w = handleWordRan(player.currentWord);
  let OOP = document.getElementById("guessOutOfPlace").textContent;
  let splitOOP = OOP.split(" | ");
  let splitW = w.split("");

  if (splitOOP.length > 0) {
    for (let i = 0; i < splitOOP.length; i++) {
      let countW = splitW.filter((x) => x === splitOOP[i]);
      let countCorrect = player.placeHolder.filter((x) => x === splitOOP[i]);

      if (countCorrect.length === countW.length) {
        splitOOP.splice(i, 1);
      }

    }

    let str = "";

    for (let j = 0; j < splitOOP.length; j++) {
      let spacer = j < splitOOP.length - 1 ? " | " : "";
      str += splitOOP[j] + spacer;
    }

    document.getElementById("guessOutOfPlace").innerHTML = str;
  }

}

const updatePH = () => {
  let w = handleWordRan(player.currentWord);

  for (let i = 0; i < w.length; i++) {
    player.placeHolder.push("");
  }
}

const addCorrectWord = () => {
  let w = handleWordRan(player.currentWord);
  const li = document.createElement("li");
  li.innerHTML = w;
  document.getElementById("correctWords").appendChild(li);
}

const gameOver = (message) => {
  player.guesses = [];
  player.placeHolder = [];
  clearInputs();
  let challenges = player.challengesCompleted;
  challenges.push(player.currentChallenge);
  player = playerModel
  player.challengesCompleted = challenges;
  player.challengeStarted = false;
  document.getElementById("words").innerHTML = "<li><p>Please Refresh the browser to play another challenge</p></li>";
  displayMessage(message)
  document.getElementById("guess").style.display = "none";
}

const nextLevel = () => {
  player.guesses = [];
  player.placeHolder = [];
}

const intermission = () => {

  let count = 5;


  timer = setInterval(() => {

    if (count > 0) {
      displayMessage("" + count)
      count--;
    }

  }, 1000);

  document.getElementById("time").innerHTML = "";

  timerFunc(() => {
    nextLevel()
    player.currentChallenge.challengeI++;
    playChallenge();
  }, 6000);

}

const playChallenge = () => {
  //clearInterval(timer);
  let num = 5 + player.currentChallenge.challengeI;
  let newWord = getWord(num, num);
  let h = handleRamNum(newWord);
  player.wordLen = newWord.length;
  player.currentWord = h;
  player.currentChallenge.wordsI = 0;
  player.currentTime = newWord.length * player.currentCPS;//player.currentChallenge.type === "challenge" ? newWord.length * player.currentCPS : 0;
  player.challengeStarted = true;
  player.currentChallenge.wordCompleted = false;
  createPH();
  timerFunc(() => {
    document.getElementById("letter1").focus();
    startTimer();
    displayMessage("Time has started!");
    document.getElementById("guess").style.display = "block";
  }, 10);
}

const play = () => {

  let spc = document.getElementById("SPCInput").value;

  if (spc > 0 && spc < 51) {
    player.currentCPS = spc;
  } else if (spc < 0) {
    player.currentCPS = 20;
  } else if (spc > 50) {
    player.currentCPS = 50;
  }

  document.getElementById("flipGameInner").classList.add("flip-game");
  // if (player.challengesCompleted.length === 100) {
  //   constructChallenge("word");
  // } else {
  //   constructChallenge("challenge");
  // }
  timerFunc(() => {
    displayMessage("Get Ready!!!");
  }, 2000)
  timerFunc(() => {
    playChallenge();
  }, 3000)


}

window.addEventListener("keydown", (e) => {

  if (player.challengeStarted) {
    let inputs = document.getElementsByClassName("letterBox");
    switch (e.key) {
      case "Enter":
        handlePlayerAttempt();
        break;
      case "ArrowLeft":
        if (player.currentChallenge.wordsI > 0) {
          player.currentChallenge.wordsI--
          handleInputFocus(player.currentChallenge.wordsI);
        }
        break;
      case "ArrowRight":
        if (player.currentChallenge.wordsI < player.wordLen - 1) {
          player.currentChallenge.wordsI++
          handleInputFocus(player.currentChallenge.wordsI);
        }
        break;
      case "Backspace":

        let num = getWithinRange(player.currentChallenge.wordsI, 0, "decr");

        if (num <= player.wordLen && num > 0 && document.getElementById("letter" + player.currentChallenge.wordsI).value === "") {
          player.currentChallenge.wordsI--
          handleInputFocus(num);
        }
        break;
    }
  }

})