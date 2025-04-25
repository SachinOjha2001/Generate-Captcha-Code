let generatedCaptcha = "";
let captchaTimer;
const expiryTime = 30; // seconds
let countdown = expiryTime;
let countdownInterval;

function generateCaptcha() {
  const canvas = document.getElementById("captcha");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  generatedCaptcha = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    generatedCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Draw CAPTCHA
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(generatedCaptcha, 10, 35);

  resetTimer();
}

function validateCaptcha() {
  const userInput = document.getElementById("captcha-input").value.trim();
  const message = document.getElementById("message");

  if (generatedCaptcha === "") {
    message.style.color = "orange";
    message.textContent = "CAPTCHA expired. Please refresh.";
    return;
  }

  if (userInput.toLowerCase() === generatedCaptcha.toLowerCase()) {
    message.style.color = "green";
    message.textContent = "CAPTCHA matched!";
    clearTimeout(captchaTimer);
    clearInterval(countdownInterval);
  } else {
    message.style.color = "red";
    message.textContent = "Incorrect CAPTCHA. Try again!";
    generateCaptcha(); // Optional: Refresh on failure
  }
}

function resetTimer() {
  clearTimeout(captchaTimer);
  clearInterval(countdownInterval);

  countdown = expiryTime;
  document.getElementById("countdown").textContent = countdown;

  countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById("countdown").textContent = countdown;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  captchaTimer = setTimeout(() => {
    generatedCaptcha = ""; // invalidate captcha
    document.getElementById("message").style.color = "orange";
    document.getElementById("message").textContent = "CAPTCHA expired. Please refresh.";
  }, expiryTime * 1000);
}

window.onload = generateCaptcha;
