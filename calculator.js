"use strict";

const plusBtn = document.querySelector(".add");
const minusBtn = document.querySelector(".substract");
const divideBtn = document.querySelector(".divide");
const multiplyBtn = document.querySelector(".multiply");

const equalBtn = document.querySelector(".equal");

let calcLock,
  zeroLock,
  oprTopDisplay,
  oprTopBackstage,
  oprDisplay,
  pendingOperation,
  oprBackstage,
  hasBeenPressed,
  acPress;

const int = function () {
  //Locks any operator from being used before any number is inputted
  calcLock = true;

  oprTopDisplay = document.querySelector(".calc-operation-bts");
  //Makes the top display operator "invisible"
  oprTopDisplay.classList.add("hide-top-display");

  //Top operation display behind the scenes (not displayed)
  oprTopBackstage = "";

  //Main big operation displayed on the screen
  oprDisplay = document.querySelector(".result");
  oprDisplay.textContent = 0;

  //Number Memory (array to save the numbers and operator type)
  pendingOperation = [];

  //Number Input not displayed
  oprBackstage = 0;

  //Second number input check if pressed or not for the first time
  hasBeenPressed = false;
};

int();

//Checks if the number has more than 11 letters, this is made so that hasil bagi yg hasilny infinite g error
let longNumCheck = Number(oprBackstage).toLocaleString("de-DE");

//Calculate the items pending inside the array function
const calcPending = function () {
  //Checks if calculation is possible by checking if there is a number and operator in the array and also check is the second number has been pressed
  if (pendingOperation.length >= 2 && hasBeenPressed === true) {
    //Saved number and operated in array (pendingOperator) added with the new number
    if (pendingOperation[0] === "+") {
      oprBackstage = Number(pendingOperation[1]) + Number(oprBackstage);
      equalPress();
    } else if (pendingOperation[0] === "-") {
      oprBackstage = Number(pendingOperation[1]) - Number(oprBackstage);
      equalPress();
    } else if (pendingOperation[0] === "/") {
      oprBackstage = Number(pendingOperation[1]) / Number(oprBackstage);
      equalPress();
    } else if (pendingOperation[0] === "*") {
      oprBackstage = Number(pendingOperation[1]) * Number(oprBackstage);
      equalPress();
    }
  }
};

//Updates Calc display
const updateDisplay = function () {
  if (Number(oprBackstage).toLocaleString("de-DE") !== "0") {
    oprDisplay.textContent = Number(oprBackstage).toLocaleString("de-DE");
  } else {
    oprDisplay.textContent = Number(oprBackstage);
  }
};
//Top display update
const updateTopDisplay = function () {
  //Saves current number to an array for operation
  // pendingOperation.push(oprBack    stage);
  pendingOperation[1] = oprBackstage;

  //the literal string is reversed 0-1 to 1-0 so both the saving and update display can be put inside the same function
  oprTopDisplay.classList.remove("hide-top-display");

  oprTopDisplay.textContent = `${Number(pendingOperation[1]).toLocaleString(
    "de-DE"
  )} ${pendingOperation[0]}`;
};

//function for equal button
const equalPress = function (operation) {
  if (oprDisplay.textContent.length <= 10) {
    updateDisplay();
  } else {
    oprDisplay.textContent = "Error";
  }
  //return the "if button has been pressed after num and operator (2nd iteration)" value to false
  hasBeenPressed = false;
  //Empty the array
  pendingOperation = [];
  //Hide top display
  oprTopDisplay.classList.add("hide-top-display");
  //Reset top display
  oprTopBackstage = "";
};

//operator assign function
const oprAssign = function (opr) {
  // console.log(pendingOperation, "//", oprTopBackstage, "//", opr);
  if (calcLock === false) {
    if (oprTopBackstage !== opr) {
      oprTopBackstage = opr;
      pendingOperation[0] = opr;
      // pendingOperation.push(oprTopBackstage);
    } else if (pendingOperation[0] === opr) {
      oprTopBackstage = opr;
      pendingOperation[0] = opr;
    }
    updateTopDisplay();
  }
};

//Dynamic number button function
const numberBtn = function (numBtn) {
  //if there is no string aka undefined, it will declare = 1; if there is then its going to +1 instead;
  if (typeof oprBackstage !== "string") {
    oprBackstage = String(numBtn);
  } else {
    oprBackstage += String(numBtn);
  }
  updateDisplay();
};

//Number Button Press
for (let i = 1; i <= 9; i++) {
  //Loops through all button and adding corresponding arguments number to function
  document.querySelector(`.btn${i}`).addEventListener("click", function () {
    //limits the amount of number possible to 11 to prevent overflow

    //If the first set of operation has happened, the first press will reset the numbers backstage and display
    if (pendingOperation.length >= 2 && hasBeenPressed === false) {
      oprBackstage = "";
      hasBeenPressed = true;
    }

    if (
      oprBackstage.length <= 10 ||
      calcLock === true
      // || pendingOperation.length >= 2
    ) {
      numberBtn(i);

      calcLock = false;
    } else {
      console.log("no");
    }
  });
}

document.querySelector(`.btn0`).addEventListener("click", function () {
  if (calcLock === false) {
    if (pendingOperation.length >= 2 && hasBeenPressed === false) {
      oprBackstage = "";
      hasBeenPressed = true;
    }

    if (oprBackstage.length <= 10) {
      numberBtn(0);
    }

    // numberBtn(0);
  }
});

//Operator Input
plusBtn.addEventListener("click", function () {
  //If there hasn't been any operator YET, then the selected operator will be added to the array
  oprAssign("+");
});

minusBtn.addEventListener("click", function () {
  oprAssign("-");
});

divideBtn.addEventListener("click", function () {
  oprAssign("/");
});

multiplyBtn.addEventListener("click", function () {
  oprAssign("*");
});
//Equal Input
equalBtn.addEventListener("click", function () {
  calcPending();
});

//Clear function
document.querySelector(".ac").addEventListener("click", function () {
  int();
  acPress = true;
});

/*
TODO
3. too many 0s
*/
