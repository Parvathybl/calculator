let display=document.getElementById("display");

function appendNumber(value) {
  if (value === '.' && display.value.includes('.')) {
    return;
  }
  display.value+=value;
}

function appendOperator(operator) {
  const lastchar=display.value.slice(-1);
  if("+-*/".includes(lastchar)) {
    display.value=display.value.slice(0,-1)+operator;
  }else {
    display.value+=operator;
  }
}
function backspace() {
  display.value=display.value.slice(0,-1);
}

function clearDisplay() {
  display.value='';
}

function calculate() {
  try {
    display.value=eval(display.value);
  } catch{
    display.value="Error";
  } 
}

function toggleExpand() {
  const trigFunctions=document.getElementById("trigFunctions");
  if (trigFunctions.style.display === "none" ||
    trigFunctions.style.display === "" ){
      trigFunctions.style.display="grid";

    } else {
      trigFunctions.style.display="none";
    }
  }

function trigonometric(func) {
  try {
    const value=parseFloat(display.value);
    let result;

    let radian=(value*Math.PI) / 180;

    switch(func) {
      case "sin":
        result=Math.sin(radian);
        break;

      case 'cos':
        result=Math.cos(radian);
        break;

      case 'tan':
        result=Math.tan(radian);
        break;

    }

      display.value=result.toFixed(6);
    } catch {
      display.value="Error";
    }
        
    }

    function calculatePercentage() {
      try {
        const value =parseFloat(display.value);
        display.value = (value/100).toString();
      } catch {
        display.value ="Error";
      }
    }

    function calculateSquareRoot() {
      try {
        const value =parseFloat(display.value);
        if(value<0) {
          display.value ="Error";
        } else {
          display.value=Math.sqrt(value).toFixed(6);
        } 
      }catch {
        display.value="Error";
      }
    }

    function square() {
      try {
        const value=parseFloat(display.value);
        display.value=(value*value);
      } catch {
        display.value="Error";
      }
    }
