function getLastThreeSemesters(): [string, string, string] {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // January is 0, December is 11


  // Determine the current semester based on the current month (assuming semester 1 is Jan-Jun, semester 2 is Jul-Dec)
  let currentSemester;


  // Correct ver.
  // if (currentMonth <= 5) {
  //   currentSemester = 1; // First semester (Spring)
  // } else {
  //   currentSemester = 2; // Second semester (Fall)
  // }


  // Temporary ver. (2025.08.31 과도기 버전)
  if (currentMonth <= 8) {
    currentSemester = 1; // First semester (Spring)
  } else {
    currentSemester = 2; // Second semester (Fall)
  }


  // Calculate the semesters
  if (currentSemester === 1) {
    // If it's the first semester
    return [`${currentYear - 1}-2`, `${currentYear - 1}-1`, `${currentYear - 2}-2`];
  } else {
    // If it's the second semester
    return [`${currentYear}-1`, `${currentYear - 1}-2`, `${currentYear - 1}-1`];
  }



}

export const LastThreeSemesters = getLastThreeSemesters();
