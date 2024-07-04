import * as yaml from 'https://cdn.skypack.dev/js-yaml';

// Function to fetch and parse YAML data from reasons.yaml
async function fetchReasons() {
  try {
    const response = await fetch('reasons.yaml'); // Assuming reasons.yaml is in the same directory
    const yamlData = await response.text();
    const reasons = yaml.load(yamlData); // Parse YAML data

    // Access the reasons by category
    const generalReasons = reasons.General;
    const carReasons = reasons.Car;
    const kidReasons = reasons.Kid;

    return { generalReasons, carReasons, kidReasons };
  } catch (error) {
    console.error('Error fetching reasons:', error);
    return { generalReasons: [], carReasons: [], kidReasons: [] }; // Return empty arrays or handle error as needed
  }
}

let intervalId;
let currentReasonIndex = 0;
let reasonsToShow = [];

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
  if (!reasonDisplay.disabled) {
    tryAgainButton.style.display = "none";
    copyMessage.style.display = "none";
    startFlashingReasons();
  } else {
    tryAgainButton.style.display = "inline-block";
    copyMessage.style.display = "inline-block";
  }
}

// Event listener for clicking on reason display to stop flashing
reasonDisplay.addEventListener("click", triggerFlashingReasons);

// Event listener for try again button
tryAgainButton.addEventListener("click", () => {
  currentReasonIndex = 0;
  reasonDisplay.disabled = false;
  tryAgainButton.style.display = "none";
  copyMessage.style.display = "none";
  startFlashingReasons();
});

// Event listener for clicking on copy button to copy the reason
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

// Example usage to fetch and log reasons
fetchReasons().then(({ generalReasons, carReasons, kidReasons }) => {
  console.log('General Reasons:', generalReasons);
  console.log('Car Reasons:', carReasons);
  console.log('Kid Reasons:', kidReasons);

  reasonsToShow = generalReasons;
  // Start flashing reasons initially
  startFlashingReasons();
});
