//TODO add imports if needed
//import { exMain } from "./exclude/exampleAss2.js"
//TODO add/change doc as needed

/**
 * Převod čísla z trojkové do desítkové soustavy bez použití .toString(radix) a Number.parseInt(str, radix).
 * @param {string} inputNumber číslo ve vstupní soustavě
 * @param {number} inputNumberSystem vstupní soustava (zde 3)
 * @param {number} outputNumberSystem výstupní soustava (zde 10)
 * @returns {string|null} převedené číslo jako řetězec, nebo null při neplatném vstupu/soustavě
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {
  // 1. Kontrola vstupních soustav
  if (!permittedInputSystems().includes(inputNumberSystem)) return null;
  if (!permittedOutputSystems().includes(outputNumberSystem)) return null;

  // 2. Kontrola vstupu
  if (!inputNumber || inputNumber.startsWith("-")) {
    return null;
  }

  for (let ch of inputNumber) {
    if (ch !== "0" && ch !== "1" && ch !== "2") {
      return null;
    }
  }

  // 3. Zvláštní případ – nula
  if (inputNumber === "0") {
    return "0";
  }

  // 4. Samotný převod (iterace)
  let decimalValue = 0;
  for (let i = 0; i < inputNumber.length; i++) {
    let ch = inputNumber[i];
    decimalValue = decimalValue * 3 + Number(ch);
  }

  // 5. Výsledek
  return String(decimalValue);
}

/**
 * Povolené vstupní soustavy.
 */
export function permittedInputSystems() {
  return [3];
}

/**
 * Povolené výstupní soustavy.
 */
export function permittedOutputSystems() {
  return [10];
}
