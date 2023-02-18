function gcdExtended(a, b) {
  if (a === 0) {
    return [b, 0, 1];
  }

  const [gcd, x1, y1] = gcdExtended(b % a, a);
  const x = y1 - Math.floor(b / a) * x1;
  const y = x1;

  return [gcd, x, y];
}

function modInverse(e, phi) {
  const [gcd, x, y] = gcdExtended(e, phi);

  if (gcd !== 1) {
    throw new Error("No modular inverse exists");
  }

  return ((x % phi) + phi) % phi;
}
const userInputBox = document.querySelector("#User_Input");
const testbutton = document.querySelector("#testbutton");

let p = "";
let q = "";
let e = "";
document.getElementById("p_Input").value = p;
document.getElementById("q_Input").value = q;
document.getElementById("e_Input").value = e;

const d = modInverse(e, phi);

function Output() {
  input = userInputBox.value;
  console.log(input);
}

let list;

function calculate_n() {
  let n =
    document.getElementById("q_Input").value *
    document.getElementById("p_Input").value;
  document.getElementById("n_Input").value = n;
}

function calculate_d() {
  const phi =
    (document.getElementById("p_Input").value - 1) *
    (document.getElementById("q_Input").value - 1);
  let d = modInverse(document.getElementById("e_Input").value, phi);
  document.getElementById("d_Output").value = d;
}

function decryptedOutput() {
  let d = document.getElementById("d_Output").value;
  const userInputBox = document.querySelector("#User_Input");
  let numbers = [];
  const list = userInputBox.value.split(" ");
  console.log(list, userInputBox);
  for (let i = 0; i < list.length; i++) {
    current = list[i];
    formula = Math.pow(current, d);
    decrypted = formula % 33;
    numbers.push(decrypted);
  }
  document.getElementById("User_Input").value = numbers.join(" ");
}

function encryptedOutput() {
  let e = document.getElementById("e_Input").value;
  const userInputBox = document.querySelector("#User_Input");
  let numbers = [];
  const list = userInputBox.value.split(" ");
  console.log(list, userInputBox);
  for (let i = 0; i < list.length; i++) {
    current = list[i];
    formula = Math.pow(current, e);
    encrypted = formula % 33;
    numbers.push(encrypted);
  }
  document.getElementById("User_Input").value = numbers.join(" ");
}
