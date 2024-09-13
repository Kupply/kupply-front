const today = new Date();
const currentMonth = today.getMonth() + 1; // getMonth() returns 0-based month

let isDateInRange = false;
let isPeriodPassed = false;

if (currentMonth === 9 || currentMonth === 11) { // 디자인 수정하느라 임시적으로 currentMonth === 9 로 바꿔둠 
  // May or November
  isDateInRange = true;
} else if ([2, 3, 4, 8, 9, 10].includes(currentMonth)) {
  // February, March, April, August, September, October
  isDateInRange = false;
  isPeriodPassed = false;
} else {
  // January, June, July, December
  isDateInRange = false;
  isPeriodPassed = true;
}

export { isDateInRange, isPeriodPassed, currentMonth };
