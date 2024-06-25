document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = "0";
  let operator = null;
  let previousInput = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.getAttribute("data-value");

      if (value === "C") {
        currentInput = "0";
        operator = null;
        previousInput = "";
        display.innerText = "0";
      } else if (value === "=") {
        if (currentInput !== "" && previousInput !== "" && operator !== null) {
          currentInput = evaluate(previousInput, operator, currentInput);
          display.innerText = currentInput;
          previousInput = "";
          operator = null;
        }
      } else if (this.classList.contains("operator")) {
        if (currentInput !== "") {
          if (previousInput === "") {
            previousInput = currentInput;
          } else if (operator !== null) {
            previousInput = evaluate(previousInput, operator, currentInput);
            display.innerText = previousInput;
          }
          operator = value;
          currentInput = "";
        }
      } else {
        if (currentInput === "0") {
          currentInput = value;
        } else {
          currentInput += value;
        }
        display.innerText = currentInput;
      }
    });
  });

  function evaluate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
      case "+":
        return (a + b).toString();
      case "-":
        return (a - b).toString();
      case "*":
        return (a * b).toString();
      case "/":
        if (b === 0) {
          return "Error";
        } else {
          return (a / b).toString();
        }
      default:
        return b.toString();
    }
  }
});
