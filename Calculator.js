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
  let p = parseInt(document.getElementById("p_Input").value, 10);
  let q = parseInt(document.getElementById("q_Input").value, 10);
  let e = parseInt(document.getElementById("e_Input").value, 10);

  if (isNaN(p) || isNaN(q) || isNaN(e)) {
    alert("Please enter valid integers for p, q, and e");
    return;
  }

  const phi = (p - 1) * (q - 1);
  try {
    let d = modInverse(e, phi);
    document.getElementById("d_Output").value = d;
  } catch (err) {
    alert(err.message);
  }
}

function decryptedOutput() {
  let d = BigInt(document.getElementById("d_Output").value);
  const userInputBox = document.querySelector("#User_Input");
  let numbers = [];
  const list = userInputBox.value.split(" ");

  for (let i = 0; i < list.length; i++) {
    let current = BigInt(list[i]); // Convert to BigInt
    let formula = current ** d;    // Use BigInt exponentiation
    let decrypted = formula % BigInt(33); // Use BigInt for modulo
    numbers.push(decrypted.toString()); // Convert result back to string for display
  }

  document.getElementById("User_Input").value = numbers.join(" ");
}

function encryptedOutput() {
  let e = BigInt(document.getElementById("e_Input").value);
  const userInputBox = document.querySelector("#User_Input");
  let numbers = [];
  const list = userInputBox.value.split(" ");

  for (let i = 0; i < list.length; i++) {
    let current = BigInt(list[i]); // Convert to BigInt
    let formula = current ** e;    // Use BigInt exponentiation
    let encrypted = formula % BigInt(33); // Use BigInt for modulo
    numbers.push(encrypted.toString()); // Convert result back to string for display
  }

  document.getElementById("User_Input").value = numbers.join(" ");
}
