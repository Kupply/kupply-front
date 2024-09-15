function getLastThreeSemesters(): [string, string, string] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // January is 0, December is 11

  // Determine the current semester based on the current month (assuming semester 1 is Jan-Jun, semester 2 is Jul-Dec)
  let currentSemester;
  if (currentMonth >= 2 && currentMonth <= 7) {
    currentSemester = 1; // First semester (Spring)
  } else {
    currentSemester = 2; // Second semester (Fall)
  }

  // Calculate the semesters
  if (currentSemester === 1) {
    // If it's the first semester
    return [`${currentYear - 1}-2R`, `${currentYear - 1}-1R`, `${currentYear - 2}-2R`];
  } else {
    // If it's the second semester
    // return [`${currentYear}-1R`, `${currentYear}-2R`, `${currentYear - 1}-1R`];
    return [`${currentYear}-1R`, `${currentYear - 1}-2R`, `${currentYear - 1}-1R`];
  }
}

export const LastThreeSemesters = getLastThreeSemesters();
