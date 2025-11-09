// TODO add imports if needed
// TODO add/change doc as needed
/**
 * Převod čísla z trojkové do desítkové soustavy bez použití .toString(radix) a Number.parseInt(str, radix).
 * @param {string} inputNumber číslo ve vstupní soustavě
 * @param {number} inputNumberSystem vstupní soustava (zde 3)
 * @param {number} outputNumberSystem výstupní soustava (zde 10)
 * @returns {string|null} převedené číslo jako řetězec, nebo null při neplatném vstupu/soustavě
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {
  // povolené soustavy pro tento úkol
  const allowedIn = new Set(permittedInputSystems()); // [3]
  const allowedOut = new Set(permittedOutputSystems()); // [10]

  if (
    !allowedIn.has(inputNumberSystem) ||
    !allowedOut.has(outputNumberSystem)
  ) {
    return null;
  }
  if (typeof inputNumber !== "string" || inputNumber.length === 0) {
    return null;
  }

  // povolíme případné záporné znaménko
  const negative = inputNumber[0] === "-";
  const digits = negative ? inputNumber.slice(1) : inputNumber;

  // validace znaků pro zadanou bázi (zde 3 → jen '0','1','2')
  if (!isValidForBase(digits, inputNumberSystem)) return null;

  // převod z báze 3 na desítkovou hodnotu (iterativně: acc = acc*3 + cifra)
  let acc = 0n;
  const base = BigInt(inputNumberSystem); // 3n
  for (let i = 0; i < digits.length; i++) {
    const d = BigInt(charToValue(digits[i]));
    acc = acc * base + d;
  }

  // vytvoř výsledný řetězec v bázi 10 (bez toString(radix) – použijeme dělení)
  const out = bigIntToDecimalString(acc);

  // záporné znaménko jen pokud výsledek není nula
  return negative && out !== "0" ? "-" + out : out;
}

/**
 * Jaké vstupní soustavy náš program podporuje.
 */
export function permittedInputSystems() {
  return [3];
}

/**
 * Jaké výstupní soustavy náš program podporuje.
 */
export function permittedOutputSystems() {
  return [10];
}

/* ===== Pomocné funkce ===== */

// povol jen cifry menší než base
function isValidForBase(textDigits, base) {
  if (textDigits.length === 0) return false;
  for (let i = 0; i < textDigits.length; i++) {
    const v = charToValue(textDigits[i]);
    if (v < 0 || v >= base) return false;
  }
  return true;
}

// '0'..'9' → 0..9
function charToValue(ch) {
  const code = ch.codePointAt(0);
  if (code >= 48 && code <= 57) return code - 48;
  return -1;
}

// převod BigInt na desítkový řetězec opakovaným dělením 10
function bigIntToDecimalString(n) {
  if (n === 0n) return "0";
  let v = n < 0n ? -n : n;
  let s = "";
  const ten = 10n;
  while (v > 0n) {
    const digit = v % ten; // zbytek 0..9
    v = v / ten;
    s = String(Number(digit)) + s;
  }
  return s;
}
