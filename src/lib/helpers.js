// Formating numbers for countdown on Holding Screen

export function formatNumber2Digit(num) {
  num = Number(num);
  // Check if the number is a single digit (0-9)
  if (num >= 0 && num <= 9) {
    // Prefix with '0' and convert back to string
    return "0" + num.toString();
  } else {
    // Otherwise, return the number as a string
    return num.toString();
  }
}
