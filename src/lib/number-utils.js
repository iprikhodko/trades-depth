export const format = (number, options = {
  decSeparator: '.',
  intSeparator: ',',
  fixed: '2',
}) => {
  const { decSeparator, intSeparator, fixed } = options;
  const splittedNumber = number.toString().split('.');

  const [int, fract] = splittedNumber;
  let preparedNumber = int.split('').reverse().reduce((preparedNum, num, index) => {
    if (num === '-') {
      return num;
    }

    return num + (index && !(index % 3) ? intSeparator : '') + preparedNum;
  }, '');

  if (fract && fract.length) {
    preparedNumber += `${decSeparator}${fract.slice(0, fixed)}`;
  }

  return preparedNumber;
};

export const isNumber = num =>
  !isNaN(num) && typeof num === 'number';
