// Sample reasons (to be fetched from config or database)
const reasons = [
  "Sick leave",
  "Doctor's appointment",
  "Childcare needs",
  "Family emergency",
  "Household repairs",
  "Personal appointment",
  "School event for child",
  "Internet or power outage at home",
  "Inclement weather",
  // Add more reasons as needed
];

let intervalId;
let currentReasonIndex = 0;
let reasonsToShow = [...reasons]; // Clone the original reasons array

const reasonDisplay = document.getElementById("reasonDisplay");
const copyButton = document.getElementById("copyButton");
const tryAgainButton = document.getElementById("tryAgainButton");
const copyMessage = document.getElementById("copyMessage");

// Function to start flashing reasons
function startFlashingReasons() {
  intervalId = setInterval(() => {
    reasonDisplay.textContent = reasonsToShow[currentReasonIndex];
    currentReasonIndex = (currentReasonIndex + 1) % reasonsToShow.length;
  }, 100); // Change the interval as needed for flashing speed
}

// Function to stop flashing reasons
function triggerFlashingReasons() {
  clearInterval(intervalId);
  reasonDisplay.disabled = !reasonDisplay.disabled;
  if (reasonDisplay.disabled == false) {
    tryAgainButton.style.display = "none";
    copyMessage.style.display = "none";
    startFlashingReasons();
  } else {
    tryAgainButton.style.display = "inline-block";
    copyMessage.style.display = "inline-block";
  }

}

// Event listener for stop button
reasonDisplay.addEventListener("click", triggerFlashingReasons);

// Event listener for try again button
tryAgainButton.addEventListener("click", () => {
  currentReasonIndex = 0;
  reasonDisplay.disabled = false;
  tryAgainButton.style.display = "none";
  copyMessage.style.display = "none";
  startFlashingReasons();
});

// Event listener for clicking on reason display to copy the reason
copyButton.addEventListener("click", () => {
  const reasonToCopy = reasonDisplay.textContent;
  navigator.clipboard.writeText(reasonToCopy)
    .then(() => {
      copyMessage.textContent = `Copied: "${reasonToCopy}"`;
      copyMessage.style.display = "block";
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
    });
});

// Start flashing reasons initially
startFlashingReasons();

