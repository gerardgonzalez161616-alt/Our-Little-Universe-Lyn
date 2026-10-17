// Código de acceso de seis cifras
const SECRET_CODE = "170626";
let enteredCode = "";

const loginScreen = document.getElementById("loginScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const memoriesScreen = document.getElementById("memoriesScreen");
const slots = [...document.querySelectorAll(".slot")];
const message = document.getElementById("message");

function renderCode() {
  slots.forEach((slot, index) => {
    const filled = index < enteredCode.length;
    slot.textContent = filled ? "♥" : "♡";
    slot.classList.toggle("filled", filled);
  });
}

function pressKey(key) {
  if (key === "delete") {
    enteredCode = enteredCode.slice(0, -1);
    message.textContent = "Only we know this little secret ♡";
    message.classList.remove("error");
    renderCode();
    return;
  }
  if (key === "enter") return checkCode();
  if (/^\d$/.test(key) && enteredCode.length < SECRET_CODE.length) {
    enteredCode += key;
    renderCode();
    if (enteredCode.length === SECRET_CODE.length) checkCode();
  }
}

function checkCode() {
  if (enteredCode === SECRET_CODE) {
    loginScreen.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");
  } else {
    message.textContent = "Not quite, my love. Try again ♡";
    message.classList.add("error");
    enteredCode = "";
    renderCode();
  }
}

document.querySelectorAll("[data-key]").forEach(button =>
  button.addEventListener("click", () => pressKey(button.dataset.key))
);
document.addEventListener("keydown", event => {
  if (/^\d$/.test(event.key)) pressKey(event.key);
  else if (event.key === "Backspace") pressKey("delete");
  else if (event.key === "Enter") pressKey("enter");
});
document.getElementById("continueButton").addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  memoriesScreen.classList.remove("hidden");
});
document.getElementById("backButton").addEventListener("click", () => {
  memoriesScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
});
renderCode();
