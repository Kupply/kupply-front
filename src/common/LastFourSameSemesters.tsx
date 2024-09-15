function getLastFourSameSemesters(): [string, string, string, string] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // January is 0, December is 11

  let currentSemester;
  if (currentMonth >= 2 && currentMonth <= 7) {
    currentSemester = 1; // First semester (Spring)
  } else {
    currentSemester = 2; // Second semester (Fall)
  }

  return [
    `${currentYear - 1}-${currentSemester}`,
    `${currentYear - 2}-${currentSemester}`,
    `${currentYear - 3}-${currentSemester}`,
    `${currentYear - 4}-${currentSemester}`,
  ];
}

export const LastFourSameSemesters = getLastFourSameSemesters();
