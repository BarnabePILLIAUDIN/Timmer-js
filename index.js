//Selecting an creating the html elements
const app = document.querySelector("#app");
const displayerDiv = document.createElement("div");
const displayer = document.createElement("h2");
const buttonsDiv = document.createElement("div");
const startButton = document.createElement("button");
const endButton = document.createElement("button");
const resetButton = document.createElement("button");

//The variables for seconds,minutes, and hours
let hours = 0;
let minutes = 0;
let seconds = 0;

//A function to update the view (we will call it every time we need to change the text of an HTML element)

const updateView = () => {
  const time = `${hours} : ${minutes} : ${seconds}`;
  displayer.textContent = time;
};

//An array that contains all the intevals (only way I found to stop interval, because if I put it on start I cant access it in stop
//and if I put it outside a function it will be executed when page is loaded instead of when the button is pressed)
const intervals = [];

//A function that return an intarval the add a second every second and uptdate hours and minutes if it needs to
const Newinterval = () => {
  return setInterval(() => {
    seconds++;
    if (seconds >= 60) {
      //Not the easiest way but if for some reason it doesn't update minutes it will be updated in the next second
      minutes += seconds / 60;
      seconds %= 60;
    }
    //Same thing for hours
    if (minutes >= 60) {
      hours += minutes / 60;
      minutes %= 60;
    }
    updateView();
  }, 1000);
};

//Function to start the timmer
const start = () => {
  //Avoid to have to interval what would make the time two times bigger that what it really is
  if (intervals.length == 0) {
    intervals.push(Newinterval());
  }
};

//Function that stop the timmer
const stop = () => {
  intervals.forEach((interval) => {
    //stopping the interval and clearing the array (if we don't clear we won't be able to start another timmer)
    clearInterval(interval);
    intervals.splice(0, 1);
  });
};
//Function to reset the counter
const reset = () => {
  hours = 0;
  minutes = 0;
  seconds = 0;
  updateView();
};

//appending the childs, puuting the classes names, and the text contents
displayerDiv.appendChild(displayer);
displayerDiv.className = "displayerDiv";

startButton.textContent = "Commencer";
endButton.textContent = "Terminer";
resetButton.textContent = "Reset";
startButton.addEventListener("click", start);
endButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);

buttonsDiv.appendChild(startButton);
buttonsDiv.appendChild(endButton);
buttonsDiv.appendChild(resetButton);
buttonsDiv.className = "buttonsDiv";

app.appendChild(displayerDiv);
app.appendChild(buttonsDiv);

//calling the updateView for the first time so every element will have its text content
updateView();
