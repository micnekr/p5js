function genPal(min) {
  min++;
  //create a palindrome
  let numberArr = transformInPal(min);
  let number = numberArr[0];
  while (number < min) {
    let added = number + power(10, numberArr[1]);
    console.log(added + " " + number);
    numberArr = transformInPal(added);
    number = numberArr[0];
  }
  return number;
}

function power(num, num2) {
  let total = 1;
  for (var i = 0; i < num2; i++) {
    total *= num;
  }
  return total;
}

function transformInPal(num) {
  num = new String(num);
  let middleDig = "";
  let len = num.length;
  if (num.length % 2 == 1) {
    middleDig = num.charAt((num.length - 1) / 2);
    len = (num.length - 1);
  }
  let firstHalf = num.substring(0, len / 2);
  let secondHalf = firstHalf.split("").reverse().join("");
  return [new Number(firstHalf + middleDig + secondHalf) + 0, len / 2 + middleDig.length];
}