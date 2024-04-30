/*
Нужно создать двумерный массив 10(rowNum)х10(colNum) с случайными числами в интервале [-100..100] ([minNum..maxNum])
Вывести этот массив в консоль в читаемом виде
В выведенном массиве:
- Пометить строку с минимальным числом - звездочкой
- В каждой строке вывести наименьшее положительное число
- В каждой строке написать какое минимальное кол-во чисел необходимо заменить чтобы не встречалось 3(repeatThresold) положительных или отрицательных числа подряд.
*/
const rowNum = 10, colNum = 10, minNum = -100, maxNum = 100, repeatThresold = 3;

// Функция для генерации двумерного массива rowNum х colNum со случайными числами в интервале [minNum..maxNum]
function createRandomArray(rowNum, colNum, minNum, maxNum) {
  const array = [];
  for (let i = 0; i < rowNum; i++) {
    const row = [];
    for (let j = 0; j < colNum; j++) {
      row.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }
    array.push(row);
  }
  return array;
}

// Функция для поиска наименьшего положительного числа в строке
function searchMinPositiveNumber(row) {
  const positiveNumbers = row.filter(number => number > 0);
  return positiveNumbers.length > 0 ? Math.min(...positiveNumbers) : 0;
}

// Функция для подсчета минимального количества замен в строке
function countReplacementsNeeded(row, continueCount) {
  let count = 0;
  let last = row.length - (continueCount - 1);

  for (let i = 0; i < last; i++) {
    let firstSign = Math.sign(row[i]);
    let continueFlag = true;
    for (let j = 0; j < continueCount - 1; j++) {
      if (Math.sign(row[i + j + 1]) != firstSign){
        continueFlag = false;
        break;
      }      
    }
    if (continueFlag){
      count ++;
      i += continueCount - 1;
    }
  }
  return count;
}

// Функция для вывода массива в консоль
function printArray(array, rowNum, colNum, minNum, maxNum, repeatThresold) {
  const digitCount = Math.floor(Math.log10(Math.max(Math.abs(minNum), Math.abs(maxNum)))) + 1 + 1;
  const asteriskCount = digitCount * colNum + 4 * (colNum - 1);
  const minNumber = Math.min(...array.flat());
  array.forEach(row => {
    const minPositive = searchMinPositiveNumber(row).toString().padStart(digitCount, " ");
    const replacementsNeeded = countReplacementsNeeded(row, repeatThresold);
    console.log(row.map(number => number.toString().padStart(digitCount, " ")).join('\t') + `\tMin positive: ${minPositive}, Replacement: ${replacementsNeeded}`);
    if (row.includes(minNumber)) {
      console.log('*'.repeat(asteriskCount) + `\tHave min ${minNumber}`);
    }
  });
}

// Генерируем и выводим массив
const array = createRandomArray(rowNum, colNum, minNum, maxNum);
printArray(array, rowNum, colNum, minNum, maxNum, repeatThresold);
