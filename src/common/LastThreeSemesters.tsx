function getLastThreeSemesters(): [string, string, string] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // January is 0, December is 11

  // Determine the current semester based on the current month (assuming semester 1 is Jan-Jun, semester 2 is Jul-Dec)
  const currentSemester = currentMonth < 6 ? 1 : 2;

  // Calculate the semesters
  if (currentSemester === 1) {
    // If it's the first semester
    return [`${currentYear - 1}-2R`, `${currentYear - 1}-1R`, `${currentYear - 2}-2R`];
  } else {
    // If it's the second semester
    return [`${currentYear}-1R`, `${currentYear}-2R`, `${currentYear - 1}-1R`];
  }
}

export const LastThreeSemesters = getLastThreeSemesters();

// Usage example
// const [year1, year2, year3] = getLastThreeSemesters();
// console.log(year1, year2, year3);
// Logs something like '2023-2R', '2023-1R', '2022-2R'
